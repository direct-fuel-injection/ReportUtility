import React from 'react'
import { render } from 'react-dom'

import Form from '../components/Form'

export const init = (el, props) => {
    render(<Form {...props} />, el)
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