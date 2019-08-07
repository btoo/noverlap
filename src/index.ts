type ResolveType<T> = T extends Promise<infer R> ? R : T;
type HashFunction<T, P extends any[]> = (this: T, ...args: P) => any

interface NoverlapConfig<T, P extends any[]> {
  hash?: HashFunction<T, P>
  comparator?: (hash: any, existingKey: any) => boolean
  wait?: number
  start?: (...args: any[]) => any
  queue?: (...args: any[]) => any
  beforeFinish?: (...args: any[]) => any
  success?: (result: any, ...args: any[]) => any
  fail?: (result: Error, ...args: any[]) => any
  finish?: (result: any, ...args: any[]) => any
};

type NoverlapConfigPromisefied<T, P extends any[]> = NoverlapConfig<T, P> | Promise<NoverlapConfig<T, P>>

type NoverlapConfigProvision<T, P extends any[]> = NoverlapConfigPromisefied<T, P> | ((...args: any[]) => NoverlapConfigPromisefied<T, P>);

type ResolveReject<R> = [(value?: R | PromiseLike<R>) => void, (reason?: any) => void];

const wrappedFunctionCloner = <F extends (...args: any[]) => any, T, P extends any[], R>(
  config: NoverlapConfigProvision<T, P>, fn: F, map: Map<any, ResolveReject<R>[]>
): ((this: T, ...args: P) => Promise<R>) => {
  const pseudoKey = Symbol(); // provide default key in case the wrapped function has no arguments to hash with
  return async function(...args: P) {

    const self = this;
    type Context = typeof self;

    const {
      hash = undefined,
      comparator = undefined,
      wait = 420,
      start = undefined,
      queue = undefined,
      beforeFinish = undefined,
      success = undefined,
      fail = undefined,
      finish = undefined,
    } = await (
      typeof config === 'function'
        ? config(...args)
        : config
     ) || {};

    const w = typeof wait === 'number' ? wait : 420;

    return new Promise<R>(async (...resrej: ResolveReject<R>) => {
      const key =
        typeof hash === 'function' ? await hash.call(this, ...args) :
        (args && args.length) ? args[0] :
        pseudoKey;

      let keyReference = false;
      if (typeof comparator === 'function') {
        const keys = map.keys();
        let existingKey;
        while (existingKey = keys.next().value) {
          if (await comparator(key, existingKey)) {
            keyReference = existingKey;
            break;
          }
        }
      } else if (map.has(key)) {
        keyReference = key;
      }

      let value: ResolveReject<R>[];
      if (keyReference) {
        const resolveRejects = map.get(keyReference);
        !resolveRejects && console.warn(`Function invocations not found despite the existence of invocation hash.`, 'Function:', fn, 'Hash:', key);
        value = resolveRejects || [];
        value.push(resrej);
      } else {
        value = [resrej];
        map.set(key, value);
        typeof start === 'function' && await start(...args);
      }

      typeof queue === 'function' && await queue(...args);

      setTimeout(async () => {
        if (value && value[value.length - 1] === resrej) {
          let result: any;
          try {
            typeof beforeFinish === 'function' && await beforeFinish(...args);
            result = await fn.call(this, ...args);
            typeof success === 'function' && await success(result, ...args);
            value.map(([resolve, reject]) => resolve(result));
          } catch (err) {
            result = err;
            typeof fail === 'function' && await fail(result, ...args);
            value.map(([resolve, reject]) => reject(result));
          } finally {
            typeof finish === 'function' && await finish(result, ...args);
            map.delete(keyReference);
          }
        }
      }, w);
    });
  }
}

type ContextOfWrappedFunction = ThisType<ReturnType<typeof wrappedFunctionCloner>> | void

/**
 * prevent function invocations (both sync and async) from redundantly overlapping with each other.
 * note that this will cause the function's return value to be async
 * @param config - noverlap configs
 * @param config.hash - a hash function of the async function parameters
 * @param config.comparator - a function used to determine if an existing key in the map is to be considered the same as a hash
 * @param config.wait - a wait time that will start on each execution of an async function and reset with every overlapping execution
 * @param config.start - a callback that is provided with the wrapped function's parameters and invoked when the wrapped function's key is hashed into the map
 * @param config.queue - a callback that is provided with the wrapped function's parameters and invoked whenever an invocation of the wrapped function is recorded
 * @param config.beforeFinish - a callback that is provided with the wrapped function's parameters and invoked right before the wrapped function
 * @param config.success - a callback that is provided with the wrapped function's invocation's result and arguments and executed after the wrapped function is successfully called
 * @param config.fail - a callback that is provided with the wrapped function's invocation's error and arguments and executed after the wrapped function is erroneously called
 * @param config.finish - a callback that is provided with the wrapped function's invocation's result and arguments and executed after the wrapped function is called
 * @returns - an instantiation of noverlap, a wrapper function used to apply noverlap to any function
 */
export default <FR extends (...args: any[]) => any>(config: NoverlapConfigProvision<ContextOfWrappedFunction, Parameters<FR>> = {}) => <F extends FR>(fn: F) => {
  const map = new Map();

  type Params = Parameters<F>;
  type Return = ResolveType<ReturnType<F>>;

  return wrappedFunctionCloner<F, ContextOfWrappedFunction, Params, Return>(config, fn, map);
};
