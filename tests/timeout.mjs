import { processSomeData } from './index';

(async _ => {
  console.log(await processSomeData('payload of a repeated execution'));
})();

setTimeout(async _ => {
  const result = await processSomeData('payload of a repeated execution');
  console.log('this execution will be made again because it happened after 420ms');
  console.log(result);
}, 888);