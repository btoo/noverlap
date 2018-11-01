/**
 * prevent function invocations (both sync and async) from redundantly overlapping with each other
 * @param {object} config - noverlap configs
 * @param {function} config.hash - a hash function of the async function parameters
 * @param {function} config.comparator - a function used to determine if an existing key in the map is to be considered the same as a hash
 * @param {number} config.wait - a wait time that will start on each execution of an async function and reset with every overlapping execution
 * @param {function} config.start - a callback that is provided with the wrapped function's parameters and invoked when the wrapped function's key is hashed into the map
 * @param {function} config.beforeFinish - a callback that is provided with the wrapped function's parameters and invoked right before the wrapped function
 * @param {function} config.finish - a callback that is provided with the wrapped function's invocation's result and executed right after the wrapped function
 * @returns {function} - an instantiation of noverlap, a wrapper function used to apply noverlap to an async function
 */
export default (config = {}) => fn => {
  const map = new Map(); // TODO: expose access to map for user?

  return async (...args) => {
    const {
      hash,
      comparator,
      wait,
      start,
      beforeFinish,
      finish,
    } = await (typeof config === 'function'
      ? config(...args)
      : config || {}
    );
    
    const w = typeof wait === 'number' ? wait : 420;

    return new Promise(async (...resrej) => {
      const key = typeof hash === 'function'
        ? await hash(...args)
        : args[0];

      let keyReference = false;
      if (typeof comparator === 'function') {
        const keys = map.keys();
        let existingKey;
        while (existingKey = keys.next().value) {
          if (await comparator(key, existingKey)) {
            keyReference = existingKey;
            break;
          }
        }
      } else if (map.has(key)) {
        keyReference = key;
      }

      let value;
      if (keyReference) {
        value = map.get(keyReference);
        value.push(resrej);
      } else {
        value = [resrej];
        map.set(key, value);
        typeof start === 'function' && await start(...args);
      }

      setTimeout(async _ => {
        if (value && value[value.length - 1] === resrej) {
          let result;
          try {
            typeof beforeFinish === 'function' && await beforeFinish(...args);
            const resolution = await fn(...args);
            value.map(([resolve, reject]) => resolve(result = resolution));
          } catch (err) {
            value.map(([resolve, reject]) => reject(result = err));
          } finally {
            typeof finish === 'function' && await finish(result);
            map.delete(keyReference);
          }
        }
      }, w);
    });
  };
};