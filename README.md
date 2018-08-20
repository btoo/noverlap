# noverlap
prevent function invocations (both sync and async) from redundantly overlapping with each other

## usage

```js
import Noverlap from 'noverlap'

// instantiate noverlap instance
const noverlap = Noverlap()

// or instantiate noverlap with configurations that will determine whether or not two async function executions are overlapping with each other:
// hash: a function that generate a hash given the wrapped function's arguments
// comparator: a function that determines whether or not a hash has already been added as a key when looking through the map's keys. useful for when you've lost the reference to certain keys (eg storing objects or arrays as keys)
// wait: the timer duration in milliseconds that will start on each execution of an async function and reset with every overlapping execution
// start: a callback (provided with the wrapped function's arguments) that will be synchronously executed right before the wrapped function
// finish: a callback (provided with the return value of the wrapped function) that will be executed after the wrapped function

// the following are the default configurations:
const noverlap = Noverlap({
  // the first parameter will be considered the hash of the function execution
  hash: (...args) => args[0],

  // find a direct reference to the hash that will be looked up as the key in map.get(key)
  comparator: (hash, existingKey) => hash === existingKey,

  // wait 420ms to see if another execution of the async function is overlapping with an existing one
  wait: 420,
})

// the following are not included by default but can be added manually during noverlap instantiation
const noverlap = Noverlap({
  start(...args) { console.log('about to execute the function with a payload of', payload) },
  finished(returnValue) { console.log('the redundantly invoked function returned', returnValue) },
})

// let's use this dummy async function that we pretend makes a fetch to a server
// we do not want this fetcher to make the same call multiple times in a row when in fact
// we only need the data from the latest call, which should return the most up to date response.
const dummyFetcher = payload => new Promise((resolve, reject) => setTimeout(_ => resolve(payload)))

// apply the noverlap instance to an async function by wrapping it
const fetchSomeData = noverlap(async payload => {
  const response = await dummyFetcher(payload)
  console.log('this async function will only be executed once if it is called with the same payload multiple times within 420ms')
  return response
})

const redundantAsyncExecution = async n => console.log(`result from execution #${n} with a fetch using a ${await fetchSomeData('repeated payload')}`)
redundantAsyncExecution(1)
redundantAsyncExecution(2)
redundantAsyncExecution(3)

// this will log:
// this async function will only be executed once if it is called with the same payload multiple times within 420ms
// result from execution #1 with a fetch using a repeated payload
// result from execution #2 with a fetch using a repeated payload
// result from execution #3 with a fetch using a repeated payload
```
