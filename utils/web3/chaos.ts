import { useCallback } from 'react';
import { Chaos__factory } from '../../typechain';
import { defaultProvider } from './connectors';

export const getTokenData = async (tokenId: number) => {
  const chaosContract = Chaos__factory.connect(
    process.env.NEXT_PUBLIC_CHAOS_ADDRESS,
    defaultProvider
  );

  const uri = await chaosContract.tokenURI(tokenId);
  const creatorAddress = await chaosContract.tokenCreators(tokenId);
  const ownerAddress = await chaosContract.ownerOf(tokenId);
  let name, description, htmlData;
  try {
    // Remove first 29 characters (29 = length of "data:application/json;base64,")
    console.log(Buffer.from(uri.substring(29), 'base64').toString());
    const jsonString = Buffer.from(uri.substring(29), 'base64').toString();
    console.log({ jsonString });
    const uriJSON = JSON.parse(jsonString);
    name = uriJSON.name;
    description = uriJSON.description;
    htmlData = uriJSON.animation_url;
  } catch (e) {
    console.error('Error fetching token ', tokenId);
    console.error(e);
  }

  return {
    creatorAddress,
    ownerAddress,
    name,
    description,
    htmlData,
    uri,
  };
};
