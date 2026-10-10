import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { getTableName } from "drizzle-orm";
import { notes } from "@/db/schema";

test("the notes schema exports a gf_notes table", () => {
  assert.equal(getTableName(notes), "gf_notes");
});

test("the generated migration creates gf_notes", () => {
  const journal = JSON.parse(
    fs.readFileSync(path.join("drizzle", "meta", "_journal.json"), "utf8")
  ) as { entries: { tag: string }[] };
  const last = journal.entries[journal.entries.length - 1];
  const sql = fs.readFileSync(path.join("drizzle", `${last.tag}.sql`), "utf8");
  assert.match(sql, /gf_notes/);
});
