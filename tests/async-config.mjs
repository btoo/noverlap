import Noverlap from '../index';

const noverlap = Noverlap(new Promise(res => res({
  start: _ => console.log(`this noverlap instance's configurations were generated asynchronously`)
})));

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