import React from 'react'

import ReportUtility from '../../../src'

export default class App extends React.Component {
    render () {
        return (
            <ReportUtility
                url="http://localhost:3000"
                minimized={false}
            />
        )
    }
}