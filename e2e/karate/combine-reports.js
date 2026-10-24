const fs = require('fs');
const path = require('path');

const reportsDir = 'target/karate-reports';
const outputFile = 'target/cucumber-result.json';

if (!fs.existsSync(reportsDir)) {
  console.error(`[combine-reports] ERROR: reports directory not found: ${reportsDir}`);
  process.exit(1);
}

// Karate 2.1+ writes Cucumber JSON under <reportsDir>/cucumber-json, 2.0.x wrote it at the root.
const collectJsonFiles = dir =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return collectJsonFiles(fullPath);
    }
    return entry.name.endsWith('.json') ? [fullPath] : [];
  });

let files;
try {
  files = collectJsonFiles(reportsDir);
} catch (err) {
  console.error(`[combine-reports] ERROR: cannot read reports directory: ${err.message}`);
  process.exit(1);
}

const combinedReport = [];
let parseErrors = 0;

files.forEach(filePath => {
  const file = path.relative(reportsDir, filePath);
  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    console.warn(`[combine-reports] WARN: skipping unparseable file ${file}: ${err.message}`);
    parseErrors++;
    return;
  }
  if (!Array.isArray(parsed)) {
    console.warn(`[combine-reports] WARN: skipping non-array report ${file}`);
    parseErrors++;
    return;
  }
  combinedReport.push(...parsed);
});

if (combinedReport.length === 0) {
  console.error('[combine-reports] ERROR: no valid report entries found — cannot produce combined report');
  process.exit(1);
}

if (parseErrors > 0) {
  console.warn(`[combine-reports] WARN: ${parseErrors} file(s) skipped due to parse errors`);
}

fs.writeFileSync(outputFile, JSON.stringify(combinedReport, null, 2), 'utf8');
console.log(`[combine-reports] Combined report written to ${outputFile} (${combinedReport.length} entries)`);
