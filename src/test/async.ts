import { fetchSomeData } from './index';

export default () => Promise.all([
  (async () => console.log(await fetchSomeData('payload of a repeated execution')))(),
  (async () => console.log(await fetchSomeData('payload of a repeated execution')))(),
  (async () => console.log(await fetchSomeData('payload of a repeated execution')))(),
]);