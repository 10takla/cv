import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import fs from 'fs';
import http from 'http';
import sirv from 'sirv';
import puppeteer from 'puppeteer';
import os from 'os';

import {
  MODES,
  PAGES,
  LANGUAGES
} from './configs/pages'

const modes = Object.values(MODES);
const pages = Object.values(PAGES);
const languages = Object.values(LANGUAGES);

export const baseConfig = (mode) => ({
  server: { host: '0.0.0.0', port: 3000, allowedHosts: ["fervently-strong-muskellunge.cloudpub.ru"] },
  preview: { host: '0.0.0.0', port: 3000, allowedHosts: ["fervently-strong-muskellunge.cloudpub.ru"] },
  build: { target: 'es2019' },
  base: mode === 'deploy' ? '/cv/' : '/',
  resolve: {
    alias: [
      { find: 'shared', replacement: '/src/shared' },
      { find: 'resume', replacement: '/src/Resume' },
    ],
  },
  esbuild: { supported: { 'top-level-await': true } }
})

async function runInPool<T>(items: T[], limit: number, fn: (item: T) => Promise<void>) {
  const queue = [...items];
  const workers = Array(Math.min(limit, queue.length)).fill(null).map(async () => {
    while (queue.length > 0) {
      const item = queue.shift();
      if (item !== undefined) {
        await fn(item);
      }
    }
  });
  await Promise.all(workers);
}

export default defineConfig(({ mode }) => {
  const BASE = mode === 'deploy' ? '/cv' : '';

  const ROUTES = [
    ...modes,
    ...modes.flatMap(mode => pages.map(p => [mode, p].join("/"))),
    ...modes.flatMap(mode => (
      languages.map(lang => [mode, lang].join("/"))
    )),
    ...modes.flatMap(mode => (
      pages.flatMap(p => languages.map(lang => [mode, p, lang].join("/")))
    )),
    "/"
  ];

  const PORT = 4179;

  const prerender = () => ({
    name: 'prerender',
    apply: 'build',
    async closeBundle() {
      const dist = path.join(__dirname, 'dist');
      const server = http.createServer((req, res) => {
        if (req.url?.startsWith(BASE)) { req.url = req.url.slice(BASE.length) || '/'; sirv(dist, { single: true })(req, res); }
        else { res.statusCode = 404; res.end(); }
      });
      await new Promise<void>(r => server.listen(PORT, r));

      const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'], executablePath: process.env.PUPPETEER_EXECUTABLE_PATH });
      try {
        const concurrency = process.env.PRERENDER_CONCURRENCY
          ? parseInt(process.env.PRERENDER_CONCURRENCY, 10)
          : Math.min(os.cpus().length || 4, 8);

        await runInPool(ROUTES, concurrency, async (route) => {
          const page = await browser.newPage();
          page.on('pageerror', (err) => {
            console.error(`[Render Error] Route: ${route} -`, err.message);
          });
          try {
            const requestedPath = ('/' + [BASE, route].filter(Boolean).join('/')).replace(/\/+/g, '/');
            await page.goto(`http://localhost:${PORT}${requestedPath}`, { waitUntil: 'domcontentloaded' });
            // Wait for general page mount/readiness
            await page.waitForFunction(() => (window as any).__PRERENDER_READY__ === true, { timeout: 2000 }).catch(() => { });
            // If the page contains a diagram container, wait for the SVG to render
            await page.waitForFunction(() => {
              const diagrams = document.querySelectorAll('.mermaid-diagram');
              if (diagrams.length === 0) return true;
              return Array.from(diagrams).every(d => d.querySelector('svg') !== null);
            }, { timeout: 10000 }).catch(() => { });
            let html = await page.content();
            console.log(`Rendered: ${requestedPath}`);

            const currentUrl = new URL(page.url());
            const origUrl = new URL(requestedPath, `http://localhost:${PORT}`);

            const currentPath = currentUrl.pathname.replace(/\/$/, '');
            const origPath = origUrl.pathname.replace(/\/$/, '');

            const clean = route.replace(new RegExp('^' + BASE.replace(/\//g, '\\/')), '');
            const outDir = path.join(dist, clean.replace(/\/$/, ''));
            await fs.promises.mkdir(outDir, { recursive: true });

            if (currentPath !== origPath) {
              // A redirect occurred! Extract the redirect target path
              const redirectTarget = currentUrl.pathname + currentUrl.search + currentUrl.hash;
              const redirectHtml = `<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="refresh" content="0; url=${redirectTarget}">
    <title>Redirecting...</title>
</head>
<body>
</body>
</html>`;
              await fs.promises.writeFile(path.join(outDir, 'index.html'), redirectHtml, 'utf8');
            } else {
              // No redirect, write the rendered HTML content
              await fs.promises.writeFile(path.join(outDir, 'index.html'), html, 'utf8');
            }
          } finally {
            await page.close();
          }
        });
      } finally {
        await browser.close();
        server.close();
      }
    },
  });
  const redirectTrailingSlash = () => ({
    name: 'redirect-trailing-slash',
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        let urlPath = req.url?.split('?')[0] || '';
        if (BASE && urlPath.startsWith(BASE)) {
          urlPath = urlPath.slice(BASE.length);
        }
        const filePath = path.join(__dirname, 'dist', urlPath);
        try {
          if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory() && !urlPath.endsWith('/')) {
            res.statusCode = 301;
            res.setHeader('Location', (req.url || '') + '/');
            res.end();
            return;
          }
        } catch (e) {
          // ignore
        }
        next();
      });
    },
  });

  return {
    ...baseConfig(mode),
    appType: ['production', 'deploy'].includes(mode) ? 'mpa' : 'spa',
    plugins: [svgr(), react(), prerender(), redirectTrailingSlash()],
  };
});
