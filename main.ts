// The Funniest Out-of-Office — make.fun entry.
//
// Writes a single line of out-of-office auto-reply to
// $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).
//
// The line is a real out-of-office reply a person would set and send:
// the sender is away until Monday, and the joke turns on an unexpected
// guardian of the inbox — the cat — who has already answered three
// people with "mrrp" and stands by it. The surprise is that the cat is
// not a metaphor: it is already replying, and it is not apologising.
// Every word earns its place; nothing here could be cut without
// losing the laugh. The voice is the sender's own, not a template:
// nobody else's auto-reply has a cat on inbox duty.
//
// Deterministic: no input, no randomness, no network, no clock.
// The program enforces the competition gate itself before writing:
// UTF-8 text, 1 to 140 characters, a single line, not only whitespace,
// no leading or trailing whitespace.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I'm out until Monday. My inbox is guarded by my cat, who has already replied to three of you with 'mrrp' and stands by it.";

const MAX_CHARS = 140;

function main(): void {
  const chars = [...ENTRY];
  if (chars.length < 1 || chars.length > MAX_CHARS) {
    throw new Error(
      `entry must be 1 to ${MAX_CHARS} characters, got ${chars.length}`,
    );
  }
  if (ENTRY.trim() !== ENTRY) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
}

main();
