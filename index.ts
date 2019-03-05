interface NoverlapConfig {
  hash?: (...args:any[]) => any
  comparator?: (hash:any, existingKey:any) => boolean
  wait?: number
  start?: (...args:any[]) => any
  queue?: (...args:any[]) => any
  beforeFinish?: (...args:any[]) => any
  success?: (result:any, ...args:any[]) => any
  fail?: (result:Error, ...args:any[]) => any
  finish?: (result:any, ...args:any[]) => any
};

/**
 * prevent function invocations (both sync and async) from redundantly overlapping with each other.
 * note that this will cause the function's return value to be async
 * @param config - noverlap configs
 * @param config.hash - a hash function of the async function parameters
 * @param config.comparator - a function used to determine if an existing key in the map is to be considered the same as a hash
 * @param config.wait - a wait time that will start on each execution of an async function and reset with every overlapping execution
 * @param config.start - a callback that is provided with the wrapped function's parameters and invoked when the wrapped function's key is hashed into the map
 * @param config.queue - a callback that is provided with the wrapped function's parameters and invoked whenever an invocation of the wrapped function is recorded
 * @param config.beforeFinish - a callback that is provided with the wrapped function's parameters and invoked right before the wrapped function
 * @param config.success - a callback that is provided with the wrapped function's invocation's result and arguments and executed after the wrapped function is successfully called
 * @param config.fail - a callback that is provided with the wrapped function's invocation's error and arguments and executed after the wrapped function is erroneously called
 * @param config.finish - a callback that is provided with the wrapped function's invocation's result and arguments and executed after the wrapped function is called
 * @returns - an instantiation of noverlap, a wrapper function used to apply noverlap to any function
 */
export default <FR extends (...args:any[]) => any>(config:(NoverlapConfig|((...args:any[]) => NoverlapConfig)) = {}) => <F extends FR>(fn:F) => {
  const map = new Map();

  type Params = Parameters<F>;
  type Return = ReturnType<F>;

  return async function(...args:Params) {
    const {
      hash = undefined,
      comparator = undefined,
      wait = 420,
      start = undefined,
      queue = undefined,
      beforeFinish = undefined,
      success = undefined,
      fail = undefined,
      finish = undefined,
    } = typeof config === 'function'
      ? await config(...args)
      : config || {};

    const w = typeof wait === 'number' ? wait : 420;

    type ResolveReject = [(value?: Return|PromiseLike<Return>) => void, (reason?: any) => void];

    return new Promise<Return>(async (...resrej:ResolveReject) => {

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

      let value:ResolveReject[];
      if (keyReference) {
        value = map.get(keyReference);
        value.push(resrej);
      } else {
        value = [resrej];
        map.set(key, value);
        typeof start === 'function' && await start(...args);
      }

      typeof queue === 'function' && await queue(...args);

      setTimeout(async () => {
        if (value && value[value.length - 1] === resrej) {
          let result:any;
          try {
            typeof beforeFinish === 'function' && await beforeFinish(...args);
            result = await fn.call(this, ...args);
            typeof success === 'function' && await success(result, ...args);
            value.map(([resolve, reject]) => resolve(result));
          } catch (err) {
            result = err;
            typeof fail === 'function' && await fail(result, ...args);
            value.map(([resolve, reject]) => reject(result));
          } finally {
            typeof finish === 'function' && await finish(result, ...args);
            map.delete(keyReference);
          }
        }
      }, w);
    });
  };
};
