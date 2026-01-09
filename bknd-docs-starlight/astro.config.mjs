// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { sidebar } from './src/sidebar';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Bknd Documentation',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			sidebar,
		}),
	],
});
