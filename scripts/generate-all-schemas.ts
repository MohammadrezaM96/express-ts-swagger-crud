import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const sourceFile = path.resolve(__dirname, '../src/types/User.ts');
const outputDir = path.resolve(__dirname, '../schema');

const sourceCode = fs.readFileSync(sourceFile, 'utf-8');

const dtoNames = Array.from(
  sourceCode.matchAll(/export\s+(?:interface|type)\s+(\w+Dto)\b/g),
).map(match => match[1]);

if (dtoNames.length === 0) {
  console.warn('⚠ No DTO types found ending with "Dto".');
  process.exit(0);
}

console.log(`🔍 Found DTOs: ${dtoNames.join(', ')}`);

const toKebabCase = (str: string): string =>
  str
    .replace(/Dto$/, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

for (const typeName of dtoNames) {
  const kebabName = toKebabCase(typeName);
  const outputPath = path.join(outputDir, `${kebabName}.schema.json`);
  const command = `ts-json-schema-generator --path "${sourceFile}" --type "${typeName}" --out "${outputPath}"`;
  console.log(`📦 Generating schema for: ${typeName} → ${kebabName}.schema.json`);
  execSync(command, { stdio: 'inherit' });

  const raw = fs.readFileSync(outputPath, 'utf-8');
  const original = JSON.parse(raw);
  if (original.$ref && original.definitions) {
    const refKey = original.$ref.replace('#/definitions/', '');
    const finalSchema = {
      $schema: original.$schema,
      ...original.definitions[refKey],
      title: refKey,
    };
    fs.writeFileSync(outputPath, JSON.stringify(finalSchema, null, 2));
    console.log(`✔ Flattened: ${outputPath}`);
  }
}
