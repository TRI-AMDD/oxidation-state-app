import { render, screen } from '@testing-library/react';
import InputSection from './input-section';
import userEvent from '@testing-library/user-event';

test('chemical composition input renders', () => {
    render(<InputSection />);
    const chemCompositionInputElem = screen.getByTestId('input-section-chemical-composition');
    expect(chemCompositionInputElem).toBeVisible();
});

test('submit button is disabled when chemical composition input box is empty', () => {
    render(<InputSection />);

    const chemCompositionInputElem = screen.getByPlaceholderText<HTMLInputElement>('ex. LiMn2O4');
    const chemCompositionSubmitButtonElem = screen.getByTestId<HTMLButtonElement>('input-section-submit-button');

    expect(chemCompositionInputElem).toHaveValue('');
    expect(chemCompositionSubmitButtonElem).toBeDisabled();
});

test('submit button should eb enabled when chemcial composition input is filled', async () => {
    render(<InputSection />);

    const chemCompositionInputElem = screen.getByPlaceholderText<HTMLInputElement>('ex. LiMn2O4');
    const chemCompositionSubmitButtonElem = screen.getByTestId<HTMLButtonElement>('input-section-submit-button');

    await userEvent.type(chemCompositionInputElem, 'LiMn2O4');

    expect(chemCompositionInputElem).toHaveValue('LiMn2O4');
    expect(chemCompositionSubmitButtonElem).toBeEnabled();
});

test('onSubmit function should be called with string in checmical composition input whe submit button is clicked', async () => {
    const onClick = jest.fn();
    render(<InputSection submitClick={onClick} />);

    const chemCompositionInputElem = screen.getByPlaceholderText<HTMLInputElement>('ex. LiMn2O4');
    const chemCompositionSubmitButtonElem = screen.getByTestId<HTMLButtonElement>('input-section-submit-button');

    await userEvent.type(chemCompositionInputElem, 'LiMn2O4');

    await userEvent.click(chemCompositionSubmitButtonElem);

    expect(chemCompositionInputElem).toHaveValue('LiMn2O4');
    expect(onClick).toHaveBeenCalled();
    expect(onClick).toHaveBeenCalledWith('LiMn2O4');
});
