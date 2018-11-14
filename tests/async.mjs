import { fetchSomeData } from './index';

export default _ => Promise.all([
  (async _ => console.log(await fetchSomeData('payload of a repeated execution')))(),
  (async _ => console.log(await fetchSomeData('payload of a repeated execution')))(),
  (async _ => console.log(await fetchSomeData('payload of a repeated execution')))(),
]);