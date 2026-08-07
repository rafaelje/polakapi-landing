import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';

const htmlPath = new URL('../dist/index.html', import.meta.url);
const headersPath = new URL('../dist/_headers', import.meta.url);
const html = await readFile(htmlPath, 'utf8');
const headers = await readFile(headersPath, 'utf8');
const scriptHashes = new Set();
const scriptPattern = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;

for (const match of html.matchAll(scriptPattern)) {
  const [, attributes, source] = match;
  if (/\bsrc\s*=/.test(attributes)) {
    continue;
  }

  const digest = createHash('sha256').update(source).digest('base64');
  scriptHashes.add(`'sha256-${digest}'`);
}

if (scriptHashes.size === 0) {
  throw new Error('No inline scripts were found in the generated page');
}

const styleHashes = new Set();
const stylePattern = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;

for (const match of html.matchAll(stylePattern)) {
  const digest = createHash('sha256').update(match[1]).digest('base64');
  styleHashes.add(`'sha256-${digest}'`);
}

const scriptDirective = "script-src 'self'";
const styleDirective = "style-src 'self'";
if (!headers.includes(scriptDirective) || !headers.includes(styleDirective)) {
  throw new Error('A required CSP directive is missing from dist/_headers');
}

const scriptPolicy = `${scriptDirective} ${[...scriptHashes].join(' ')}`;
const stylePolicy = `${styleDirective} ${[...styleHashes].join(' ')}`;
await writeFile(
  headersPath,
  headers.replace(scriptDirective, scriptPolicy).replace(styleDirective, stylePolicy),
);
