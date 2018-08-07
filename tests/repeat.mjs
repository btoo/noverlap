import { processSomeData } from './index';

(async _ => {
  console.log(await processSomeData('payload of a repeated execution'));
})();

(async _ => {
  console.log(await processSomeData('payload of a repeated execution'));
})();

(async _ => {
  console.log(await processSomeData('payload of a repeated execution'));
})();