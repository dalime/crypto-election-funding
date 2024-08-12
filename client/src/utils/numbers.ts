/**
 * Rounds a number to 6 decimal places
 * @param num number
 * @returns number
 */
export const roundTo6Decimals = (num: number): number => {
  return Math.round(num * Math.pow(10, 6)) / Math.pow(10, 6);
}