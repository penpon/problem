#!/usr/bin/env node
/*
  Migrate frontend problem JSONs to 3-split expected files with __INCLUDE__ refs.
  Targets IDs starting with:
    - html-css-
    - js-basic-
    - js-advanced-
    - bootstrap-

  For each target JSON under problems/frontend/*.json:
    - Ensure directory problems/frontend/expected/<id>/ exists
    - For keys html/css/js:
        - Read files.<key>.expected (string, may be empty)
        - Write to files.<ext>.expected
        - Replace JSON expected with __INCLUDE__: problems/frontend/expected/<id>/files.<ext>.expected
    - Leave templates untouched

  Options:
    --dry-run : do not write changes, only print a summary
*/

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const FRONTEND_DIR = path.join(ROOT, 'problems', 'frontend');
const EXPECTED_ROOT = path.join(FRONTEND_DIR, 'expected');
const TARGET_PREFIXES = ['html-css-', 'js-basic-', 'js-advanced-', 'bootstrap-'];
const DRY_RUN = process.argv.includes('--dry-run');

function isTargetFile(name){
  if (!name.endsWith('.json')) return false;
  return TARGET_PREFIXES.some(p => name.startsWith(p));
}

function safeMkdir(dir){
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeFileIfChanged(fp, content){
  const exists = fs.existsSync(fp);
  if (exists){
    const cur = fs.readFileSync(fp, 'utf8');
    if (cur === content) return false;
  }
  if (!DRY_RUN){ fs.writeFileSync(fp, content, 'utf8'); }
  return true;
}

function migrateOne(jsonPath){
  const raw = fs.readFileSync(jsonPath, 'utf8');
  let data;
  try { data = JSON.parse(raw); } catch(e){
    return { id: path.basename(jsonPath), changed: false, error: 'JSON parse error' };
  }
  const id = data.id || path.basename(jsonPath, '.json');
  const expDir = path.join(EXPECTED_ROOT, id);

  // Prepare outputs
  const outputs = [];
  const keys = ['html', 'css', 'js'];
  for (const key of keys){
    const fileSpec = data.files && data.files[key];
    if (!fileSpec) continue;
    const ext = key; // html/css/js
    const expectedStr = typeof fileSpec.expected === 'string' ? fileSpec.expected : '';
    const outRel = path.posix.join('problems/frontend/expected', id, `files.${ext}.expected`);
    const outAbs = path.join(EXPECTED_ROOT, id, `files.${ext}.expected`);

    outputs.push({ key, ext, expectedStr, outRel, outAbs });
  }

  // Nothing to do
  if (outputs.length === 0){
    return { id, changed: false, skipped: true };
  }

  // Write files and update JSON
  let wroteFiles = 0;
  let updatedJson = false;
  if (!DRY_RUN){ safeMkdir(expDir); }

  for (const o of outputs){
    // Always create the expected file even if empty string
    const changed = writeFileIfChanged(o.outAbs, o.expectedStr || '');
    if (changed) wroteFiles++;

    // Update JSON expected
    if (data.files && data.files[o.key]){
      const prev = data.files[o.key].expected;
      const next = `__INCLUDE__: ${o.outRel}`;
      if (prev !== next){
        data.files[o.key].expected = next;
        updatedJson = true;
      }
    }
  }

  let wroteJson = false;
  if (updatedJson){
    const nextStr = JSON.stringify(data, null, 2) + '\n';
    if (!DRY_RUN){ fs.writeFileSync(jsonPath, nextStr, 'utf8'); }
    wroteJson = true;
  }

  return { id, changed: wroteFiles > 0 || wroteJson, wroteFiles, wroteJson };
}

function main(){
  const files = fs.readdirSync(FRONTEND_DIR).filter(isTargetFile);
  const results = [];
  for (const name of files){
    const fp = path.join(FRONTEND_DIR, name);
    const r = migrateOne(fp);
    results.push({ file: name, ...r });
  }

  const summary = {
    total: results.length,
    changed: results.filter(r=>r.changed).length,
    wroteFiles: results.reduce((s,r)=> s + (r.wroteFiles||0), 0),
    wroteJson: results.filter(r=>r.wroteJson).length,
  };

  console.log('[migrate-expected-includes] summary:', summary);
  for (const r of results){
    console.log('-', r.file, JSON.stringify(r));
  }

  if (DRY_RUN){
    console.log('DRY RUN: no files were changed');
  }
}

main();
