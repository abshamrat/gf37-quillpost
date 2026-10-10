import { test } from "node:test";
import assert from "node:assert/strict";
import { brand, brandCss } from "@/brand";
import { applicationName } from "@/app-config";
import tokens from "../brand/brand.json";

// The accepted brand sheet (version 1, 2026-10-10) answers must land in the
// four brand slots and nowhere else, and every consumer must read them from
// those slots.
test("the accepted brand sheet answers propagate to name, mark and colour", () => {
  assert.equal(tokens.product_name, "Quillpost");
  assert.equal(tokens.logo, null);
  assert.equal(tokens.primary_color, "#2a6f97");
  assert.equal(tokens.tone, "quiet, clear, short sentences");

  assert.equal(brand.productName, "Quillpost");
  assert.equal(brand.logo, null);
  assert.equal(brand.primaryColor, "#2a6f97");
  assert.equal(brand.tone, "quiet, clear, short sentences");

  // The header, page title, footer and mail sender all read this one name.
  assert.equal(applicationName, "Quillpost");
});

test("#2a6f97 derives the light and dark brand-primary shades", () => {
  // hexToHsl("#2a6f97") = 202 56% 38%; the dark palette lifts the same hue.
  const css = brandCss();
  assert.match(css, /--brand-primary:202 56% 38%/);
  assert.match(css, /\.dark\{[^}]*--brand-primary:202 56% 55%/);
});
