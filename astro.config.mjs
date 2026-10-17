// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// https://docs.astro.build/en/guides/integrations-guide/cloudflare/
export default defineConfig({
  // Páginas: HTML estático por defecto. Las que necesiten servidor (formularios) llevan `prerender = false`.
  // passthrough: no usamos Cloudflare Images, las imágenes se sirven tal cual.
  adapter: cloudflare({ imageService: 'passthrough' }),
  // Rechaza formularios (POST) enviados desde otras webs.
  security: { checkOrigin: true },
});
