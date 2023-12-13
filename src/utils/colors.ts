function getBaseColors(hex){
  const _parseInt = (number) => {
    return parseInt(number);
  }
  const prefix = '0x';
  hex = hex.substring(1);
  const red = _parseInt(prefix + hex.slice(0, 2));
  const green = _parseInt(prefix + hex.slice(2, 4));
  const blue = _parseInt(prefix + hex.slice(4, 6));
  return {
    red,
    green,
    blue
  }
}

/**
 * hex to rgb
 * @param hex 十六进制颜色
 */
export function hexToRgb(hex: string) {
  const {red, green, blue} = getBaseColors(hex)
  return `rgb(${red}, ${green}, ${blue})`;
}

/**
 * hex to rgba
 * @param hex 十六进制颜色
 * @param opacity 透明度
 */
export function hexToRgba(hex, opacity) {
  const {red, green, blue} = getBaseColors(hex)
  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}
