import defaults from './defaults'
import send from './utils/send'

import * as styles from './css/styles.css'

/** Class representing report form */
class ReportUtility {
    constructor() {
        this.state = defaults
        
        this.onSend = this.onSend.bind(this)
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
        if (!this.el) throw TypeError("`el` must be specified through `config` method")

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

    bindEvents() {
        this.el.querySelector('.rp-container__actions .rp-container__button').addEventListener('click', this.onSend, false)
        this.el.querySelector('.rp-container__author .rp-container__field').addEventListener('change', this.onChangeAuthor, false)
        this.el.querySelector('.rp-container__message .rp-container__field').addEventListener('change', this.onChangeMessage, false)
        this.el.querySelector('.rp-container__header').addEventListener('click', this.onToggle, false)
    }
    unbindEvents() {
        this.el.querySelector('.rp-container__actions .rp-container__button').removeEventListener('click', this.onSend, false)
        this.el.querySelector('.rp-container__author .rp-container__field').removeEventListener('change', this.onChangeAuthor, false)
        this.el.querySelector('.rp-container__message .rp-container__field').removeEventListener('change', this.onChangeMessage, false)
        this.el.querySelector('.rp-container__header').removeEventListener('click', this.onToggle, false)
    }

    /**
     * Merges state with newState and updates report form
     * @param  {object} newState
     */
    setState(newState) {
        this.state = Object.assign({}, this.state, newState)
        this.update()
    }

    onToggle() {
        this.setState({
            minimized: !this.state.minimized
        })
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
    
    /**
     * Handles send button click, 
     * @param  {Event} e from DOM
     */
    onSend(e) {
        const { name, message, url } = this.state
    
        if (!url) return
    
        // show loader
        this.setState({ isSending: true })
    
        // sending message to the server
        send(url, { name, message }).then((response) => {
            if (response.status === 200) {
                this.setState({ isSending: false })
            } else {
                throw new Error(response.statusText);
            }
        }).catch(() => {
            this.setState({
                isError: true,
                isSending: false
            })
        })
    }

    update() {
        if (this.state.minimized) {
            this.el.querySelector('.rp-container').classList.add('rp-container_minimized')
        } else {
            this.el.querySelector('.rp-container').classList.remove('rp-container_minimized')
        }
        this.el.querySelector('.rp-container__cover_loading').style.display = this.state.isSending ? 'block' : 'none'
        this.el.querySelector('.rp-container__cover_error').style.display = this.state.isError ? 'block' : 'none'
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