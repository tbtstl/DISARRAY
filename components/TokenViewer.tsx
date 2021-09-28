import { DisarrayTokenData } from '../providers/FetchManager';
import SandboxIFrame from './SandboxIFrame';

export default function TokenViewer({
  tokenData,
}: {
  tokenData: DisarrayTokenData;
}) {
  return <SandboxIFrame src={tokenData?.htmlData} frameBorder="0" />;
}
