declare module "src/index" {
    type ResolveType<T> = T extends Promise<infer R> ? R : T;
    type HashFunction<T, P extends any[]> = (this: T, ...args: P) => any;
    interface NoverlapConfig<T, P extends any[]> {
        hash?: HashFunction<T, P>;
        comparator?: (hash: any, existingKey: any) => boolean;
        wait?: number;
        start?: (...args: any[]) => any;
        queue?: (...args: any[]) => any;
        beforeFinish?: (...args: any[]) => any;
        success?: (result: any, ...args: any[]) => any;
        fail?: (result: Error, ...args: any[]) => any;
        finish?: (result: any, ...args: any[]) => any;
    }
    type NoverlapConfigPromisefied<T, P extends any[]> = NoverlapConfig<T, P> | Promise<NoverlapConfig<T, P>>;
    type NoverlapConfigProvision<T, P extends any[]> = NoverlapConfigPromisefied<T, P> | ((...args: any[]) => NoverlapConfigPromisefied<T, P>);
    const wrappedFunctionCloner: <F extends (...args: any[]) => any, T, P extends any[], R>(config: NoverlapConfigProvision<T, P>, fn: F, map: Map<any, [(value?: R | PromiseLike<R>) => void, (reason?: any) => void][]>) => (this: T, ...args: P) => Promise<R>;
    type ContextOfWrappedFunction = ThisType<ReturnType<typeof wrappedFunctionCloner>> | void;
    const _default: <FR extends (...args: any[]) => any>(config?: NoverlapConfigProvision<ContextOfWrappedFunction, Parameters<FR>>) => <F extends FR>(fn: F) => (this: ContextOfWrappedFunction, ...args: Parameters<F>) => Promise<ResolveType<ReturnType<F>>>;
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
    export default _default;
}
declare module "test/async-config" {
    const _default_1: () => Promise<[void, void, void]>;
    export default _default_1;
}
declare module "test/callbacks" {
    const _default_2: () => Promise<[void, void, void]>;
    export default _default_2;
}
declare module "test/override" {
    const _default_3: () => Promise<[void, void, void]>;
    export default _default_3;
}
declare module "test/repeat" {
    const _default_4: () => Promise<[void, void, void]>;
    export default _default_4;
}
declare module "test/timeout" {
    const _default_5: () => Promise<unknown>;
    export default _default_5;
}
declare module "test/unique" {
    const _default_6: () => Promise<void>;
    export default _default_6;
}
declare module "test/index" {
    export const processSomeData: (this: void | ThisType<(this: unknown, ...args: any[]) => Promise<unknown>>, data: any) => Promise<string>;
    export const fetchSomeData: (this: void | ThisType<(this: unknown, ...args: any[]) => Promise<unknown>>, payload: any) => Promise<unknown>;
}
declare module "test/async" {
    const _default_7: () => Promise<[void, void, void]>;
    export default _default_7;
}
