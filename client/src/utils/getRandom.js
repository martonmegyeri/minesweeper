/**
 * Returns a random integer between min (include) and max (include)
 * @param {number} min
 * @param {number} max
 */
export default function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
