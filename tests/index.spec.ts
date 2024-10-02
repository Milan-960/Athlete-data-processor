import { processAthleteData } from "../src/AthleteDataProcessor";
import { lapsData, sampleData, summaryData } from "../src/data/DummyData";

describe("Index Module", () => {
  it("should process athlete data and return consolidated JSON", () => {
    const result = processAthleteData(summaryData, lapsData, sampleData);

    expect(result).toHaveProperty("activityOverview");
    expect(result.activityOverview).toEqual(summaryData);
    expect(result).toHaveProperty("laps");
    expect(result.laps).toHaveLength(2);

    // Check heart rate samples for the first lap
    const firstLap = result.laps[0];
    expect(firstLap).toHaveProperty("heartRateSamples");
    expect(firstLap.heartRateSamples).toHaveLength(7); // Should match sample size
    expect(firstLap.heartRateSamples[0]).toEqual({
      sampleIndex: 0,
      heartRate: 120,
    });
    expect(firstLap.heartRateSamples[6]).toEqual({
      sampleIndex: 6,
      heartRate: 145,
    });

    // Check heart rate samples for the second lap
    const secondLap = result.laps[1];
    expect(secondLap).toHaveProperty("heartRateSamples");
    expect(secondLap.heartRateSamples).toHaveLength(7); // Should match sample size
    expect(secondLap.heartRateSamples[0]).toEqual({
      sampleIndex: 0,
      heartRate: 141,
    });
    expect(secondLap.heartRateSamples[6]).toEqual({
      sampleIndex: 6,
      heartRate: 120,
    });
  });

  it("should handle null values in heart rate samples and convert them to 0", () => {
    // Modify sample data to include null values
    const modifiedSampleData = [
      {
        "recording-rate": 5,
        "sample-type": "2",
        data: "120,126,null,140,142,155,145", // Contains 'null'
      },
      {
        "recording-rate": 5,
        "sample-type": "2",
        data: "141,147,155,160,180,152,120",
      },
    ];

    const result = processAthleteData(
      summaryData,
      lapsData,
      modifiedSampleData
    );
    const firstLap = result.laps[0];

    // Check that 'null' is converted to 0
    expect(firstLap.heartRateSamples[2]).toEqual({
      sampleIndex: 2,
      heartRate: 0, // Expect 'null' to be converted to 0
    });
  });

  it("should return an empty result for empty input data", () => {
    const emptySummary = { ...summaryData, userId: "" }; // Modify to create an empty summary
    const result = processAthleteData(emptySummary, [], []);

    expect(result.activityOverview).toEqual(emptySummary);
    expect(result.laps).toHaveLength(0); // No laps should be present
  });

  it("should maintain the correct structure in the returned JSON", () => {
    const result = processAthleteData(summaryData, lapsData, sampleData);

    expect(result).toHaveProperty("activityOverview");
    expect(result.activityOverview).toHaveProperty("userId");
    expect(result.activityOverview).toHaveProperty("activityId");
    expect(result.laps).toBeInstanceOf(Array);
    result.laps.forEach((lap) => {
      expect(lap).toHaveProperty("startTime");
      expect(lap).toHaveProperty("distance");
      expect(lap).toHaveProperty("duration");
      expect(lap).toHaveProperty("heartRateSamples");
      expect(lap.heartRateSamples).toBeInstanceOf(Array);
    });
  });
});
