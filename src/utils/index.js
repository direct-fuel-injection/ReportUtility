import React from 'react'
import { render } from 'react-dom'

import Form from '../components/Form'

export const Init = (el, props) => {
    render(<Form {...props} />, el)
}