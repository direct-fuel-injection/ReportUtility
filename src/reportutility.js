import defaults from './defaults'
import send from './utils/send'

import * as styles from './css/styles.css'

class ReportUtility {
    constructor(el, options) {
        this.state = defaults
    }

    init() {
        this.el = document.querySelector(this.state.el)
        if (!this.el) throw TypeError("`el` must be specified")

        this.render()
        this.bindEvents()
    }
    config(options) {
        this.state = Object.assign({}, defaults, options)
    }
    bindEvents() {
        this.el.querySelector('.block.actions .button').addEventListener('click', this.onSend.bind(this), false)
        this.el.querySelector('.block.author .field').addEventListener('change', this.onChangeAuthor.bind(this), false)
        this.el.querySelector('.block.message .field').addEventListener('change', this.onChangeMessage.bind(this), false)
        this.el.querySelector('.block.header').addEventListener('click', this.toggle.bind(this), false)
    }
    setState(newState) {
        this.state = Object.assign({}, this.state, newState)
    }

    toggle() {
        this.state.minimized = this.state.minimized ? false : true

        if (this.state.minimized) {
            this.el.querySelector('.container').classList.add('minimized')
        } else {
            this.el.querySelector('.container').classList.remove('minimized')
        }
    }

    onChangeAuthor(e) {
        this.setState({
            name: e.currentTarget.value
        })
    }
    onChangeMessage(e) {
        this.setState({
            message: e.currentTarget.value
        })
    }
    onSend(e) {
        const { name, message, url } = this.state
    
        if (!url) return
    
        // show loader
        this.setState({ isSending: true })
    
        // sending message to the server
        send(url, { name, message }).then((response) => {
            if (response.status === 200) {
                // this.clearForm()
                // this.setState()
            } else {
                throw new Error(response.statusText);
            }
        }).catch(() => {
            this.onError()
        })
    }
    onError() {
        this.el.querySelector('.cover.error').style.display = 'block'
    }

    render() {
        this.el.innerHTML = ''
        this.el.insertAdjacentHTML('afterbegin', this.state.template)

        if (this.state.minimized)
            this.el.querySelector('.container').classList.add('minimized')
        if (!this.state.isSending)
            this.el.querySelector('.cover.loading').style.display = 'none'
        if (!this.state.isError)
            this.el.querySelector('.cover.error').style.display = 'none'
    }
}

const reportUtility = new ReportUtility()
const init = reportUtility.init.bind(reportUtility)
const config = reportUtility.config.bind(reportUtility)

export { init, config, send }