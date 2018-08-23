import 'whatwg-fetch'
import Promise from 'promise-polyfill'

if (!window.Promise) {
    window.Promise = Promise
}
/**
 * sends POST to url with { message, name } in JSON.
 * @param {url} url
 * @param {object} options
 * @returns {Promise} A Promise object
 */
export default function send(url, options = {}) {
    const { message, name } = options

    return fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            name,
            message,
        }),
    })
}
