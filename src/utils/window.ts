export function getCurrentPath() {
  const {pathname} = window.location
  return pathname.replace('/', '');
}
