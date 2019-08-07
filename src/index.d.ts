interface NoverlapConfig<F extends (...args: any[]) => any> {
  hash?: (...args: Parameters<F>) => any
  comparator?: (hash: any, existingKey: any) => boolean
  wait?: number
  start?: (...args: any[]) => any
  queue?: (...args: any[]) => any
  beforeFinish?: (...args: any[]) => any
  success?: (result: any, ...args: any[]) => any
  fail?: (result: Error, ...args: any[]) => any
  finish?: (result: any, ...args: any[]) => any
}

type ResolveType<T> = T extends Promise<infer R> ? R : T;

declare const noverlap: <F extends (...args: any[]) => any>(noverlapConfig?: NoverlapConfig<F>) => <FW extends F = F>(wrappedFunction: FW) => (...args: Parameters<FW>) => Promise<ResolveType<ReturnType<FW>>>

export default noverlap
