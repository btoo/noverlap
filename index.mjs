export default (hashFn = asyncFnArgs => asyncFnArgs[0], wait = 420) => {
  const hashMap = new Map();
  return asyncFn => (...asyncFnArgs) => new Promise((...resrej) => {
    const hash = hashFn(asyncFnArgs);
    const timestamp = Date.now();

    if (hashMap.has(hash)) {
      const asyncExecution = hashMap.get(hash);
      asyncExecution.timestamp = timestamp;
      asyncExecution.promiseFns.push(resrej);
    } else {
      hashMap.set(hash, {
        timestamp,
        promiseFns: [resrej],
      });
    }

    setTimeout(async _ => {
      const asyncExecution = hashMap.get(hash);
      if (asyncExecution.timestamp === timestamp) {
        try {
          const resolution = await asyncFn(...asyncFnArgs);
          asyncExecution.promiseFns.map(([resolve, reject]) => resolve(resolution));
        } catch (err) {
          asyncExecution.promiseFns.map(([resolve, reject]) => reject(err));
        } finally {
          hashMap.delete(hash);
        }
      }
    }, wait);
  });
};
