import { test, expect } from '@playwright/test';

test('anchors preserve document, form input, focus, history and active navigation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const documentRequests: string[] = [];
  page.on('request', request => { if (request.isNavigationRequest() && request.frame() === page.mainFrame()) documentRequests.push(request.url()); });
  await page.getByLabel('Nombre *', { exact: true }).fill('Borrador local');
  const nav = page.getByRole('navigation', { name: 'Principal', exact: true });
  for (const label of ['Inicio', 'Soluciones', 'Clientes', 'Planes', 'Diagnóstico', 'Nosotros']) {
    const link = nav.getByRole('link', { name: label, exact: true });
    await link.click();
    await expect(link).toHaveAttribute('aria-current', 'location');
    const id = (await link.getAttribute('href'))!;
    await expect(page.locator(id)).toBeFocused();
    expect((await page.locator(id).boundingBox())!.y).toBeGreaterThan(70);
    await expect.poll(() => link.getAttribute('aria-current')).toBe('location');
  }
  await page.goBack();
  await expect(page).toHaveURL(/#diagnostico$/);
  await expect(page.getByLabel('Nombre *', { exact: true })).toHaveValue('Borrador local');
  expect(documentRequests).toEqual([]);
});

test('home keeps the active nav state at the anchor and removes the redundant location label', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/#clientes');
  const nav = page.getByRole('navigation', { name: 'Principal', exact: true });
  await expect(nav.getByRole('link', { name: 'Clientes', exact: true })).toHaveAttribute('aria-current', 'location');
  await expect(page.locator('.section-location')).toHaveCount(0);
  await page.locator('#diagnostico').scrollIntoViewIfNeeded();
  await expect(nav.getByRole('link', { name: 'Diagnóstico', exact: true })).toHaveAttribute('aria-current', 'location');
});

test('solution details and service interest work entirely inside home', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#soluciones');
  const service = page.locator('#automatizacion');
  await service.locator('summary').click();
  await expect(service).toHaveAttribute('open', '');
  await service.getByRole('link', { name: 'Agenda un diagnóstico' }).click();
  await expect(page).toHaveURL(/\/#contacto$/);
  await expect(page.getByLabel('Área de interés')).toHaveValue('automatizacion');
  await expect(page.getByRole('form', { name: 'Solicitud de diagnóstico' })).toBeVisible();
});

test('same-page assessment transfer is optional and reset clears stale answers', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#diagnostico');
  await page.getByRole('button', { name: 'Iniciar autodiagnóstico' }).click();
  for (let index = 0; index < 8; index++) {
    await page.getByRole('radio').nth(1).check();
    await page.getByRole('button', { name: index === 7 ? 'Ver orientación' : 'Siguiente' }).click();
  }
  await page.locator('.assessment-result').getByRole('link', { name: 'Agenda un diagnóstico' }).click();
  await expect(page).toHaveURL(/#contacto$/);
  await expect(page.getByLabel('Adjuntar mis respuestas')).toBeChecked();
  await page.getByLabel('Adjuntar mis respuestas').uncheck();
  await page.locator('.assessment-result').getByRole('button', { name: 'Volver a responder' }).click();
  await expect(page.getByLabel('Adjuntar mis respuestas')).toHaveCount(0);
});

test('deep links and content remain usable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3101/#soluciones');
  await expect(page.locator('h1')).toHaveCount(1);
  for (const id of ['inicio', 'soluciones', 'metodologia', 'diagnostico', 'clientes', 'planes', 'tecnologias', 'nosotros', 'contacto']) {
    await expect(page.locator(`#${id}`)).toBeVisible();
  }
  await page.locator('#datos summary').click();
  await expect(page.locator('#datos .solution-body')).toBeVisible();
  await expect(page.locator('.reveal-pending')).toHaveCount(0);
  await context.close();
});

test('motion is progressive, pointer effects stop with reduced motion, mobile remains natural', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await expect.poll(() => page.locator('.reveal-pending').count()).toBeGreaterThan(0);
  const diagram = page.locator('.operation-visual');
  await diagram.hover({ position: { x: 40, y: 40 } });
  await expect.poll(() => page.locator('#inicio').evaluate(el => Number.parseFloat(el.style.getPropertyValue('--hero-pointer-x')))).not.toBe(0);
  await page.locator('#planes').scrollIntoViewIfNeeded();
  await expect(page.locator('#planes .plan-card').first()).not.toHaveClass(/reveal-pending/);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.reveal-pending')).toHaveCount(0);
  expect(await page.locator('.client-logo-marquee .infinite-marquee-track').evaluate(element => getComputedStyle(element).animationName)).toBe('none');
  expect(await page.locator('.technology-marquee .infinite-marquee-track').evaluate(element => getComputedStyle(element).animationName)).toBe('none');
  await diagram.hover();
  expect(await diagram.locator('.flow-core').evaluate(el => getComputedStyle(el).transform)).toBe('none');
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('#metodologia .method-step-marker i')).toHaveCount(4);
  await expect(page.locator('.method-route-dot')).toHaveCSS('display', 'none');
  expect(await page.locator('.method-route-path-active').evaluate(el => getComputedStyle(el).strokeDashoffset)).toBe('0px');
  expect(await page.locator('.method-roadmap-body').evaluate(el => getComputedStyle(el).minHeight)).toBe('0px');
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollSnapType)).toBe('none');
});

