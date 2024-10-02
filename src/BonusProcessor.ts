/**
 * This module handles the pre-processing and modeling of heart rate data.
 * It provides functions for cleaning, aggregating, and predicting heart rate values,
 * which are crucial for analyzing athlete performance and health metrics.
 *
 * The module includes the following functions:
 *
 * 1. `cleanHeartRateSamples`: Cleans heart rate data by removing outliers,
 *    ensuring that heart rate values remain within a normal range (40 to 220 bpm).
 *
 * 2. `reverseAggregation`: Expands aggregated heart rate values into individual tick values.
 *    It interpolates between two consecutive heart rate measurements to produce more granular data.
 *    If only one data point is provided, it returns that point unchanged.
 *
 * 3. `predictNextHeartRate`: Uses a simple linear regression model to predict the next heart rate value
 *    based on the historical heart rate data provided. This predictive capability helps in
 *    monitoring trends in heart rate over time.
 *
 * The design philosophy emphasizes both robustness and simplicity, ensuring that the data processing
 * is reliable and the resulting metrics are easy to understand and utilize.
 */

export function cleanHeartRateSamples(heartRates: number[]): number[] {
  return heartRates.map((rate) => (rate < 40 || rate > 220 ? 0 : rate));
}

// Reverse aggregation function: expands aggregated values into individual ticks
export function reverseAggregation(heartRates: number[]): number[] {
  const interpolated: number[] = [];

  // Check for at least two points to interpolate
  if (heartRates.length < 2) {
    return heartRates; // If there's one or no data point, return as is
  }

  for (let i = 0; i < heartRates.length - 1; i++) {
    const start = heartRates[i];
    const end = heartRates[i + 1];
    const diff = (end - start) / 5; // Interpolation difference

    // Add the start value
    interpolated.push(start);

    // Interpolate and add 5 intermediate values
    for (let j = 1; j <= 5; j++) {
      interpolated.push(start + diff * j);
    }
  }

  // Add the last heart rate value
  interpolated.push(heartRates[heartRates.length - 1]); // Include the last value once

  return interpolated;
}

// Prediction modeling: Predicts the next heart rate value using a simple linear regression model
export function predictNextHeartRate(heartRates: number[]): number {
  const n = heartRates.length;
  const x = Array.from({ length: n }, (_, i) => i + 1);
  const y = heartRates;

  const xMean = x.reduce((sum, value) => sum + value, 0) / n;
  const yMean = y.reduce((sum, value) => sum + value, 0) / n;

  let num = 0,
    denom = 0;
  for (let i = 0; i < n; i++) {
    num += (x[i] - xMean) * (y[i] - yMean);
    denom += (x[i] - xMean) ** 2;
  }

  const slope = num / denom;
  const intercept = yMean - slope * xMean;

  return slope * (n + 1) + intercept; // Predict next value
}
