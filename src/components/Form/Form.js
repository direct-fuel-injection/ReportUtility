import React from 'react'

import { container, titleContainer, authorContainer, messageContainer, actionsContainer, sendButton } from './styles.css'

export default class Form extends React.Component {
    render () {
        return (
            <div className={container}>
                <div className={titleContainer}>Напишите нам об ошибке</div>
                <div className={authorContainer}>
                    <input type="text" placeholder="Ваше Имя" />
                </div>
                <div className={messageContainer}>
                    <textarea type="text" placeholder="Оставьте сообщение"></textarea>
                </div>
                <div className={actionsContainer}>
                    <button className={sendButton}>Отправить</button>
                </div>
            </div>
        )
    }
}