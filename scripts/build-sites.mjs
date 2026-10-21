import { readFileSync, writeFileSync, mkdirSync, cpSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const sites = JSON.parse(readFileSync('sites.json', 'utf8'));
const output = resolve('dist');
mkdirSync(output, { recursive: true });
for (const site of sites) {
  if (!/^[a-z0-9-]+$/.test(site.slug)) throw new Error('Invalid site slug');
  const result = spawnSync(process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm', ['exec', 'vite', 'build', '--base=./', '--outDir', resolve(output, site.slug), '--emptyOutDir'], { cwd: resolve(site.directory), stdio: 'inherit', shell: process.platform === 'win32' });
  if (result.status !== 0) process.exit(result.status ?? 1);
  const entry = resolve(output, site.slug, 'index.html');
  writeFileSync(entry, readFileSync(entry, 'utf8').replace('</body>', '<a href="../" style="position:fixed;bottom:16px;left:16px;z-index:9999;background:#f4f0e8;color:#161410;padding:10px 16px;border-radius:24px;font:14px sans-serif;text-decoration:none;box-shadow:0 3px 16px #0003" aria-label="返回超级橘橘总站">返回总站</a></body>'));
}
cpSync('hub', output, { recursive: true });
writeFileSync(resolve(output, 'sites.json'), JSON.stringify(sites));
writeFileSync(resolve(output, '.nojekyll'), '');
