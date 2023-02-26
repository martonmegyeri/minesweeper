/**
 * Returns a random integer between min (include) and max (include).
 */
export function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Returns a random float between min (include) and max (include).
 */
export function getRandomFloat(min: number, max: number) {
  return Math.random() * (max - min + 1) + min;
}
