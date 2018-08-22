import React from 'react'

import * as rp from '../src/reportutility'

import defaults from '../src/defaults'

it("library should contain correct api methods", () => {
    expect(typeof rp.init).toBe('function')
    expect(typeof rp.send).toBe('function')
    expect(typeof rp.destroy).toBe('function')
    expect(typeof rp.config).toBe('function')
})

it("check defaults after init", () => {
    rp.config({ el: 'body' })
    const instance = rp.init()

    expect(typeof instance.state).toEqual('object')
    defaults.el = 'body'
    expect(instance.state).toEqual(defaults)
})

it('check destroy function', () => {
    rp.destroy()
    rp.init()
    expect(!!document.body.querySelector('.container')).toBe(true)
})

// it("click on sendButton should call onSend method", () => {
//     const wrapper = shallow(<Form url="http://localhost/"/>)
//     wrapper.instance().onSend = jest.fn()

//     wrapper.find('.actions .button').simulate('click')
//     expect(wrapper.instance().onSend).toBeCalled()
// })

// it("click on sendButton shouldn't call onSend method when url is not defined", () => {
//     const wrapper = shallow(<Form />)
//     wrapper.instance().onSend = jest.fn()

//     wrapper.find('.actions .button').simulate('click')
//     expect(wrapper.instance().onSend).not.toHaveBeenCalled()
// })
