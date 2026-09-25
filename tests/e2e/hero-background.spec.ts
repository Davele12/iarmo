import { test, expect } from '@playwright/test';

for (const width of [320, 390, 768, 1280, 1536]) {
  test(`hero artwork remains circular, clipped and reversible at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const hero = page.locator('#inicio');
    const ring = hero.locator('.hero-backdrop-ring').first();
    await expect(ring).toBeVisible();
    const rect = (await ring.boundingBox())!;
    expect(Math.abs(rect.width - rect.height)).toBeLessThan(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    await expect(hero.locator('.hero-backdrop')).toHaveAttribute('aria-hidden', 'true');
    expect(await hero.locator('.hero-backdrop').evaluate(el => getComputedStyle(el).pointerEvents)).toBe('none');
    if (width <= 600) await expect(hero.locator('.hero-backdrop-ring-inner')).toBeHidden();
    const scrollToFraction = async (fraction: number) => {
      await hero.evaluate((element, value) => {
        const header = document.querySelector('.site-header')!.getBoundingClientRect().height;
        window.scrollTo({ top: value * (element.getBoundingClientRect().height + header), behavior: 'instant' });
      }, fraction);
      await expect.poll(() => hero.evaluate(el => Number(el.style.getPropertyValue('--hero-progress')))).toBeCloseTo(fraction, 2);
    };
    await scrollToFraction(.5);
    const middle = await hero.locator('.hero-backdrop-halo').evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m42);
    expect(middle).toBeCloseTo((width <= 600 ? 16 : width <= 960 ? 24 : 48) / 2, 0);
    await scrollToFraction(1);
    await scrollToFraction(0);
    expect(await hero.locator('.hero-backdrop-halo').evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m42)).toBe(0);
    // No idle animation loop is attached to the artwork.
    expect(await hero.locator('.hero-backdrop').evaluate(el => el.getAnimations({ subtree: true }).length)).toBe(0);
  });
}

test('pointer response resets, reduced motion changes live and anchors retain focus', async ({ page }) => {
  await page.setViewportSize({ width: 1536, height: 900 });
  await page.goto('/');
  const hero = page.locator('#inicio');
  await hero.hover({ position: { x: 1450, y: 180 } });
  const pointerX = () => hero.evaluate(el => Number.parseFloat(el.style.getPropertyValue('--hero-pointer-x')));
  await expect.poll(pointerX).toBeGreaterThan(0);
  expect(Math.abs(await pointerX())).toBeLessThanOrEqual(8);
  await page.mouse.move(20, 20);
  await expect.poll(pointerX).toBe(0);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await hero.hover({ position: { x: 1450, y: 180 } });
  await expect.poll(pointerX).toBe(0);
  for (const selector of ['.hero-backdrop-pointer', '.hero-backdrop-halo', '.hero-backdrop-rings']) {
    expect(await hero.locator(selector).evaluate(el => getComputedStyle(el).transform)).toBe('none');
  }
  const link = page.getByRole('navigation', { name: 'Principal', exact: true }).getByRole('link', { name: 'Soluciones', exact: true });
  await link.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#soluciones')).toBeFocused();
  await expect(link).toHaveAttribute('aria-current', 'location');
  await expect(page.locator('.nav-active-indicator')).toHaveCSS('opacity', '1');
  const header = (await page.locator('.site-header').boundingBox())!;
  expect((await page.locator('#soluciones').boundingBox())!.y).toBeGreaterThanOrEqual(header.height);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await hero.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await hero.hover({ position: { x: 1450, y: 180 } });
  await expect.poll(pointerX).toBeGreaterThan(0);
});

test('touch and no-JavaScript retain complete artwork and working native links', async ({ browser, baseURL }) => {
  const touch = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await touch.newPage();
  await page.goto(baseURL!);
  await page.locator('#inicio').dispatchEvent('pointermove', { pointerType: 'touch', clientX: 300, clientY: 400 });
  await expect.poll(() => page.locator('#inicio').evaluate(el => el.style.getPropertyValue('--hero-pointer-x'))).toBe('0px');
  await touch.close();
  const staticContext = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 900 } });
  const staticPage = await staticContext.newPage();
  await staticPage.goto(baseURL!);
  await expect(staticPage.locator('#inicio .hero-backdrop-ring').first()).toBeVisible();
  await expect(staticPage.locator('#inicio h1')).toBeVisible();
  await staticPage.locator('#inicio .hero-actions a').first().click();
  await expect(staticPage).toHaveURL(/#contacto$/);
  await expect(staticPage.locator('#contacto')).toBeInViewport();
  await staticContext.close();
});
