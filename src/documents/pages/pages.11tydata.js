import { __, generatePermalink } from 'eleventy-plugin-fluid';

export default {
	layout: 'layouts/page',
	eleventyComputed: {
		category(data) {
			return data?.eleventyNavigation?.key;
		},
		/* Set the translationKey, used for populating the language switcher, to the file slug. */
		translationKey(data) {
			if (data.page.fileSlug === data.lang) {
				return 'index';
			}

			return data.page.fileSlug;
		},
		permalink(data) {
			data.slug = data.page.fileSlug;
			return generatePermalink(data, 'pages');
		},
		eleventyNavigation(data) {
			/* To have the navigation localized, use the page's title as the navigation title. */
			if (data.eleventyNavigation) {
				return {
					title: data.title,
					lang: data.lang,
					...data.eleventyNavigation,
				};
			}

			return false;
		},
	},
};
