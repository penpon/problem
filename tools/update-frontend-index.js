#!/usr/bin/env node
/*
 * Update problems/frontend/index.json to use minimal schema entries { id, title }.
 * - Reads each category's problems. For string entries ("html-css-01"), it loads the
 *   corresponding problems/frontend/<id>.json to extract the title and converts to { id, title }.
 * - Object entries with { id, title } are left as-is.
 * - Creates a timestamped backup of the original index.json before writing.
 */

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const indexPath = path.join(ROOT, 'problems', 'frontend', 'index.json');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function safeWriteJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

function fileExists(filePath) {
  try { fs.accessSync(filePath, fs.constants.F_OK); return true; } catch { return false; }
}

(async function main() {
  try {
    if (!fileExists(indexPath)) {
      console.error(`index.json not found: ${indexPath}`);
      process.exit(1);
    }

    const indexJson = readJson(indexPath);
    if (!indexJson || !Array.isArray(indexJson.categories)) {
      console.error('Invalid index.json: missing categories array');
      process.exit(1);
    }

    const problemsDir = path.join(ROOT, 'problems', 'frontend');
    const stats = { total: 0, converted: 0, skippedAlreadyObject: 0, missingOrError: 0 };

    for (const category of indexJson.categories) {
      if (!Array.isArray(category.problems)) continue;
      const updated = [];
      for (const entry of category.problems) {
        stats.total += 1;
        if (entry && typeof entry === 'object') {
          // Already in object form. Ensure id exists and keep title if present.
          if (!entry.id || typeof entry.id !== 'string') {
            console.warn(`Warn: object entry without valid id in category '${category.id}'. Skipping as-is.`);
            updated.push(entry);
            stats.skippedAlreadyObject += 1;
            continue;
          }
          if (!entry.title || typeof entry.title !== 'string') {
            // Try to enrich title from problem JSON if missing
            const jsonPath = path.join(problemsDir, `${entry.id}.json`);
            if (fileExists(jsonPath)) {
              try {
                const data = readJson(jsonPath);
                if (data && typeof data.title === 'string' && data.title.trim()) {
                  updated.push({ id: entry.id, title: data.title });
                  stats.converted += 1;
                } else {
                  updated.push(entry);
                  stats.skippedAlreadyObject += 1;
                }
              } catch (e) {
                console.warn(`Warn: failed to read ${jsonPath}: ${e.message}`);
                updated.push(entry);
                stats.missingOrError += 1;
              }
            } else {
              updated.push(entry);
              stats.missingOrError += 1;
            }
          } else {
            updated.push({ id: entry.id, title: entry.title });
            stats.skippedAlreadyObject += 1;
          }
        } else if (typeof entry === 'string') {
          const id = entry;
          const jsonPath = path.join(problemsDir, `${id}.json`);
          if (fileExists(jsonPath)) {
            try {
              const data = readJson(jsonPath);
              if (data && typeof data.title === 'string' && data.title.trim()) {
                updated.push({ id, title: data.title });
                stats.converted += 1;
              } else {
                console.warn(`Warn: title missing in ${jsonPath}. Keeping string id.`);
                updated.push(id);
                stats.missingOrError += 1;
              }
            } catch (e) {
              console.warn(`Warn: failed to read ${jsonPath}: ${e.message}. Keeping string id.`);
              updated.push(id);
              stats.missingOrError += 1;
            }
          } else {
            console.warn(`Warn: problem JSON not found for id '${id}'. Keeping string id.`);
            updated.push(id);
            stats.missingOrError += 1;
          }
        } else {
          // Unknown type, keep as-is
          updated.push(entry);
          stats.missingOrError += 1;
        }
      }
      category.problems = updated;
    }

    // backup
    const ts = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(path.dirname(indexPath), `index.json.bak-${ts}`);
    fs.copyFileSync(indexPath, backupPath);

    // write
    safeWriteJson(indexPath, indexJson);

    console.log('Update complete. Stats:', stats);
    console.log(`Backup written to: ${backupPath}`);
    process.exit(0);
  } catch (err) {
    console.error('Unexpected error:', err);
    process.exit(1);
  }
})();
