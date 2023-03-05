/**
 * @param elapsedTime elapsed time in milliseconds
 */
export default function formatTime(elapsedTime: number) {
  const minutes = Math.floor(elapsedTime / 1000 / 60);
  const seconds = elapsedTime / 1000 - minutes * 60;
  return `${prependWithZero(minutes)}:${prependWithZero(seconds)}`;
}

function prependWithZero(number: number) {
  return number > 9 ? `${number}` : `0${number}`;
}
