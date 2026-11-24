// The One-Line Cat Joke That Lands
// Writes one joke about cats, a single line under 200 characters,
// to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "My cat walked across my keyboard mid-call and typed gibberish. My boss replied, 'Best idea you've had all quarter.'";

// Gate self-check: UTF-8 text, 1-200 chars, single line, not whitespace-only,
// no control characters.
if (JOKE.length < 1 || JOKE.length > 200) {
  throw new Error(`entry length ${JOKE.length} out of range 1-200`);
}
if (JOKE.includes("\n") || JOKE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (!JOKE.trim()) {
  throw new Error("entry must not be whitespace-only");
}
if (/[\u0000-\u001F\u007F]/.test(JOKE)) {
  throw new Error("entry must not contain control characters");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, JOKE, "utf8");

// Read-back check: the file on disk must equal the gated line byte for byte.
const written = readFileSync(outPath, "utf8");
if (written !== JOKE) {
  throw new Error("read-back mismatch: entry.txt does not equal the gated line");
}
console.log(`entry ok: ${JOKE.length} chars`);
