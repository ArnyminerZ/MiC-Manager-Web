/**
 * Loads all the branding data from the server.
 * Note: requires the `mic-manager` meta tag.
 * @since 20221213
 * @file branding.mjs
 */

import {httpGet} from './requests.mjs';
import {base} from "./remote.mjs";

/**
 * @typedef {Object} BrandingAssets
 * @property {String} icon
 * @property {String} favicon
 */
/**
 * @typedef {Object} BrandingResponse
 * @property {BrandingAssets} assets
 * @property {string} name
 */

const build = (tag, attrs) => {
    const meta = document.createElement(tag);
    for (const key in attrs)
        meta.setAttribute(key, attrs[key]);
    return meta;
};

window.addEventListener('load', () => {
    /** @type {BrandingResponse} */
    const {name, assets} = httpGet('/branding');
    const {favicon, banner} = assets;
    document.head.append(
        build('link', { rel: 'icon', type: 'image/png', href: base() + favicon })
    );
    document.title = name;

    for (let bannerElement of document.getElementsByClassName('mic-banner')) {
        bannerElement.setAttribute('alt', `${name} Banner`);
        bannerElement.setAttribute('src', base() + banner);
    }

    document.getElementById('container').classList.remove('d-none');
});