test('client and technology marquees cover the viewport throughout the loop', async ({ page }) => {
  await page.goto('/');
  for (const width of [320, 390, 768, 1280, 1536]) {
    await page.setViewportSize({ width, height: 900 });
    await page.waitForTimeout(50);
    const samples = await page.evaluate(async () => {
      const fractions = [0, .25, .5, .75, .99];
      const selectors = ['.client-logo-marquee', '.technology-marquee'];
      const result: Array<{ selector: string; fraction: number; viewport: number; track: number; leftGap: number; rightGap: number }> = [];
      for (const selector of selectors) {
        const viewport = document.querySelector<HTMLElement>(selector);
        const track = viewport?.querySelector<HTMLElement>('.infinite-marquee-track');
        if (!viewport || !track) continue;
        const animation = track.getAnimations()[0];
        animation?.pause();
        const duration = Number.parseFloat(getComputedStyle(track).animationDuration) * 1000;
        for (const fraction of fractions) {
          if (animation) animation.currentTime = fraction * duration;
          await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
          const viewportRect = viewport.getBoundingClientRect();
          const trackRect = track.getBoundingClientRect();
          result.push({
            selector,
            fraction,
            viewport: viewportRect.width,
            track: trackRect.width,
            leftGap: Math.max(0, trackRect.left - viewportRect.left),
            rightGap: Math.max(0, viewportRect.right - trackRect.right),
          });
        }
      }
      return result;
    });
    expect(samples).toHaveLength(10);
    for (const sample of samples) {
      expect(sample.track).toBeGreaterThanOrEqual(sample.viewport);
      expect(sample.leftGap).toBeLessThanOrEqual(1);
      expect(sample.rightGap).toBeLessThanOrEqual(1);
    }
  }
});

test('method roadmap progresses without hiding its content', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const roadmap = page.locator('#metodologia');
  await roadmap.scrollIntoViewIfNeeded();
  await page.evaluate(() => {
    const section = document.querySelector<HTMLElement>('#metodologia');
    if (section) window.scrollTo({ top: section.offsetTop + section.offsetHeight * .75, behavior: 'auto' });
  });
  await expect.poll(async () => Number(await roadmap.evaluate(element => element.style.getPropertyValue('--method-progress')))).toBeGreaterThan(.5);
  await expect(page.locator('#metodologia .method-step[aria-current="step"]')).toHaveCount(1);
  await expect(page.locator('#metodologia .method-step[aria-current="step"] h3')).not.toHaveText('');
  await expect(page.locator('#metodologia .method-step')).toHaveCount(4);
  await expect(page.locator('#metodologia .method-step-marker > span')).toHaveText(['1', '2', '3', '4']);
  await expect(page.locator('#metodologia .method-step-marker i')).toHaveCount(4);
  await expect(page.locator('#metodologia .method-step[data-phase-state="active"]')).toHaveCount(1);
  await expect.poll(() => page.locator('#metodologia .method-step[data-phase-state="completed"]').count()).toBeGreaterThan(0);
  await expect(page.locator('#metodologia .method-step').nth(0)).toContainText('Descubrimos');
  await expect(page.locator('#metodologia .method-step').nth(1)).toContainText('alcance');
  await expect(page.locator('#metodologia .method-step').nth(1)).toContainText('entregables');
  await expect(page.locator('#metodologia .method-step').nth(2)).toContainText('validamos');
  await expect(page.locator('#metodologia .method-step').nth(3)).toContainText('adopción');
  await expect(page.getByRole('link', { name: 'Define el siguiente paso' })).toHaveAttribute('href', '#diagnostico');
});

test('motion system keeps ambient layers and shared navigation indicator', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await expect(page.locator('.continuity-rail')).toHaveCount(0);
  await expect(page.locator('.hero-backdrop')).toHaveCount(2);
  await expect(page.locator('.nav-active-indicator')).toHaveCount(1);
  await page.locator('#diagnostico').scrollIntoViewIfNeeded();
  await expect.poll(() => page.locator('.main-nav a[aria-current="location"]').getAttribute('href')).toBe('#diagnostico');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect.poll(() => page.locator('.hero-backdrop-halo').first().evaluate(element => getComputedStyle(element).animationName)).toBe('none');
});

test('secondary routes link back to the continuous home', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/casos/productos-deli-ricura');
  await page.getByRole('navigation', { name: 'Principal', exact: true }).getByRole('link', { name: 'Planes', exact: true }).click();
  await expect(page).toHaveURL(/\/#planes$/);
  await expect(page.locator('#planes')).toBeInViewport();
});
