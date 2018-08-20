export default ({
  hash,
  comparator,
  wait,
  start,
  finish,
} = {}) => fn => {
  const map = new Map()
      , w = typeof wait === 'number' ? wait : 420;

  return (...args) => new Promise((...resrej) => {
    const key = typeof hash === 'function'
      ? hash(...args)
      : args[0];

    let keyReference = false;
    if (typeof comparator === 'function') {
      const keys = map.keys();
      let existingKey;
      while (existingKey = keys.next().value) {
        if (comparator(key, existingKey)) {
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
    }

    setTimeout(async _ => {
      if (value && value[value.length - 1] === resrej) {
        let result;
        try {
          typeof start === 'function' && await start(...args);
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