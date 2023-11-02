import { render, screen } from '@testing-library/react';
import HowToUse from './HowToUse';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const tutorialText =
    /a more detailed explanation of this tool is provided in the , and additional information is provided in the \./i;

test('tutorial text is initially hidden', () => {
    render(<HowToUse />, { wrapper: BrowserRouter });

    const tutorialElem = screen.getByText(tutorialText);

    expect(tutorialElem).not.toBeVisible();
});

test('tutorial text is visible after expand click', async () => {
    const user = userEvent.setup();
    render(<HowToUse />, { wrapper: BrowserRouter });

    const tutorialElem = screen.getByText(tutorialText);

    expect(tutorialElem).not.toBeVisible();

    await user.click(screen.getByTestId('ExpandMoreIcon'));

    expect(tutorialElem).toBeVisible();
});
