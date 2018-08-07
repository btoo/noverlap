import { fetchSomeData } from './index';

(async _ => {
  console.log(await fetchSomeData('payload of a repeated execution'));
})();

(async _ => {
  console.log(await fetchSomeData('payload of a repeated execution'));
})();

(async _ => {
  console.log(await fetchSomeData('payload of a repeated execution'));
})();