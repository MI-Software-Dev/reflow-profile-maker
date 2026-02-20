import { ChannelName } from "./temperature-point";


export type ReflowTimeChannelResult = {
  [channel in ChannelName]?: {
    start: number;
    end: number;
    value: number;
    pass: boolean;
  };
};
