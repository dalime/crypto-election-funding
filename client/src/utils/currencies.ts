/**
 * Formats a number to 'X,XXX.XX USD'
 * @param amount number
 * @returns string
 */
export function formatToUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount) + ' USD';
}