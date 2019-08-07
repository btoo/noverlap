import Noverlap from '../';

const noverlap = Noverlap((firstArgument, secondArgument) => ({
  // override the default hash function by creating an array containing the second argument.
  // the reference to this array will be lost when trying to look it up as a key in the map
  hash: () => [secondArgument],
  // this is also valid and would do the same thing
  // hash: (...args) => [args[1]],

  // override the default lookup function so that new keys arent created when their hashes are deemed equivalent to existing ones.
  // here, since the reference to the key, which is an array, has been lost, we'll instead compare the first element of the array
  comparator: ([a], [b]) => a === b,

  // override the default wait time by waiting 888ms instead
  wait: 888,
}));

const fetchSomeData = noverlap((...payload) => {
  console.log(`this fetch should only happen once within 420ms when applied with: ${payload[0]})`);
  return new Promise((resolve, reject) => setTimeout(() => resolve(`response from submitting: ${payload[0]}`)));
});

export default () => Promise.all([
  (async () => {
    console.log(await fetchSomeData(
      'payload of repeated fetch 1',
      'the second element will instead be used as the hash of this function invocation, as defined by the per-function hash fn override',
    ));
  })(),
  (async () => {
    console.log(await fetchSomeData(
      'payload of repeated fetch 2',
      'the second element will instead be used as the hash of this function invocation, as defined by the per-function hash fn override',
    ));
  })(),
  (async () => {
    console.log(await fetchSomeData(
      'payload of repeated fetch 3',
      'the second element will instead be used as the hash of this function invocation, as defined by the per-function hash fn override',
    ));
  })(),
]);