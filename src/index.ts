import { processAthleteData } from "./AthleteDataProcessor";
import { lapsData, sampleData, summaryData } from "./data/DummyData";

// Process and log the consolidated JSON output
const output = processAthleteData(summaryData, lapsData, sampleData);
console.log(
  "processAthleteData|Processed Output:",
  JSON.stringify(output, null, 2)
);
