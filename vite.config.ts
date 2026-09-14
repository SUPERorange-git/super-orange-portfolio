import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { cpSync, mkdirSync } from 'node:fs';
export default defineConfig({
  publicDir: false,
  plugins: [react(), {
    name: 'shoot-assets',
    configureServer(server) {
      server.middlewares.use('/shoot', (req, res, next) => {
        import('node:fs').then(({createReadStream,statSync}) => {
          const path = decodeURIComponent((req.url || '/').split('?')[0]);
          if (!/^\/[a-zA-Z0-9.-]+$/.test(path)) return next();
          const file = 'public/shoot' + path;
          try {
            const stat = statSync(file);
            const types: Record<string,string> = {mp4:'video/mp4',jpg:'image/jpeg',png:'image/png',svg:'image/svg+xml',css:'text/css'};
            res.setHeader('Content-Type',types[path.split('.').pop() || ''] || 'application/octet-stream');
            res.setHeader('Accept-Ranges','bytes');
            const match = req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
            if (match) {
              const start=Number(match[1]),end=match[2]?Math.min(Number(match[2]),stat.size-1):stat.size-1;
              if(start>=stat.size||end<start){res.statusCode=416;res.end();return;}
              res.statusCode=206;res.setHeader('Content-Range',`bytes ${start}-${end}/${stat.size}`);res.setHeader('Content-Length',end-start+1);createReadStream(file,{start,end}).pipe(res);
            } else {res.setHeader('Content-Length',stat.size);createReadStream(file).pipe(res);}
          } catch {next();}
        });
      });
    },
    closeBundle(){mkdirSync('dist/shoot',{recursive:true});cpSync('public/shoot','dist/shoot',{recursive:true});}
  }]
});
