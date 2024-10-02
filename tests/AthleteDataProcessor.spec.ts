import { processAthleteData } from "../src/AthleteDataProcessor";
import { Summary, Lap, Sample } from "../src/interface";

describe("AthleteDataProcessor", () => {
  let summaryData: Summary;
  let lapsData: Lap[];
  let sampleData: Sample[];

  beforeEach(() => {
    // Initialize the sample data before each test
    summaryData = {
      userId: "1234567890",
      activityId: 9480958402,
      activityName: "Indoor Cycling",
      durationInSeconds: 3667,
      startTimeInSeconds: 1661158927,
      startTimeOffsetInSeconds: 7200,
      activityType: "INDOOR_CYCLING",
      averageHeartRateInBeatsPerMinute: 150,
      activeKilocalories: 561,
      deviceName: "instinct2",
      maxHeartRateInBeatsPerMinute: 190,
    };

    lapsData = [
      {
        startTimeInSeconds: 1661158927,
        airTemperatureCelsius: 28,
        heartRate: 109,
        totalDistanceInMeters: 15,
        timerDurationInSeconds: 600,
      },
      {
        startTimeInSeconds: 1661158929,
        airTemperatureCelsius: 28,
        heartRate: 107,
        totalDistanceInMeters: 30,
        timerDurationInSeconds: 900,
      },
    ];

    sampleData = [
      {
        "recording-rate": 5,
        "sample-type": "2",
        data: "143,151,164,null,173,181,180", // This contains 'null'
      },
      {
        "recording-rate": 5,
        "sample-type": "2",
        data: "182,170,188,181,174,172,158",
      },
    ];
  });

  it("should process athlete data and return consolidated JSON", () => {
    const result = processAthleteData(summaryData, lapsData, sampleData);

    expect(result.activityOverview).toEqual(summaryData);
    expect(result.laps).toHaveLength(2);

    // Check heart rate samples for the first lap
    const firstLap = result.laps[0];
    expect(firstLap.heartRateSamples).toHaveLength(7); // Sample data is 7 points
    expect(firstLap.heartRateSamples[0]).toEqual({
      sampleIndex: 0,
      heartRate: 143,
    });
    expect(firstLap.heartRateSamples[6]).toEqual({
      sampleIndex: 6,
      heartRate: 180,
    });

    // Check heart rate samples for the second lap
    const secondLap = result.laps[1];
    expect(secondLap.heartRateSamples).toHaveLength(7); // Sample data is 7 points
    expect(secondLap.heartRateSamples[0]).toEqual({
      sampleIndex: 0,
      heartRate: 182,
    });
    expect(secondLap.heartRateSamples[6]).toEqual({
      sampleIndex: 6,
      heartRate: 158,
    });
  });

  it("should handle null values in heart rate samples and convert them to 0", () => {
    const result = processAthleteData(summaryData, lapsData, sampleData);
    const firstLap = result.laps[0]; // Check the first lap, which includes 'null'

    // Check that 'null' is converted to 0
    expect(firstLap.heartRateSamples).toEqual([
      {
        sampleIndex: 0,
        heartRate: 143,
      },
      {
        sampleIndex: 1,
        heartRate: 151,
      },
      {
        sampleIndex: 2,
        heartRate: 164,
      },
      {
        sampleIndex: 3,
        heartRate: 0, // Expect 'null' to be converted to 0
      },
      {
        sampleIndex: 4,
        heartRate: 173,
      },
      {
        sampleIndex: 5,
        heartRate: 181,
      },
      {
        sampleIndex: 6,
        heartRate: 180,
      },
    ]);
  });
});
