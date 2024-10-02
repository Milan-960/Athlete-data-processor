/**
 * This module is responsible for processing athlete data collected from sports computers.
 * It consolidates the summary, laps, and heart rate samples into a structured JSON object
 * for further analysis by the science team.
 *
 * The main function, `processAthleteData`, takes three parameters:
 * - `summary`: An object containing general information about the athlete's activity.
 * - `laps`: An array of objects, each detailing the specifics of individual laps.
 * - `samples`: An array of objects representing heart rate samples, identified by their sample types.
 *
 * The output is a `ConsolidatedJSON` object containing:
 * - An overview of the activity, including key metrics like user ID, activity type, and device information.
 * - Detailed lap data, including start time, distance, duration, and processed heart rate samples.
 *
 * The heart rate samples are extracted and processed to ensure that 'null' values are converted
 * to zero, maintaining robustness in data analysis. This design strikes a balance between
 * enterprise-level robustness and simplicity, ensuring that the data remains accessible
 * and easy to work with.
 */

import {
  Summary,
  Lap,
  Sample,
  ConsolidatedJSON,
  ProcessedHeartRateSample,
} from "./interface";

// Function to process all data and produce consolidated JSON
export function processAthleteData(
  summary: Summary,
  laps: Lap[],
  samples: Sample[]
): ConsolidatedJSON {
  const lapsWithHeartRate = laps.map((lap, index) => {
    const heartRateSamples = extractHeartRateSamples(index, samples);
    return {
      startTime: lap.startTimeInSeconds,
      distance: lap.totalDistanceInMeters,
      duration: lap.timerDurationInSeconds,
      heartRateSamples,
    };
  });

  return {
    activityOverview: summary,
    laps: lapsWithHeartRate,
  };
}

// Function to extract heart rate samples based on lap index and sample type
function extractHeartRateSamples(
  lapIndex: number,
  samples: Sample[]
): ProcessedHeartRateSample[] {
  const heartRateSamples: ProcessedHeartRateSample[] = [];

  // Filter only the heart rate samples (sample-type: 2)
  const relevantSamples = samples.filter(
    (sample) => sample["sample-type"] === "2"
  );

  // Use the lapIndex to get the corresponding sample for the lap
  if (relevantSamples.length > lapIndex) {
    const sampleData = relevantSamples[lapIndex]; // Get the relevant sample
    const heartRates = sampleData.data
      .split(",")
      .map((rate) => (rate === "null" ? 0 : Number(rate))); // Convert 'null' to 0 for processing

    heartRates.forEach((rate, index) => {
      heartRateSamples.push({
        sampleIndex: index,
        heartRate: rate,
      });
    });
  }

  return heartRateSamples;
}

/**
 * This is Bonus version of the processAthleteData.
 * It uses the bonus functions to process the heart rate samples.
 *
 */

// import {
//   Summary,
//   Lap,
//   Sample,
//   ConsolidatedJSON,
//   ProcessedHeartRateSample,
// } from "./interface";

// import {
//   cleanHeartRateSamples,
//   reverseAggregation,
//   predictNextHeartRate,
// } from "./BonusProcessor";

// export function processAthleteData(
//   summary: Summary,
//   laps: Lap[],
//   samples: Sample[]
// ): ConsolidatedJSON {
//   const lapsWithHeartRate = laps.map((lap, index) => {
//     const heartRateSamples = extractHeartRateSamples(index, samples);
//     return {
//       startTime: lap.startTimeInSeconds,
//       distance: lap.totalDistanceInMeters,
//       duration: lap.timerDurationInSeconds,
//       heartRateSamples,
//     };
//   });

//   return {
//     activityOverview: summary,
//     laps: lapsWithHeartRate,
//   };
// }

// // Use the bonus functions inside the main heart rate processing function
// function extractHeartRateSamples(
//   lapIndex: number,
//   samples: Sample[]
// ): ProcessedHeartRateSample[] {
//   const heartRateSamples: ProcessedHeartRateSample[] = [];
//   const relevantSamples = samples.filter(
//     (sample) => sample["sample-type"] === "2"
//   );

//   if (relevantSamples.length > lapIndex * 2) {
//     const sampleData = relevantSamples.slice(lapIndex * 2, lapIndex * 2 + 2);
//     sampleData.forEach((sample, sampleIndex) => {
//       let heartRates = sample.data
//         .split(",")
//         .map((rate) => (rate === "null" ? 0 : Number(rate)));

//       // Step 1: Clean the data by removing outliers
//       heartRates = cleanHeartRateSamples(heartRates);

//       // Step 2: Reverse aggregation (expand data by interpolation)
//       heartRates = reverseAggregation(heartRates);

//       heartRates.forEach((rate, index) => {
//         heartRateSamples.push({
//           sampleIndex: index + sampleIndex * heartRates.length,
//           heartRate: rate,
//         });
//       });

//       // Step 3: Predict the next value
//       const predictedRate = predictNextHeartRate(heartRates);
//       heartRateSamples.push({
//         sampleIndex: heartRateSamples.length,
//         heartRate: predictedRate,
//       });
//     });
//   }

//   return heartRateSamples;
// }
