import Noverlap from '../index';

const noverlap = Noverlap({
  start(payload) { console.log('starting once', payload); },
  beforeFinish(payload) { console.log('beforeFinish once', payload); },
  finish(response) { console.log('finishing once', response); },
});

const fetchSomeData = noverlap(payload => {
  console.log(`this fetch should only happen once within 420ms when applied with: ${payload})`);
  return new Promise((resolve, reject) => setTimeout(_ => resolve(`response from submitting: ${payload}`)));
});

const repeatedAsyncFn = async _ => console.log(await fetchSomeData('payload of repeated fetch'));

export default _ => Promise.all([
  repeatedAsyncFn(),
  repeatedAsyncFn(),
  repeatedAsyncFn(),
]);