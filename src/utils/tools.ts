export function supportChainFunction(fn: Function, props: Record<string, any>) {
  const emptyKeys:string[] = Object.keys(props).filter(key => props[key] == undefined) || [];
  if (emptyKeys) {
    return emptyKeys.map(key => (arg: any) => {
      props[key] = arg;
      return supportChainFunction(fn, props);
    });
  } else {
    return fn.apply(null, getParameterNames(fn).map(key => props[key]))
  }
}

export function getParameterNames(fn: Function) {
  var COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
  var code = fn.toString().replace(COMMENTS, '');
  var result = code.slice(code.indexOf('(') + 1, code.indexOf(')'))
    .match(/([^\s,]+)/g);
  return result === null
    ? []
    : result;
}

export function findItemIndex<T>(item: T, list: T[], key:keyof T): number{
  return list.findIndex(i => i[key] === item[key])
}

