// eslint-disable-next-line @typescript-eslint/ban-types
export function supportChainFunction(fn: Function, props: object) {
  const emptyKeys: string[] = Object.keys(props).filter(key => props[key] == undefined) || [];
  if (emptyKeys) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const chain: Record<string, Function> = {}
    for (const key of emptyKeys) {
      chain[key] = arg => {
        props[key] = arg;
        return supportChainFunction(fn, props);
      }
    }
    return chain
  } else {
    return fn(getParameterNames(fn).map(key => props[key]))
  }
}
// eslint-disable-next-line @typescript-eslint/ban-types
export function getParameterNames(fn: Function) {
  const COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
  const code = fn.toString().replace(COMMENTS, '');
  const result = code.slice(code.indexOf('(') + 1, code.indexOf(')'))
    .match(/([^\s,]+)/g);
  return result === null
    ? []
    : result;
}

export function findItemIndex<T>(item: T, list: T[], key: keyof T): number {
  return list.findIndex(i => i[key] === item[key])
}

