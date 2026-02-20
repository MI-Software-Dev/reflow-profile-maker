import { ChannelName } from "./temperature-point";


export type PeakTempChannelResult = {
  [channel in ChannelName]?: {
    time: number;
    value: number;
    pass: boolean;
  };
};
