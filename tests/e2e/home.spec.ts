import { test, expect } from "@playwright/test";

test("home shows all four branches and links work", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Empat toko/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Citra Buah/i }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /Sentra Sembako/i }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /Fatur Frozen Food/i }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /Sumber Tani Makmur/i }).first()).toBeVisible();
});

test("branch page has contact actions", async ({ page }) => {
  await page.goto("/citra-buah");
  await expect(page.getByRole("heading", { name: /Citra Buah/i }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /WhatsApp/i }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /Rute/i }).first()).toBeVisible();
});
