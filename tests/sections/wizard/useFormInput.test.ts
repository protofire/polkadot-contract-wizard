import { render, fireEvent } from '@testing-library/react'
import { useFormInput } from '@/hooks'

describe('useFormInput', () => {
  test('should update the state of the input with observedTriggerChanged', () => {
    const observedTriggerChanged = {
      observedValue: '5',
      onChange: (value: string, observedValue: string) =>
        String(Number(value) * Number(observedValue)),
    }

    const { getByTestId } = render(
      <>
        <input
          data-testid="input1"
          {...useFormInput('10', observedTriggerChanged)}
        />
        <input data-testid="input2" {...useFormInput('10')} />
      </>
    )

    const input1 = getByTestId('input1')
    const input2 = getByTestId('input2')

    // Test that input 1 updates correctly when input 2 changes
    fireEvent.change(input2, { target: { value: '5' } })
    expect(input1).toHaveAttribute('value', '50')

    // Test that input 1 updates correctly when its own value changes
    fireEvent.change(input1, { target: { value: '20' } })
    expect(input1).toHaveAttribute('value', '100')

    // Test that input 2 does not update when input 1 changes
    fireEvent.change(input1, { target: { value: '15' } })
    expect(input2).toHaveAttribute('value', '10')
  })
})