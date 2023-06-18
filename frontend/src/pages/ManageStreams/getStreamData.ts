import { IStream } from "@streamable-finance/sdk-core";
import { BigNumber, utils } from "ethers";

export interface StreamData {
  id: string;
  flowRate: string;
  currencySymbol: string;
  address: string;
  direction: string;
}

export const getManageStreamsData = (
  addrFieldName: "sender" | "receiver",
  direction: string,
  streams?: IStream[]
): StreamData[] | undefined => {
  if (!streams) return;

  // 1. Filter streams that are not active anymore (flowrate is zero).
  // 2. Map only needed data from response.
  const streamData: StreamData[] = streams
    .filter((stream) => !BigNumber.from(stream.currentFlowRate).isZero())
    .map((stream) => {
      return {
        id: stream.id,
        flowRate: monthlyRateToDisplay(stream.currentFlowRate),
        currencySymbol: stream.token.symbol,
        address: stream[addrFieldName] as string,
        direction: direction,
      };
    });

  return streamData;
};

export const monthlyRateToDisplay = (rate: string) => {
  const rateInWei = BigNumber.from(rate);
  const monthlyInDecimals = rateInWei.mul(3600).mul(24).mul(30);
  return (+utils.formatEther(monthlyInDecimals)).toFixed(4);
};

export default getManageStreamsData;
