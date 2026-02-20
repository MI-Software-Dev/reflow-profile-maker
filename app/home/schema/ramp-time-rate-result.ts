import { ChannelName } from "./temperature-point";


export type RampTimeRateChannelResult = {
  [channel in ChannelName]?: {
    pass: boolean;
    up?: {
      start: number;
      end: number;
      duration: number;
    };
    down?: {
      start: number;
      end: number;
      duration: number;
    };
    error?: string;
  };
};
