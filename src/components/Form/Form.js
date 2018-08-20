import React from 'react'

import { send } from '../../utils'

import { container, titleContainer, wrapper, loading, authorContainer, messageContainer, actionsContainer, sendButton } from './styles.css'

export default class Form extends React.Component {
    state = {
        isSending: false
    }

    constructor(props) {
        super(props)

        // creatinf refs for input elements
        this.nameInput = React.createRef()
        this.messageTextarea = React.createRef()
    }

    onSend = () => {
        const name = this.nameInput.current.value
        const message = this.messageTextarea.current.value

        this.setState({ isSending: true })
        send({ name, message }).then(() => {
            // this.setState({ isSending: false })
        })
    }

    render () {
        const { isSending } = this.state

        return (
            <div className={container}>
                <div className={titleContainer}>Напишите нам об ошибке!</div>
                <div className={wrapper}>
                    <div className={authorContainer}>
                        <input type="text" placeholder="Ваше Имя" ref={this.nameInput}/>
                    </div>
                    <div className={messageContainer}>
                        <textarea type="text" placeholder="Оставьте сообщение" ref={this.messageTextarea}></textarea>
                    </div>
                    <div className={actionsContainer}>
                        <button className={sendButton} onClick={this.onSend}>Отправить</button>
                    </div>
                    {isSending && <div className={loading}>Отправляем, ждите...</div>}
                </div>
            </div>
        )
    }
}