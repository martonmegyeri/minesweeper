/**
 * Returns a random integer between min (include) and max (include).
 */
export default function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
