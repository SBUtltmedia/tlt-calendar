function manipulateString(string, index, fn) {
  return fn(parseInt(string.substring(0, index))) + string.sub(index + 1, string.length + 1);
}

export function halfCssSize(size) {
  if (typeof(size) === 'string') {
    if (size.indexOf('%') !== -1) {
      manipulateString(size, size.indexOf('%'), x => x / 2);
    }
    else if (size.indexOf('px') !== -1) {
      manipulateString(size, size.indexOf('px'), x => x / 2);
    }
  }
  else if (typeof(size) === 'number') {
    return size / 2;
  }
  else {
    throw new Error("Invalid type for size: " + typeof(size));
  }
}
