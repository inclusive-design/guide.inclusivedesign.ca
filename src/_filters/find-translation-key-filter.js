/**
 * @param {string} translationKey - The current page's translationKey.
 * @param {object} collection - The collection in which to search (must contain the current page).
 * @param {string} desiredLang - The language of the translated page.
 * @returns {string|false} The URL of the treanslated page, or false if no translation is found.
 */
export default function findTranslationKeyFilter(translationKey, collection = [], desiredLang) {
	let translationUrl = false;

	for (const element of collection) {
		if (element.data.translationKey === translationKey && element.data.lang === desiredLang) {
			translationUrl = element.url;
		}
	}

	return translationUrl;
}
