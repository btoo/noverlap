export default (hashFn, lookupComparator, wait) => fn => {
  const map = new Map()
      , w = typeof wait === 'number' ? wait : 420;

  return (...args) => new Promise((...resrej) => {
    const key = typeof hashFn === 'function'
      ? hashFn(...args)
      : args[0];

    let keyReference = false;
    if (typeof lookupComparator === 'function') {
      const keys = map.keys();
      let existingKey;
      while (existingKey = keys.next().value) {
        if (lookupComparator(key, existingKey)) {
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
        try {
          const resolution = await fn(...args);
          value.map(([resolve, reject]) => resolve(resolution));
        } catch (err) {
          value.map(([resolve, reject]) => reject(err));
        } finally {
          map.delete(keyReference);
        }
      }
    }, w);
  });
};