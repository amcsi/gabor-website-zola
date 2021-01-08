export function stringify(object: object) {
  let ret = '';
  for (const [key, value] of Object.entries(object)) {
    ret += `${key} = ${JSON.stringify(value)}`;
  }
  return ret;
}
