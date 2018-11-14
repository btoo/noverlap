import { processSomeData } from './index';

export default async _ => {
  (async _ => console.log(await processSomeData('payload of one execution')))();
  
  return (async _ => {
    const response = await processSomeData('payload of another execution');
    console.log('this execution will be executed with the other one because it has a different hash')
    console.log(response);
  })();
}
