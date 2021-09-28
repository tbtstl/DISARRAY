import { ChaosTokenData } from '../providers/FetchManager';
import SandboxIFrame from './SandboxIFrame';

export default function TokenViewer({
  tokenData,
}: {
  tokenData: ChaosTokenData;
}) {
  return <SandboxIFrame src={tokenData?.htmlData} frameBorder="0" />;
}
