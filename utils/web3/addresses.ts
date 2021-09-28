import { getAddress } from 'ethers/lib/utils';
import { defaultProvider } from './connectors';

export function getFriendlyAddress(address: string) {
  const sanitizedAddr = getAddress(address);
  if (!sanitizedAddr) {
    throw new Error('Could not get friendly address from invalid raw address');
  }
  return `${sanitizedAddr.substr(0, 6)}...${sanitizedAddr.substr(38, 42)}`;
}

export async function attemptGetENSName(address: string) {
  try {
    const ensName = await defaultProvider.lookupAddress(address);
    if (ensName) {
      return ensName;
    } else {
      return address;
    }
  } catch {
    return address;
  }
}
