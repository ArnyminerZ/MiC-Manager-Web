/**
 * Provides utility functions for making http requests.
 * Note: takes the remote server url from the `mic-manager` meta tag.
 * @since 20221213
 * @file requests.mjs
 */

import {base} from './remote.mjs';

/**
 * Makes a GET request to the given endpoint.
 * @author Arnau Mora
 * @since 20221213
 * @param {string} endpoint The url to make the request to. Relative to the installation. Do not include the version
 * prefix. Must start with `/`.
 * @returns {Object}
 */
export const httpGet = endpoint => {
    const xml = new XMLHttpRequest();
    xml.open('GET', base() + endpoint, false);
    xml.send();
    const json = JSON.parse(xml.responseText);
    if (json.success === true)
        return json.data;
    throw new Error('Invalid response: ' + xml.responseText);
};
