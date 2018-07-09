# noverlap
prevent redundant promise-based async executions from overlapping with each other

## usage

```js
import Noverlap from 'noverlap'

// instantiate noverlap instance
const noverlap = Noverlap()

// instantiate noverlap with two configurations that will determine whether or not two async function executions are overlapping with each other:
// 1. a hash function of the async function parameters
// 2. a wait time that will start on each execution of an async function and reset with every overlapping execution
// the following are the default configurations:
const noverlap = Noverlap(
  // the first parameter will be considered the hash of the async function
  asyncFnArgs => asyncFnArgs[0],
  // wait 420ms to see if another execution of the async function is overlapping with an existing one
  420
)

// apply the noverlap instance to an async function by wrapping it
const dummyFetcher = payload => new Promise((resolve, reject) => setTimeout(_ => resolve(`response from submitting: ${payload}`)));
const fetchSomeData = noverlap(async payload => {
  const response = await dummyFetcher(payload);
  console.log('this async function will only be executed once if it is called with the same payload multiple times within 420ms')
  return response;
})

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