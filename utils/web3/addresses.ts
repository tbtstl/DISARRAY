import { getAddress } from "ethers/lib/utils";

export function getFriendlyAddress(address: string) {
  const sanitizedAddr = getAddress(address);
  if (!sanitizedAddr) {
    throw new Error("Could not get friendly address from invalid raw address");
  }
  return `${sanitizedAddr.substr(0, 6)}...${sanitizedAddr.substr(38, 42)}`;
}
