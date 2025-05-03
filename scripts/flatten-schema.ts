import fs from 'fs';
import path from 'path';

const inputPath = path.resolve(__dirname, '../schema/user.schema.json');
const raw = fs.readFileSync(inputPath, 'utf8');
const original = JSON.parse(raw);

if (original.$ref && original.definitions) {
    const refKey = original.$ref.replace('#/definitions/', '');
    const finalSchema = {
        $schema: original.$schema,
        ...original.definitions[refKey],
        title: refKey,
    };

    fs.writeFileSync(inputPath, JSON.stringify(finalSchema, null, 2));
    console.log(`✔ Flattened schema written to: ${inputPath}`);
} else {
    console.warn('⚠ Nothing to flatten.');
}