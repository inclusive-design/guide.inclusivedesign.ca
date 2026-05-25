
import process from 'node:process';
import fluidPlugin, { __ } from 'eleventy-plugin-fluid';
import eleventyNavigationPlugin from '@11ty/eleventy-navigation';
import wrap from './src/_shortcodes/wrap.js';
import siteConfig from './src/_data/config.json' with { type: 'json' };
import findTranslationKeyFilter from './src/_filters/find-translation-key-filter.js';

/**
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig An instance of Eleventy's UserConfig class.
 * @returns {object} The configuration object.
 */
export default function eleventy(eleventyConfig) {
	eleventyConfig.setUseGitIgnore(false);

	// Plugins
	eleventyConfig.addPlugin(eleventyNavigationPlugin);
	eleventyConfig.addPlugin(fluidPlugin, {
		defaultLanguage: 'en',
		supportedLanguages: {
			en: {
				slug: 'en',
				uioSlug: 'en_CA',
				dir: 'ltr',
				name: 'English',
			},
			fr: {
				slug: 'fr',
				name: 'Français',
				dir: 'ltr',
				uioSlug: 'fr',
			},
		},
	});

	// Filters
	eleventyConfig.addFilter('findTranslationKey', findTranslationKeyFilter);

	// Shortcodes
	eleventyConfig.addPairedShortcode('unmarkedList', (content) =>
		wrap(content, 'list-articles'));
	eleventyConfig.addShortcode('svg_sprite', (sprite) => `<svg class="idg-${sprite}" aria-hidden="true"><use xlink:href="/assets/images/sprites.svg#${sprite}"></use></svg>`);

	// Passthrough copy
	eleventyConfig.addPassthroughCopy({ 'src/admin/config.yml': 'admin/config.yml' });
	eleventyConfig.addPassthroughCopy({ 'src/_redirects': '_redirects' });
	eleventyConfig.addPassthroughCopy({ 'src/assets/images': 'assets/images' });
	eleventyConfig.addPassthroughCopy({ 'src/assets/fonts': 'assets/fonts' });

	// Custom collections
	for (const lang of ['en', 'fr']) {
		eleventyConfig.addCollection(`Activities_${lang}`, (collection) => collection.getFilteredByGlob(`./src/documents/activities/${lang}/*.md`));
		eleventyConfig.addCollection(`Insights_${lang}`, (collection) => collection.getFilteredByGlob(`./src/documents/insights/${lang}/*.md`));
		eleventyConfig.addCollection(`Practices_${lang}`, (collection) => collection.getFilteredByGlob(`./src/documents/practices/${lang}/*.md`));
		eleventyConfig.addCollection(`Tools_${lang}`, (collection) => collection.getFilteredByGlob(`./src/documents/tools/${lang}/*.md`));
	}

	eleventyConfig.on('beforeBuild', () => {
		if (!siteConfig.languages[siteConfig.defaultLanguage]) {
			process.exitCode = 1;
			throw new Error(`The default language, ${siteConfig.defaultLanguage}, configured in src/_data/config.json is not one of your site's supported languages.`);
		}
	});

	return {
		dir: {
			input: 'src',
			output: '_site',
		},
		passthroughFileCopy: true,
		markdownTemplateEngine: 'njk',
	};
}
