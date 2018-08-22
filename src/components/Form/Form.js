import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import { send } from '../../utils'

import st from './styles.css'

/**
 * A form displays window with bug reporting functionality
 */
export default class Form extends React.Component {
    static defaultProps = {
        minimized: true,
        title: 'Напишите нам об ошибке!',
        nameLabel: 'Ваше Имя',
        messageLabel: 'Оставьте сообщение',
        sendMessage: 'Отправить',
        reSendMessage: 'Отправить еще раз',
        loadingMessage: 'Отправляем, ждите...',
        errorMessage: 'Упс, что-то пошло не так...'
    }

    static propTypes = {
        title: PropTypes.string,
        nameLabel: PropTypes.string,
        messageLabel: PropTypes.string,
        sendMessage: PropTypes.string,
        loadingMessage: PropTypes.string,
        errorMessage: PropTypes.string,

        /** if true window will be in compact mode */
        minimized: PropTypes.bool,
        /** url to report bug */
        url: PropTypes.string,
        /** hook for rewrite onSend behavior */
        onSend: PropTypes.func
    }

    state = {
        isSending: false,
        isError: false
    }

    constructor(props) {
        super(props)

        // overwrite state with specified props, skips undefined
        this.state = Object.assign(
            {},
            this.state,
            ['minimized'].reduce((props, name) => {
                typeof this.props[name] !== 'undefined' && (props[name] = this.props[name])
                return props
            }, {})
        )

        // creating refs for input elements
        this.nameInput = React.createRef()
        this.messageTextarea = React.createRef()
    }

    onToggle = () => {
        this.setState({
            minimized: this.state.minimized ? false : true
        })
    }
    onSend = () => {
        const { onSend, url } = this.props

        if (!url) return

        const name = this.nameInput.current.value
        const message = this.messageTextarea.current.value

        if (typeof onSend === 'function') return onSend({ name, message })

        // show loader
        this.setState({ isSending: true })

        // sending message to the server
        send(url, { name, message }).then((response) => {
            if (response.status === 200) {
                this.clearForm()
                this.setState()
            } else {
                throw new Error(response.statusText);
            }
        }).catch(() => {
            this.setState({
                isSending: false,
                isError: true
            })
        })
    }

    clearForm = () => {
        this.nameInput.current.value = ''
        this.messageTextarea.current.value = ''
    }
    render () {
        const { isSending, isError, minimized } = this.state
        const { title, nameLabel, messageLabel, sendMessage, reSendMessage, loadingMessage, errorMessage, className } = this.props

        return (
            <div className={cx(st.container, className, { [st.minimized]: minimized })}>
                <div className={cx(st.block, st.header)} onClick={minimized ? this.onToggle : undefined}>
                    {title}
                    <div className={st.dismiss} onClick={minimized ? undefined : this.onToggle}></div>
                </div>
                <div className={st.wrapper}>
                    <div className={cx(st.block, st.author)}>
                        <input className={st.field} type="text" placeholder={nameLabel} ref={this.nameInput}/>
                    </div>
                    <div className={cx(st.block, st.message)}>
                        <textarea className={st.field} type="text" placeholder={messageLabel} ref={this.messageTextarea}></textarea>
                    </div>
                    <div className={cx(st.block, st.actions)}>
                        <button className={st.button} onClick={this.onSend}>{sendMessage}</button>
                    </div>
                    {isSending && <div className={st.cover}>{loadingMessage}</div>}
                    {isError && <div className={st.cover}>
                            <div className={st.field}>{errorMessage}</div>
                            <button className={st.button} onClick={this.onSend}>{reSendMessage}</button>
                        </div>
                    }
                </div>
            </div>
        )
    }
}