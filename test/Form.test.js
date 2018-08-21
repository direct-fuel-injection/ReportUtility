import React from 'react'
import { shallow } from 'enzyme'

import Form from '../src/components/Form'


it("renders correctly Right and defaults", () => {
    const wrapper = shallow(<Form />)

    // expect(wrapper).toMatchSnapshot()
    expect(wrapper.state().minimized).toEqual(true)
    expect(wrapper.props().url).toEqual(undefined)
})

it("onToggle method should set state.minimized correctly", () => {
    const wrapper = shallow(<Form minimized={false} />)

    expect(wrapper.state().minimized).toEqual(false)
    wrapper.instance().onToggle()
    expect(wrapper.state().minimized).toEqual(true)
    wrapper.instance().onToggle()
    expect(wrapper.state().minimized).toEqual(false)
})

// it("click on sendButton should call onSend method", () => {
//     Form.onSend = () => {}
//     const wrapper = shallow(<Form url="http://localhost/"/>)
//     wrapper.instance().onSend = jest.fn()

//     wrapper.find('button').simulate('click')
//     expect(wrapper.instance().onSend).toBeCalled()
// })

it("click on sendButton shouldn't call onSend method when url is not defined", () => {
    
    const wrapper = shallow(<Form />)
    wrapper.instance().onSend = jest.fn()

    wrapper.find('button').simulate('click')
    expect(wrapper.instance().onSend).not.toHaveBeenCalled()
})
