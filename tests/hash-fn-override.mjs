import Noverlap from '../index';

const applyNoverlap = Noverlap();

const fetchSomeData = applyNoverlap(
  payload => {
    console.log(`this fetch should only happen once within 420ms when applied with: ${payload})`);
    return new Promise((resolve, reject) => setTimeout(_ => resolve(`response from submitting: ${payload}`)));
  },

  // override the default hash function by using the second arg instead of the first one
  args => args[1]
);

(async _ => {
  console.log(await fetchSomeData(
    'payload of a repeated fetch 1',
    'the second element will instead be used as the hash of this function invocation, as defined by the per-function hash fn override',
  ));
})();

(async _ => {
  console.log(await fetchSomeData(
    'payload of a repeated fetch 2',
    'the second element will instead be used as the hash of this function invocation, as defined by the per-function hash fn override',
  ));
})();

(async _ => {
  console.log(await fetchSomeData(
    'payload of a repeated fetch 3',
    'the second element will instead be used as the hash of this function invocation, as defined by the per-function hash fn override',
  ));
})();