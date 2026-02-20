import { ChannelName } from "./temperature-point";

export type PreheatTimeResult = {
  [channel in ChannelName]: {
    start: number;
    end: number;
    pass: boolean;
    duration: number;
    error: string;
  };
};
