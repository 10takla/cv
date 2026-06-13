import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import fs from 'fs';
import http from 'http';
import sirv from 'sirv';
import puppeteer from 'puppeteer';
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
  build: { target: 'es2019' },
  base: mode === 'deploy' ? '/cv/' : '',
  resolve: {
    alias: [
      { find: 'shared', replacement: '/src/shared' },
      { find: 'resume', replacement: '/src/Resume' },
    ],
  },
  esbuild: { supported: { 'top-level-await': true } }
})

export default defineConfig(({ mode }) => {
  const BASE = mode === 'deploy' ? '/cv' : '';

  const ROUTES = [
    ...modes.flatMap(mode => (
      languages.map(lang => [mode, lang].join("/"))
    )),
    ...modes.flatMap(mode => (
      pages.flatMap(p => languages.map(lang => [mode, p, lang].join("/")))
    )),
    "/"
  ];
  console.log(ROUTES)
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

      const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox'], executablePath: process.env.PUPPETEER_EXECUTABLE_PATH });
      try {
        for (const route of ROUTES) {
          const page = await browser.newPage();
          await page.goto(`http://localhost:${PORT}${BASE}/${route}`, { waitUntil: 'domcontentloaded' });
          await Promise.race([
            page.evaluate(() => new Promise(r => setTimeout(r, 1000))),
            page.waitForFunction(() => (window as any).__PRERENDER_READY__ === true, { timeout: 800 }).catch(() => { }),
          ]);
          let html = await page.content();

          // html = html.replace(
          //   /<script\b[^>]*>([\s\S]*?)<\/script>/gi,
          //   (full) => /type=["']application\/ld\+json["']/i.test(full) ? full : ''
          // );
          // html = html.replace(
          //   /<link\s+[^>]*rel=["'](?:modulepreload|preload)["'][^>]*as=["']script["'][^>]*>/gi,
          //   ''
          // );
          // html = html.replace(/<script\b[^>]*vite[-]client[^>]*><\/script>/gi, '');

          const clean = route.replace(new RegExp('^' + BASE.replace(/\//g, '\\/')), '');
          const outDir = path.join(dist, clean.replace(/\/$/, ''));
          await fs.promises.mkdir(outDir, { recursive: true });
          await fs.promises.writeFile(path.join(outDir, 'index.html'), html, 'utf8');

          await page.close();
        }
      } finally {
        await browser.close();
        server.close();
      }
    },
  });

  return {
    ...baseConfig(mode),
    plugins: [svgr(), react(), prerender()],
  };
});
