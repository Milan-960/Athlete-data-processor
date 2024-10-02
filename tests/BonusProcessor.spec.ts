import {
  cleanHeartRateSamples,
  reverseAggregation,
  predictNextHeartRate,
} from "../src/BonusProcessor";

describe("Bonus Section: Heart Rate Pre-processing and Modeling", () => {
  test("should clean heart rate samples by removing outliers", () => {
    const heartRates = [80, 120, 300, 40, 35]; // 300 and 35 are outliers
    const cleanedRates = cleanHeartRateSamples(heartRates);
    expect(cleanedRates).toEqual([80, 120, 0, 40, 0]);
  });

  test("should reverse aggregation and interpolate heart rate samples", () => {
    const heartRates = [120, 140]; // Two points
    const interpolatedRates = reverseAggregation(heartRates);

    // We expect 10 values in total (5 interpolated for each pair)
    expect(interpolatedRates).toHaveLength(7);
    expect(interpolatedRates[0]).toBe(120); // First value
    expect(interpolatedRates[1]).toBe(124); // First interpolated value
    expect(interpolatedRates[2]).toBe(128); // Second interpolated value
    expect(interpolatedRates[3]).toBe(132); // Third interpolated value
    expect(interpolatedRates[4]).toBe(136); // Fourth interpolated value
    expect(interpolatedRates[5]).toBe(140); // Last value
  });

  test("should handle single point input", () => {
    const heartRates = [130]; // One point
    const interpolatedRates = reverseAggregation(heartRates);

    // Should return the same single point repeated
    expect(interpolatedRates).toHaveLength(1);
    expect(interpolatedRates).toEqual([130]);
  });

  test("should handle empty array input", () => {
    const heartRates: number[] = [];
    const interpolatedRates = reverseAggregation(heartRates);

    // Should return an empty array
    expect(interpolatedRates).toEqual([]);
  });

  test("should predict the next heart rate value", () => {
    const heartRates = [120, 125, 130, 135, 140];
    const predictedRate = predictNextHeartRate(heartRates);
    expect(predictedRate).toBeGreaterThan(140); // Predicted value should be higher
  });
});
