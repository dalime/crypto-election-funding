/**
 * Rounds a number to 6 decimal places
 * @param num number
 * @returns number
 */
export const roundTo6Decimals = (num: number): number => {
  return Math.round(num * Math.pow(10, 6)) / Math.pow(10, 6);
}

/**
 * Calculates age based on the birthdate.
 * @param birthdate - The birthdate in the format YYYY-MM-DD.
 * @returns The calculated age.
 */
export function calculateAge(birthdate: string): number {
  const birthDate = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  // Adjust age if the birthdate hasn't occurred yet this year
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }
  return age;
}