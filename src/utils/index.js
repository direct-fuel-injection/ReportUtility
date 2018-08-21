import React from 'react'
import ReactDom from 'react-dom'

import Form from '../components/Form'

export const render = (el, props) => {
    ReactDom.render(<Form {...props} />, el)
}

export const send = (options={}) => {
    const { message, name, host } = options

    return fetch(host, {
        method: 'POST',
        body: JSON.stringify({
            name,
            message
        })
    })
}