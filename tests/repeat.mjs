import { processSomeData } from './index';

export default _ => Promise.all([
  (async _ => console.log(await processSomeData('payload of a repeated execution')))(),
  (async _ => console.log(await processSomeData('payload of a repeated execution')))(),
  (async _ => console.log(await processSomeData('payload of a repeated execution')))(),
]);