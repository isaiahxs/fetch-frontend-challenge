import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './index';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

jest.mock('../../LanguageContext', () => ({
    useLanguage: () => ({ currentLanguage: 'english', setCurrentLanguage: jest.fn() }),
}));

global.IntersectionObserver = class IntersectionObserver {
    constructor() { }
    disconnect() { }
    observe() { }
    unobserve() { }
};

describe('HomePage Component', () => {
    let navigate;

    beforeEach(() => {
        navigate = jest.fn();
        useNavigate.mockReturnValue(navigate);
    });

    it('shows LoginFormModal when not logged in', () => {
        localStorage.setItem('isLoggedIn', 'false');
        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );
        expect(screen.getByTestId('log-in-section')).toBeInTheDocument();
    });
});