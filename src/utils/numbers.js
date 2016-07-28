export function roundUpToNearest(orig, target) {
  if (orig % target !== 0) {
    return orig + target - orig % target;
  }
  return orig;
}
