import defaults from './defaults'
import send from './utils/send'

import * as styles from './css/styles.css'

class ReportUtility {
    constructor() {
        this.state = defaults
        
        this.onSend = this.onSend.bind(this)
        this.onChangeAuthor = this.onChangeAuthor.bind(this)
        this.onChangeMessage = this.onChangeMessage.bind(this)
        this.toggle = this.toggle.bind(this)
    }

    init() {
        this.el = document.querySelector(this.state.el)
        if (!this.el) throw TypeError("`el` must be specified through `config` method")

        this.render()
        this.bindEvents()

        return this
    }
    destroy() {
        this.unbindEvents()
        this.el.innerHTML = ''
    }
    config(options) {
        this.state = Object.assign({}, defaults, options)
    }
    bindEvents() {
        this.el.querySelector('.rp-container__actions .rp-container__button').addEventListener('click', this.onSend, false)
        this.el.querySelector('.rp-container__author .rp-container__field').addEventListener('change', this.onChangeAuthor, false)
        this.el.querySelector('.rp-container__message .rp-container__field').addEventListener('change', this.onChangeMessage, false)
        this.el.querySelector('.rp-container__header').addEventListener('click', this.toggle, false)
    }
    unbindEvents() {
        this.el.querySelector('.rp-container__actions .rp-container__button').removeEventListener('click', this.onSend, false)
        this.el.querySelector('.rp-container__author .rp-container__field').removeEventListener('change', this.onChangeAuthor, false)
        this.el.querySelector('.rp-container__message .rp-container__field').removeEventListener('change', this.onChangeMessage, false)
        this.el.querySelector('.rp-container__header').removeEventListener('click', this.toggle, false)
    }
    setState(newState) {
        this.state = Object.assign({}, this.state, newState)
    }

    toggle() {
        this.state.minimized = this.state.minimized ? false : true

        if (this.state.minimized) {
            this.el.querySelector('.rp-container').classList.add('rp-container_minimized')
        } else {
            this.el.querySelector('.rp-container').classList.remove('rp-container_minimized')
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
        this.el.querySelector('.rp-container__cover_error').style.display = 'block'
    }

    render() {
        this.el.innerHTML = ''
        this.el.insertAdjacentHTML('afterbegin', this.state.template)

        if (this.state.minimized)
            this.el.querySelector('.rp-container').classList.add('minimized')
    }
}

const reportUtility = new ReportUtility()

const init = reportUtility.init.bind(reportUtility)
const config = reportUtility.config.bind(reportUtility)
const destroy = reportUtility.destroy.bind(reportUtility)

export { init, config, send, destroy }