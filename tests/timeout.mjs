import { processSomeData } from './index';

export default async _ => {
  (async _ => {
    console.log(await processSomeData('payload of a repeated execution'));
  })();
  
  return new Promise(res => setTimeout(async _ => {
    const result = await processSomeData('payload of a repeated execution');
    console.log('this execution will be made again because it happened after 420ms');
    console.log(result);
    res();
  }, 888));
}