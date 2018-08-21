import React from 'react'
import ReactDom from 'react-dom'

import Form from '../components/Form'

/**
 * renders Report Utility window in specified `el`.
 * @param {DOM.Element} el
 * @param {object} props
 */
export const render = (el, props) => {
    ReactDom.render(<Form {...props} />, el)
}

/**
 * sends POST to url with { message, name } in JSON.
 * @param {url} url 
 * @param {object} options 
 */
export const send = (url, options={}) => {
    const { message, name } = options

    return fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            name,
            message
        })
    })
}