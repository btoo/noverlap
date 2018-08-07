export default (hashFn, lookupFn, w) => asyncFn => {
  const map = new Map()
      , wait = typeof w === 'number' ? w : 420;

  return (...asyncFnArgs) => new Promise((...resrej) => {
    const key = typeof hashFn === 'function'
      ? hashFn(asyncFnArgs)
      : asyncFnArgs[0];

    const keyReference = typeof lookupFn === 'function'
      ? lookupFn(map, key)
      : map.has(key)
        ? key
        : false;
    
    keyReference
      ? map.get(keyReference).push(resrej)
      : map.set(key, [resrej]);

    setTimeout(async _ => {
      const asyncExecution = map.get(keyReference);
      if (asyncExecution && asyncExecution[asyncExecution.length - 1] === resrej) {
        try {
          const resolution = await asyncFn(...asyncFnArgs);
          asyncExecution.map(([resolve, reject]) => resolve(resolution));
        } catch (err) {
          asyncExecution.map(([resolve, reject]) => reject(err));
        } finally {
          map.delete(key);
        }
      }
    }, wait);
  });
};