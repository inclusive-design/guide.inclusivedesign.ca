import { defineConfig } from 'eslint/config';
import eslintConfigInclusiveDesign from '@inclusive-design/eslint-config';

export default defineConfig([
	{
		extends: [eslintConfigInclusiveDesign],
		rules: {
			camelcase: ['error', { properties: 'never' }],
		},
	},
	{
		ignores: ['_site/**', 'README.md'],
	},
]);
