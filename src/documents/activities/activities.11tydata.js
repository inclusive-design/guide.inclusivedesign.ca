import { __, generatePermalink } from 'eleventy-plugin-fluid';

export default {
	category: 'Activities',
	layout: 'layouts/page',
	eleventyComputed: {
		/* Set the translationKey, used for populating the language switcher, to the file slug. */
		translationKey: (data) => data.page.fileSlug,
		/* Build a permalink using the title, language key, and translated collection type slug. */
		permalink(data) {
			return generatePermalink(data, 'activities', __('activities-slug', {}, data));
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
