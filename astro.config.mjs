// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://dichthuatvisa247.vn', // TODO: đổi thành domain thật khi có
  output: 'static',
  integrations: [
    sitemap({
      // /lp/* và /agency/ là noindex — loại khỏi sitemap.xml (Mục 3, Mục 8)
      filter: (page) => !page.includes('/lp/') && !page.includes('/agency/'),
    }),
  ],
});
