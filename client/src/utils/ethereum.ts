/**
 * Shortens an Ethereum address
 * @param address `0x${string}`
 * @param chars number
 * @returns string
 */
export const shortenAddress = (address: `0x${string}`, chars = 4): string => {
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}