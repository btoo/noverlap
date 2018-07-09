import Noverlap from './index';

const applyNoverlap = Noverlap();

const fetchSomeData = applyNoverlap(payload => {
  console.log('executing fetch (this fetch should only happen once)');
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
