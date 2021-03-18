import React from 'react'
import { mount, shallow } from 'enzyme';
import { create } from 'react-test-renderer';
import { CategoryCard } from '../../pages/index'

describe('<CategoryCard />', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<CategoryCard />, {})
    expect(asFragment()).toMatchSnapshot()
  })

  it('clicking button triggers alert', () => {
    const { getByText } = render(<CategoryCard />, {})
    window.alert = jest.fn()
    fireEvent.click(getByText('Test Button'))
    expect(window.alert).toHaveBeenCalledWith('With typescript and Jest')
  })
})
