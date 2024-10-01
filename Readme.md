# Athlete Data Processor

## Overview

The **Athlete Data Processor** is a library designed to process data from professional athletes' sports computers. This library can load three types of input data summary, laps, and samples—and consolidate them into a unified JSON format. The resulting data is suitable for further analysis by sports scientists and teams.

### Features

- Consolidates athlete data into a structured format.
- Processes heart rate samples, including handling null values and outlier detection.
- Interpolates and predicts future heart rate measurements.

## To run the project please check out this section

**[Instructions](#instructions)**

## Table of Contents

1. [Project Setup](#project-setup)

## Project Setup

### Step 1: Initialize the Project

1. **Create a new project folder**, and initialize a Node.js project:
   ```bash
   npm init -y
   ```
2. Install Required Dependencies: Install TypeScript, Jest, and other necessary libraries:

```bash
npm install typescript jest ts-jest @types/jest --save-dev
```

3. Initialize TypeScript: Set up TypeScript by creating a tsconfig.json file:

```bash
npx tsc --init
```

- Edit **tsconfig.json** to ensure compatibility with Jest. Here's a minimal configuration:

```bash
{
  "compilerOptions": {
    "incremental": true,
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "target": "es2016",
    "module": "commonjs",
    "rootDir": "./",
    "outDir": "./dist",
    "skipLibCheck": true,
    "sourceMap": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true
  },
  "include": ["src/**/*", "tests/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

4. Set Up Jest: Configure Jest by creating a jest.config.js file:

```bash
npx ts-jest config:init
```
