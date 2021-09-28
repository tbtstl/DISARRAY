import { useCallback } from 'react';
import { Disarray__factory } from '../../typechain';
import { defaultProvider } from './connectors';
import { attemptGetENSName } from './addresses';

export const getTokenData = async (tokenId: number) => {
  const disarrayContract = Disarray__factory.connect(
    process.env.NEXT_PUBLIC_DISARRAY_ADDRESS,
    defaultProvider
  );

  const uri = await disarrayContract.tokenURI(tokenId);
  const creatorAddress = await disarrayContract.tokenCreators(tokenId);
  const creatorName = await attemptGetENSName(creatorAddress);
  const ownerAddress = await disarrayContract.ownerOf(tokenId);
  const ownerName = await attemptGetENSName(ownerAddress);
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
    creatorName,
    ownerName,
    name,
    description,
    htmlData,
    uri,
  };
};
