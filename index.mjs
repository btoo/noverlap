export default (hashFn = asyncFnArgs => asyncFnArgs[0], wait = 420) => {
  const hashMap = new Map();
  return asyncFn => (...asyncFnArgs) => new Promise((...resrej) => {
    const hash = hashFn(asyncFnArgs);

    hashMap.has(hash)
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
    }, wait);
  });
};
