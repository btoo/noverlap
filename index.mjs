export default (hashFn, lookupFn, wait = 420) => asyncFn => {
  const hashMap = new Map();
  return (...asyncFnArgs) => new Promise((...resrej) => {
    const hash = typeof hashFn === 'function'
      ? hashFn(asyncFnArgs)
      : asyncFnArgs[0];

    const hashExists = typeof lookupFn === 'function'
      ? lookupFn(hashMap, hash)
      : hashMap.has(hash);
    
    hashExists
      ? hashMap.get(hash).push(resrej)
      : hashMap.set(hash, [resrej]);

    setTimeout(async _ => {
      const asyncExecution = hashMap.get(hash);
      if (asyncExecution && asyncExecution[asyncExecution.length - 1] === resrej) {
        try {
          const resolution = await asyncFn(...asyncFnArgs);
          asyncExecution.map(([resolve, reject]) => resolve(resolution));
        } catch (err) {
          asyncExecution.map(([resolve, reject]) => reject(err));
        } finally {
          hashMap.delete(hash);
        }
      }
    }, typeof wait === 'number' ? wait : 420);
  });
};