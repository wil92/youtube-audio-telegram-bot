import {arrayToQuery} from "./arrayToQuery";

export function objectToQueryParams(obj: any = {}) {
  let result = '';
  if (obj) {
    Object.keys(obj).forEach((key) => {
      let val = obj[key];
      if (val !== null && val !== undefined) {
        if (Array.isArray(val)) {
          val = arrayToQuery(val);
        }
        result += `&${key}=${val}`;
      }
    });
  }
  result = result.replace(/^&/, '?');
  return result;
}
