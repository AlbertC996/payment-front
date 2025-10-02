export const truncateWalletAddress = (address: string, startChars = 10, endChars = 10): string => {
  if (!address) return '';
  return `${address.substring(0, startChars)}...${address.substring(address.length - endChars)}`;
};