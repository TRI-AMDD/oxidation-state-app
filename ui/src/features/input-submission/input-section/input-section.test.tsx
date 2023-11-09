import { render, screen, renderHook } from '@testing-library/react';
import InputSection from './input-section';
import userEvent from '@testing-library/user-event';
import useInputs from '../input-hooks/use-inputs';

test('chemical composition input renders', () => {
    const {
        result: {
            current: { handleFileUpload, handleSubmitClick, handleEnterClick }
        }
    } = renderHook(useInputs);

    render(
        <InputSection
            handleFileUpload={handleFileUpload}
            handleSubmitClick={handleSubmitClick}
            handleEnterClick={handleEnterClick}
        />
    );
    const chemCompositionInputElem = screen.getByTestId('input-section-chemical-composition');
    expect(chemCompositionInputElem).toBeVisible();
});

test('submit button is disabled when chemical composition input box is empty', () => {
    const {
        result: {
            current: { handleFileUpload, handleSubmitClick, handleEnterClick }
        }
    } = renderHook(useInputs);

    render(
        <InputSection
            handleFileUpload={handleFileUpload}
            handleSubmitClick={handleSubmitClick}
            handleEnterClick={handleEnterClick}
        />
    );

    const chemCompositionInputElem = screen.getByPlaceholderText<HTMLInputElement>('ex. LiMn2O4');
    const chemCompositionSubmitButtonElem = screen.getByTestId<HTMLButtonElement>('input-section-submit-button');

    expect(chemCompositionInputElem).toHaveValue('');
    expect(chemCompositionSubmitButtonElem).toBeDisabled();
});

test('submit button should be enabled when chemcial composition input is filled', async () => {
    const {
        result: {
            current: { handleFileUpload, handleSubmitClick, handleEnterClick }
        }
    } = renderHook(useInputs);

    render(
        <InputSection
            handleFileUpload={handleFileUpload}
            handleSubmitClick={handleSubmitClick}
            handleEnterClick={handleEnterClick}
        />
    );

    const chemCompositionInputElem = screen.getByPlaceholderText<HTMLInputElement>('ex. LiMn2O4');

    const chemCompositionSubmitButtonElem = screen.getByTestId<HTMLButtonElement>('input-section-submit-button');

    await userEvent.type(chemCompositionInputElem, 'LiMn2O4');

    expect(chemCompositionInputElem).toHaveValue('LiMn2O4');
    expect(chemCompositionSubmitButtonElem).toBeEnabled();
});

test('onSubmit function should be called with string in checmical composition input whe submit button is clicked', async () => {
    const {
        result: {
            current: { handleFileUpload, handleEnterClick }
        }
    } = renderHook(useInputs);

    const handleSubmitClick = jest.fn();
    render(
        <InputSection
            handleFileUpload={handleFileUpload}
            handleSubmitClick={handleSubmitClick}
            handleEnterClick={handleEnterClick}
        />
    );

    const chemCompositionInputElem = screen.getByPlaceholderText<HTMLInputElement>('ex. LiMn2O4');
    const chemCompositionSubmitButtonElem = screen.getByTestId<HTMLButtonElement>('input-section-submit-button');

    await userEvent.type(chemCompositionInputElem, 'LiMn2O4');

    await userEvent.click(chemCompositionSubmitButtonElem);

    expect(chemCompositionInputElem).toHaveValue('LiMn2O4');
    expect(handleSubmitClick).toHaveBeenCalled();
    expect(handleSubmitClick).toHaveBeenCalledWith('LiMn2O4');
});
