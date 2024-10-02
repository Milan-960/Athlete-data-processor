/**
 * This file defines TypeScript interfaces for processing athlete data, including summaries, laps, samples,
 * and the structure of the consolidated output JSON.
 */

export type Summary = {
  userId: string;
  activityId: number;
  activityName: string;
  durationInSeconds: number;
  startTimeInSeconds: number;
  startTimeOffsetInSeconds: number;
  activityType: string;
  averageHeartRateInBeatsPerMinute: number;
  activeKilocalories: number;
  deviceName: string;
  maxHeartRateInBeatsPerMinute: number;
};

export type Lap = {
  startTimeInSeconds: number;
  airTemperatureCelsius: number;
  heartRate: number;
  totalDistanceInMeters: number;
  timerDurationInSeconds: number;
};

export type Sample = {
  "recording-rate": number;
  "sample-type": string;
  data: string;
};

export type ProcessedHeartRateSample = {
  sampleIndex: number;
  heartRate: number | null;
};

export type ConsolidatedJSON = {
  activityOverview: Summary;
  laps: Array<{
    startTime: number;
    distance: number;
    duration: number;
    heartRateSamples: ProcessedHeartRateSample[];
  }>;
};
