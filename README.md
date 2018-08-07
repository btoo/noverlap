# noverlap
prevent redundant promise-based async executions from overlapping with each other

## usage

```js
import Noverlap from 'noverlap'

// instantiate noverlap instance
const noverlap = Noverlap()

// or instantiate noverlap with configurations that will determine whether or not two async function executions are overlapping with each other:
// 1. a hash function of the async function parameters
// 2. a lookup function that returns a direct reference to the key when determining whether or not a hash has already been addded as a key. useful for when you've lost the reference to certain keys (eg storing objects or arrays as keys)
// 3. a wait time that will start on each execution of an async function and reset with every overlapping execution
// the following are the default configurations:
const noverlap = Noverlap(
  // the first parameter will be considered the hash of the async function
  asyncFnArgs => asyncFnArgs[0],
  // find a direct reference to the hash that will be looked up as the key in map.get(key)
  (map, hash) => {
    if (map.has(hash)) return hash;
    return false;
  },
  // wait 420ms to see if another execution of the async function is overlapping with an existing one
  420
)

// let's use this dummy async function that we pretend makes a fetch to a server
// we do not want this fetcher to make the same call multiple times in a row when in fact
// we only need the data from the latest call, which should return the most up to date response.
const dummyFetcher = payload => new Promise((resolve, reject) => setTimeout(_ => resolve(`response from submitting: ${payload}`)));

// apply the noverlap instance to an async function by wrapping it
const fetchSomeData = noverlap(async payload => {
  const response = await dummyFetcher(payload);
  console.log('this async function will only be executed once if it is called with the same payload multiple times within 420ms')
  return response;
})

// you can also override the hash fn defined in the Noverlap instantiation by defining it when wrapping a function
const fetchSomeData = noverlap(asyncFn, asyncFnArgs => asyncFnArgs[0])

const redundantAsyncExecution = async _ => console.log(`processing result from a ${await fetchSomeData('repeated payload')}`)
redundantAsyncExecution()
redundantAsyncExecution()
redundantAsyncExecution()

// this will log:
// this async function will only be executed once if it is called with the same payload multiple times within 420ms
// processing result from a repeated payload
// processing result from a repeated payload
// processing result from a repeated payload
```
