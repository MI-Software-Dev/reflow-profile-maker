import { ChannelName } from "./temperature-point";

export type ReflowTimeChannelResult = {
  [channel in ChannelName]?: {
    timeStartIdx: number;
    timeEndIdx: number;
    timeStart: number;
    timeEnd: number;
    diff: number;
    pass: boolean;
  };
};
