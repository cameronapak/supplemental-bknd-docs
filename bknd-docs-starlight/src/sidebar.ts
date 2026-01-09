import type { StarlightUserConfig } from '@astrojs/starlight/types';

/**
 * Starlight sidebar configuration for Bknd documentation.
 * This sidebar structure mirrors the navigation from the original Mintlify docs.json.
 * Note: This is a base configuration with placeholder structure. As content is migrated
 * to the corresponding directories, the sidebar items will automatically work.
 */

export const sidebar: StarlightUserConfig['sidebar'] = [
	{
		label: 'Getting Started',
		items: [
			{ slug: 'index' },
		],
	},
];
