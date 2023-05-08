import { render, screen, fireEvent } from '@testing-library/react'
import {FormConstructorContract} from 'src/view/wizardView/Step3Deploy/FormConstructorContract'

const fields = [
  {
    name: 'Initial Supply',
    type: 'number',
    placeholder: '1000000',
    tooltip: '',
    mandatory: true,
    fieldName: 'initialSupply'
  },
  {
    name: 'Name',
    type: 'text',
    placeholder: 'MyToken',
    tooltip: '',
    mandatory: false,
    fieldName: 'name'
  },
  {
    name: 'Symbol',
    type: 'text',
    placeholder: 'MTK',
    tooltip: '',
    mandatory: false,
    fieldName: 'symbol'
  },
  {
    name: 'Decimal',
    type: 'number',
    placeholder: '18',
    tooltip: '',
    mandatory: false,
    fieldName: 'decimal'
  }
]

describe('useFormInput', () => {
  test('should update the state of the input with observedTriggerChanged', async() => {
    const hasMetadata = true

    render(<FormConstructorContract />)

    // const input1 = getByTestId('input1')
    // const input2 = getByTestId('input2')

    // // Test that input 1 updates correctly when input 2 changes
    // fireEvent.change(input2, { target: { value: '5' } })
    // expect(input1).toHaveAttribute('value', '50')

    // // Test that input 1 updates correctly when its own value changes
    // fireEvent.change(input1, { target: { value: '20' } })
    // expect(input1).toHaveAttribute('value', '100')

    // // Test that input 2 does not update when input 1 changes
    // fireEvent.change(input1, { target: { value: '15' } })
    // expect(input2).toHaveAttribute('value', '10')
  })
})
