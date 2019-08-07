import { processSomeData } from './index';

export default async () => {
  (async () => console.log(await processSomeData('payload of one execution')))();
  
  return (async () => {
    const response = await processSomeData('payload of another execution');
    console.log('this execution will be executed with the other one because it has a different hash')
    console.log(response);
  })();
}
