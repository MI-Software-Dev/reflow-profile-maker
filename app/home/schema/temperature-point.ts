export type ChannelName =
  | "Ach(°C)"
  | "Bch(°C)"
  | "Cch(°C)"
  | "Dch(°C)"
  | "Ech(°C)"
  | "Fch(°C)";

export type TemperaturePoint = {
  "Time(s)": number;
} & {
  [channel in ChannelName]: number;
};
