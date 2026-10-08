import { test, expect } from '@playwright/test';

const title = 'Capacitación en tecnología e IA para tu empresa.';

for (const path of ['/', '/planes']) {
  for (const width of [320, 390, 768, 1440]) {
    test(`training photograph and layout at ${width}px on ${path}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);
      const section = page.locator('#capacitacion');
      const photo = section.locator('.training-photo');
      await photo.scrollIntoViewIfNeeded();
      await expect(section.getByRole('heading', { name: title, level: path === '/' ? 3 : 2 })).toBeVisible();
      await expect.poll(() => photo.locator('img').evaluate(image => image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0)).toBe(true);
      await expect(photo.locator('img')).toHaveAttribute('alt', '');
      await expect(photo.locator('img')).toHaveAttribute('loading', 'lazy');
      await expect.poll(() => photo.locator('.training-photo-motion').evaluate(el => getComputedStyle(el).opacity)).toBe('1');
      expect(await photo.evaluate(el => getComputedStyle(el).maskImage)).not.toBe('none');
      const photoBox = (await photo.boundingBox())!;
      const copyBox = (await section.locator('.training-copy').boundingBox())!;
      expect(photoBox.width / photoBox.height).toBeCloseTo(.8, 2);
      expect(photoBox.width).toBeLessThanOrEqual(440);
      if (width <= 960) expect(photoBox.y).toBeGreaterThanOrEqual(copyBox.y + copyBox.height);
      else expect(photoBox.x).toBeGreaterThan(copyBox.x + copyBox.width);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
      expect(await section.evaluate(el => Boolean(document.querySelector('#proyectos')!.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
      await section.screenshot({ path: `test-results/training-${path === '/' ? 'home' : 'plans'}-${width}.png` });
    });
  }

  test(`training reveals once and contact link works on ${path}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto(path);
    const photo = page.locator('.training-photo');
    const motion = photo.locator('.training-photo-motion');
    await expect(motion).toHaveCSS('opacity', '0.75');
    await photo.scrollIntoViewIfNeeded();
    await expect(motion).toHaveCSS('opacity', '1');
    await expect.poll(() => motion.evaluate(el => new DOMMatrix(getComputedStyle(el).transform).a)).toBeCloseTo(1.03, 3);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await photo.scrollIntoViewIfNeeded();
    expect(await motion.evaluate(el => getComputedStyle(el).opacity)).toBe('1');
    expect(await motion.evaluate(el => el.getAnimations().some(animation => animation.playState === 'running'))).toBe(false);
    await page.locator('#capacitacion').getByRole('link', { name: 'Agenda un diagnóstico' }).click();
    await expect(page).toHaveURL(/\/#contacto$/);
    await expect(page.locator('#contacto')).toBeInViewport();
  });

  test(`training stays clear with reduced motion and without JavaScript on ${path}`, async ({ browser, baseURL, page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(path);
    const motion = page.locator('.training-photo-motion');
    await expect(motion).toHaveCSS('opacity', '1');
    await expect(motion).toHaveCSS('filter', 'none');
    await expect(motion).toHaveCSS('transform', 'none');
    await expect(motion).toHaveCSS('animation-name', 'none');
    // Changing the preference while a photograph is waiting must also cancel it.
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.reload();
    await expect(motion).toHaveCSS('opacity', '0.75');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(motion).toHaveCSS('opacity', '1');
    await expect(motion).toHaveCSS('transform', 'none');

    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    try {
      const staticPage = await context.newPage();
      await staticPage.goto(`${baseURL}${path}`);
      const section = staticPage.locator('#capacitacion');
      await section.locator('.training-photo').scrollIntoViewIfNeeded();
      await expect.poll(() => section.locator('img').evaluate(image => image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0)).toBe(true);
      await expect(section.locator('.training-photo-motion')).toHaveCSS('opacity', '1');
      await expect(section.locator('.training-photo-motion')).toHaveCSS('filter', 'none');
      await expect(section.locator('.training-photo-motion')).toHaveCSS('transform', 'none');
      await section.getByRole('link', { name: 'Agenda un diagnóstico' }).click();
      await expect(staticPage).toHaveURL(/\/#contacto$/);
      await expect(staticPage.locator('#contacto')).toBeInViewport();
    } finally {
      await context.close();
    }
  });
}
