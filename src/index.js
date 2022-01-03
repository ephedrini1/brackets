module.exports = function check(str, bracketsConfig) {
  const unique = [];
  const same = [];
  const opening = [];
  const closing = [];
  bracketsConfig.forEach(arr => arr[0] === arr[1] ? same.push(arr[0]) : unique.push(arr));
  unique.forEach(arr => {
    opening.push(arr[0]);
    closing.push(arr[1])
  });

  let stack = [];
  let last;
  for (let i = 0; i < str.length; i++) {
    if (opening.includes(str[i])) {
      stack.push(str[i]);
    } else if (closing.includes(str[i])) {
      if (stack.length) {
        last = stack[stack.length - 1];
        for (let j = 0; j < opening.length; j++) {
          if (last == opening[j] && str[i] == closing[j]) {
            stack.pop();
            break;
          }
        }
      } else return false;
    }
    else if (same.includes(str[i])) {
      stack.push(str[i]);
      last = stack[stack.length - 1];
      if (stack.length >= 2 && last === stack[stack.length - 2]) {
        stack.splice(-2, 2)
      }
    }
  }
  return (!stack.length);
}