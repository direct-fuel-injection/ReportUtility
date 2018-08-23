import defaults from './defaults'
import send from './utils/send'

import './css/styles.css'

/** Class representing report form */
class ReportUtility {
    constructor() {
        this.onSend = this.onSend.bind(this)
        this.onSendError = this.onSendError.bind(this)
        this.onSendSuccess = this.onSendSuccess.bind(this)
        this.onChangeAuthor = this.onChangeAuthor.bind(this)
        this.onChangeMessage = this.onChangeMessage.bind(this)
        this.onToggle = this.onToggle.bind(this)
    }

    /**
     * Render and bind events to report form (`el` must be specified through `config` method)
     * @return {ReportUtility} A ReportUtility instance(don't use it directly, only for tests)
     */
    init() {
        this.el = document.querySelector(this.state.el)
        if (!this.el) throw TypeError('`el` must be specified through `config` method')

        this.render()
        this.bindEvents()

        return this
    }

    /**
     * Clear destroy form
     */
    destroy() {
        this.unbindEvents()
        this.el.innerHTML = ''
    }

    /**
     * Set new state merges with defaults
     * @param  {object} options. see defaults section
     */
    config(options) {
        this.state = Object.assign({}, defaults, options)
    }

    /**
     * Events array, { el, evt, cb } (selector, eventName, callbackName)
     */
    events = [
        {
            el: '[data-name="send"]',
            evt: 'click',
            cb: 'onSend',
        },
        {
            el: '[data-name="author"]',
            evt: 'change',
            cb: 'onChangeAuthor',
        },
        {
            el: '[data-name="message"]',
            evt: 'change',
            cb: 'onChangeMessage',
        },
        {
            el: '[data-name="header"]',
            evt: 'click',
            cb: 'onToggle',
        },
    ]

    bindEvents() {
        this.events.forEach(({ el, evt, cb }) => {
            const domElements = this.el.querySelectorAll(el)
            if (domElements.length) {
                Array.prototype.map.call(domElements, (domElement) => {
                    domElement.addEventListener(evt, this[cb], false)
                })
            }
        })
    }

    unbindEvents() {
        this.events.forEach(({ el, evt, cb }) => {
            const domElements = this.el.querySelectorAll(el)
            if (domElements.length) {
                Array.prototype.map.call(domElements, (domElement) => {
                    domElement.removeEventListener(evt, this[cb], false)
                })
            }
        })
    }

    /**
     * Merges state with newState and updates report form
     * @param  {object} newState
     */
    setState(newState) {
        const prevState = this.state
        this.state = Object.assign({}, this.state, newState)
        this.update(prevState)
    }

    onToggle() {
        this.setState({
            minimized: !this.state.minimized,
        })
    }

    onChangeAuthor(e) {
        this.setState({
            name: e.currentTarget.value,
        })
    }

    onChangeMessage(e) {
        this.setState({
            message: e.currentTarget.value,
        })
    }

    /**
     * Handles send button click
     */
    onSend(e) {
        e.preventDefault()

        const { name, message, url } = this.state

        if (!url) return

        // show loader
        this.setState({ isSending: true })

        // sending message to the server
        send(url, { name, message }).then((response) => {
            if (response.status === 200) {
                this.onSendSuccess()
            } else {
                throw new Error(response.statusText)
            }
        }).catch(this.onSendError)
    }

    onSendSuccess() {
        this.setState({
            name: '',
            message: '',
            isSending: false,
        })
    }

    onSendError() {
        this.setState({
            isError: true,
            isSending: false,
        })
    }

    /**
     * Updates form according to state change
     * @param  {object} previous state object
     */
    update(prevState) {
        if (this.state.minimized) {
            this.el.querySelector('.rp-container').classList.add('rp-container_minimized')
        } else {
            this.el.querySelector('.rp-container').classList.remove('rp-container_minimized')
        }
        this.el.querySelector('.rp-container__cover_loading').style.display = this.state.isSending ? 'block' : 'none'
        this.el.querySelector('.rp-container__cover_error').style.display = this.state.isError ? 'block' : 'none'

        if (prevState.name !== this.state.name) {
            this.el.querySelector('.rp-container__author .rp-container__field').value = this.state.name
        }
        if (prevState.message !== this.state.message) {
            this.el.querySelector('.rp-container__message .rp-container__field').value = this.state.message
        }
    }

    render() {
        this.el.innerHTML = ''
        this.el.insertAdjacentHTML('afterbegin', this.state.template)

        const el = this.el.querySelector('.rp-container')
        if (el && this.state.minimized) el.classList.add('minimized')
    }
}

const reportUtility = new ReportUtility()

const init = reportUtility.init.bind(reportUtility)
const config = reportUtility.config.bind(reportUtility)
const destroy = reportUtility.destroy.bind(reportUtility)

export {
    init, config, send, destroy,
}
