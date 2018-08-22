/**
 * sends POST to url with { message, name } in JSON.
 * @param {url} url 
 * @param {object} options 
 */
export default function send(url, options={}) {
    const { message, name } = options

    return fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            name,
            message
        })
    })
}