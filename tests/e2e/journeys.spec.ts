import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('home CTA → diagnostic form → accepted receipt (delivery boundary mocked)', async ({ page }) => {
  await page.route('**/api/diagnostico', async route => {
    const payload = route.request().postDataJSON();
    expect(payload.consent).toBe(true);
    expect(payload.email).toBe('test@example.com');
    await route.fulfill({ status: 200, json: { message: 'Recibimos tu solicitud. El equipo de IARMO se comunicará contigo.' } });
  });
  await page.goto('/');
  await page.locator('.hero').getByRole('link', { name: 'Agenda un diagnóstico' }).click();
  await expect(page).toHaveURL(/diagnostico/);
  await page.getByRole('button', { name: 'Solicitar diagnóstico' }).click();
  await expect(page.getByRole('textbox', { name: /^Nombre/ })).toBeFocused();
  await page.getByRole('textbox', { name: /^Nombre/ }).fill('Persona de prueba');
  await page.getByRole('textbox', { name: /^Empresa/ }).fill('Empresa de prueba');
  await page.getByRole('textbox', { name: /^Correo empresarial/ }).fill('test@example.com');
  await page.getByLabel('Colaboradores aproximados').selectOption('5–15');
  await page.getByLabel('¿Qué te gustaría resolver?').fill('Necesitamos conectar pedidos e inventario.');
  await page.getByLabel('Autorizo el tratamiento').check();
  await page.getByRole('button', { name: 'Solicitar diagnóstico' }).click();
  await expect(page.getByRole('heading', { name: 'Gracias por contarnos tu reto.' })).toBeVisible();
});

test('assessment all questions, back navigation, result and optional transfer', async ({ page }) => {
  await page.goto('/#autodiagnostico');
  await page.getByRole('button', { name: 'Iniciar autodiagnóstico' }).click();
  await expect(page.getByRole('button', { name: 'Siguiente' })).toBeDisabled();
  for (let index = 0; index < 8; index++) {
    await page.getByRole('radio').nth(1).check();
    if (index === 1) {
      await page.getByRole('button', { name: 'Anterior' }).click();
      await expect(page.getByRole('radio').nth(1)).toBeChecked();
      await page.getByRole('button', { name: 'Siguiente' }).click();
    }
    await page.getByRole('button', { name: index === 7 ? 'Ver orientación' : 'Siguiente' }).click();
  }
  await expect(page.getByRole('heading', { name: 'El siguiente paso puede ser conectar lo que ya tienes.' })).toBeVisible();
  await page.locator('.assessment-result').getByRole('link', { name: 'Solicitar diagnóstico' }).click();
  await expect(page.getByLabel('Adjuntar mis respuestas')).toBeChecked();
  await page.getByLabel('Adjuntar mis respuestas').uncheck();
  await expect(page.getByLabel('Adjuntar mis respuestas')).not.toBeChecked();
});

test('network failure retains input and allows retry', async ({ page }) => {
  await page.route('**/api/diagnostico', route => route.abort('failed'));
  await page.goto('/diagnostico');
  await page.getByLabel('Nombre *', { exact: true }).fill('Persona de prueba');
  await page.getByLabel('Empresa *', { exact: true }).fill('Empresa de prueba');
  await page.getByLabel('Correo empresarial *', { exact: true }).fill('test@example.com');
  await page.getByLabel('Colaboradores aproximados').selectOption('5–15');
  await page.getByLabel('¿Qué te gustaría resolver?').fill('Necesitamos conectar pedidos e inventario.');
  await page.getByLabel('Autorizo el tratamiento').check();
  await page.getByRole('button', { name: 'Solicitar diagnóstico' }).click();
  await expect(page.getByRole('form', { name: 'Solicitud de diagnóstico' }).getByRole('alert')).toContainText('Revisa tu conexión');
  await expect(page.getByLabel('Nombre *', { exact: true })).toHaveValue('Persona de prueba');
  await expect(page.getByRole('button', { name: 'Solicitar diagnóstico' })).toBeEnabled();
});

test('all routes and local links resolve; genuine 404 and security headers', async ({ page, request }) => {
  const paths = ['/', '/soluciones', '/planes', '/casos', '/casos/productos-deli-ricura', '/casos/grupo-empresarial-suga', '/nosotros', '/diagnostico', '/privacy', '/terms'];
  const links = new Set<string>();
  for (const path of paths) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    expect(await page.title()).toContain('iarmo');
    for (const href of await page.locator('a[href^="/"]').evaluateAll(elements => elements.map(element => element.getAttribute('href')!))) links.add(href.split('#')[0]);
  }
  for (const path of links) expect((await request.get(path)).status(), path).toBe(200);
  const missing = await page.goto('/no-existe');
  expect(missing?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: 'Tomemos otra ruta.' })).toBeVisible();
  expect(missing?.headers()['x-content-type-options']).toBe('nosniff');
  expect(missing?.headers()['content-security-policy']).toContain("frame-ancestors 'none'");
  expect((await request.get('/casos/no-existe')).status()).toBe(404);
  const casePage = await request.get('/casos/productos-deli-ricura');
  expect(await casePage.text()).toContain('noindex');
});

for (const width of [360, 390, 768, 1280, 1536]) {
  test(`responsive home and form at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['/', '/diagnostico', '/planes', '/soluciones']) {
      await page.goto(path);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), path).toBe(true);
    }
    await page.goto('/');
    await page.screenshot({ path: `test-results/home-${width}.png`, fullPage: true });
  });
}

for (const path of ['/', '/soluciones', '/planes', '/casos', '/casos/productos-deli-ricura', '/nosotros', '/diagnostico', '/privacy', '/terms', '/no-existe']) {
  test(`axe WCAG 2.2 AA ${path}`, async ({ page }) => {
    await page.goto(path);
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(result.violations).toEqual([]);
  });
}

test('keyboard skip link, mobile navigation and reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Saltar al contenido' })).toBeFocused();
  await page.getByRole('button', { name: 'Menú' }).click();
  await expect(page.getByRole('navigation', { name: 'Principal' })).toBeVisible();
  await page.getByRole('navigation', { name: 'Principal' }).getByRole('link', { name: 'Soluciones', exact: true }).focus();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Menú' })).toBeFocused();
  await expect(page.getByRole('navigation', { name: 'Principal' })).toBeHidden();
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
});

test('real endpoint enforces origin, consent and honest SMTP failure', async ({ request }) => {
  const data = { name: 'Persona de prueba', company: 'Empresa de prueba', email: 'test@example.com', size: '5–15', challenge: 'Necesitamos conectar pedidos e inventario.', consent: true };
  expect((await request.post('/api/diagnostico', { data, headers: { origin: 'https://otro.example' } })).status()).toBe(403);
  expect((await request.post('/api/diagnostico', { data: { ...data, consent: false }, headers: { origin: 'http://127.0.0.1:3000' } })).status()).toBe(422);
  const failed = await request.post('/api/diagnostico', { data, headers: { origin: 'http://127.0.0.1:3000' } });
  expect(failed.status()).toBe(502);
  expect((await failed.json()).message).toContain('No pudimos confirmar');
});

test('assessment question and result are accessible', async ({ page }) => {
  await page.goto('/#autodiagnostico');
  await page.getByRole('button', { name: 'Iniciar autodiagnóstico' }).click();
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations).toEqual([]);
  for (let index = 0; index < 8; index++) {
    await page.getByRole('radio').nth(2).check();
    await page.getByRole('button', { name: index === 7 ? 'Ver orientación' : 'Siguiente' }).click();
  }
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations).toEqual([]);
});
