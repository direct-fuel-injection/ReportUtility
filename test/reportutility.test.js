import React from 'react'

import * as rp from '../src/reportutility'

import defaults from '../src/defaults'

let instance

beforeEach(() => {
    rp.config({ el: 'body' })
    if (instance) {
        instance.destroy()
    }
    instance = rp.init()
})

it("library should contain correct api methods", () => {
    expect(typeof rp.init).toBe('function')
    expect(typeof rp.send).toBe('function')
    expect(typeof rp.destroy).toBe('function')
    expect(typeof rp.config).toBe('function')
})

it("check defaults after init", () => {
    expect(typeof instance.state).toEqual('object')
    defaults.el = 'body'
    expect(instance.state).toEqual(defaults)
})

it('check destroy function', () => {
    rp.destroy()
    instance = rp.init()
    
    expect(!!instance.el.querySelector('.rp-container')).toBe(true)
    expect(instance.el.querySelectorAll('.rp-container').length).toBe(1)
})

it('setState should correctly merge objects with defaults', () => {
    const prevState = instance.state
    instance.setState({ visible: true })
    prevState.visible = true

    expect(instance.state).toEqual(prevState)
})

it('check setState should call properly', () => {
    let update = instance.update
    instance.update = jest.fn()
    instance.setState({ visible: true })

    expect(instance.update).toBeCalled()
    instance.update = update
})

it('check setState should correctly update DOM', () => {
    instance.setState({ name: 'test', message: 'test' })
    expect(instance.el.querySelector('.rp-container__author .rp-container__field').value).toBe('test')
    expect(instance.el.querySelector('.rp-container__message .rp-container__field').value).toBe('test')
})

it('check onSend method calls', () => {
    instance.el.querySelector('.rp-container__actions .rp-container__button').click()

    expect(fetch.mock.calls[0][0]).toEqual(instance.state.url)
    expect(fetch.mock.calls.length).toBe(1)
})

it('checking events works correctly', () => {
    const minimized = instance.state.minimized

    instance.unbindEvents()
    instance.onSend = jest.fn()

    const toggleSpy = jest.spyOn(instance, 'onToggle')
    const authorSpy = jest.spyOn(instance, 'onChangeAuthor')
    const messageSpy = jest.spyOn(instance, 'onChangeMessage')

    instance.bindEvents()

    instance.el.querySelector('.rp-container__actions .rp-container__button').click()
    instance.el.querySelector('.rp-container .rp-container__header').click()

    const evt = document.createEvent("HTMLEvents");
    evt.initEvent("change", false, true);

    instance.el.querySelector('.rp-container__author .rp-container__field').value = 'test'
    instance.el.querySelector('.rp-container__author .rp-container__field').dispatchEvent(evt)

    instance.el.querySelector('.rp-container__message .rp-container__field').value = 'test'
    instance.el.querySelector('.rp-container__message .rp-container__field').dispatchEvent(evt)

    expect(instance.onSend).toBeCalled()
    expect(toggleSpy).toBeCalled()
    expect(instance.state.minimized).toBe(!minimized)
    expect(!!instance.el.querySelector('.rp-container_minimized')).toBe(!minimized)
    expect(authorSpy).toBeCalled()
    expect(instance.state.name).toBe('test')
    expect(messageSpy).toBeCalled()
    expect(instance.state.message).toBe('test')
})

