import Noverlap from './index';

const applyNoverlap = Noverlap();

const dummyFetcher = payload => {
  console.log('executing');
  return new Promise((resolve, reject) => setTimeout(_ => resolve(`response from submitting: ${payload}`)));
};

const fetchSomeData = applyNoverlap(async payload => {
  const response = await dummyFetcher(payload);
  return response;
});

(async _ => {
  console.log(await fetchSomeData('payload of a repeated fetch'))
})();

(async _ => {
  console.log(await fetchSomeData('payload of a repeated fetch'))
})();

(async _ => {
  console.log(await fetchSomeData('payload of a repeated fetch'))
})();
