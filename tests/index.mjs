import noverlap from '../index';

const preventRedundantFetches = noverlap()

const fetchSomeData = preventRedundantFetches(payload => {
  console.log(`this fetch should only happen once within 420ms when applied with: ${payload})`);
  return new Promise((resolve, reject) => setTimeout(_ => resolve(`response from submitting: ${payload}`)));
});

(async _ => {
  console.log(await fetchSomeData('payload of a repeated fetch'));
})();

(async _ => {
  console.log(await fetchSomeData('payload of a repeated fetch'));
})();

(async _ => {
  console.log(await fetchSomeData('payload of a repeated fetch'));
})();

setTimeout(async _ => {
  const response = await fetchSomeData('payload of a repeated fetch');
  console.log('this fetch will be made again because it happened after 420ms');
  console.log(response);
}, 888);

(async _ => {
  const response = await fetchSomeData('payload of a unique fetch');
  console.log('this fetch will be executed with the other fetches because it is does not overlap with them')
  console.log(response);
})();
