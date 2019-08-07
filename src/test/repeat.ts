import { processSomeData } from './index';

export default () => Promise.all([
  (async () => console.log(await processSomeData('payload of a repeated execution')))(),
  (async () => console.log(await processSomeData('payload of a repeated execution')))(),
  (async () => console.log(await processSomeData('payload of a repeated execution')))(),
]);