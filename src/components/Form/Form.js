import React from 'react'
import PropTypes from 'prop-types'

import { send } from '../../utils'

import { container, titleContainer, wrapper, loading, authorContainer, messageContainer, actionsContainer, sendButton, closeButton } from './styles.css'

/**
 * A form displays window with bug reporting functionality
 */
export default class Form extends React.Component {
    static defaultProps = {
        title: 'Напишите нам об ошибке!',
        nameLabel: 'Ваше Имя',
        messageLabel: 'Оставьте сообщение',
        sendMessage: 'Отправить',
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

        /** url to report bug */
        url: PropTypes.string,

        /** */
        onSend: PropTypes.func
    }

    state = {
        isSending: false,
        isError: false
    }

    constructor(props) {
        super(props)

        // creating refs for input elements
        this.nameInput = React.createRef()
        this.messageTextarea = React.createRef()
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
            console.log(response);
            
            this.setState({ isSending: false })
        }).catch(() => {
            this.setState({
                isSending: false,
                isError: true
            })
        })
    }

    render () {
        const { isSending, isError } = this.state

        const { title, nameLabel, messageLabel, sendMessage, loadingMessage, errorMessage } = this.props

        return (
            <div className={container}>
                <div className={titleContainer}>
                    {title}
                    <div className={closeButton}></div>
                </div>
                <div className={wrapper}>
                    <div className={authorContainer}>
                        <input type="text" placeholder={nameLabel} ref={this.nameInput}/>
                    </div>
                    <div className={messageContainer}>
                        <textarea type="text" placeholder={messageLabel} ref={this.messageTextarea}></textarea>
                    </div>
                    <div className={actionsContainer}>
                        <button className={sendButton} onClick={this.onSend}>{sendMessage}</button>
                    </div>
                    {isSending && <div className={loading}>{loadingMessage}</div>}
                    {isError && <div className={loading}>{errorMessage}</div>}
                </div>
            </div>
        )
    }
}