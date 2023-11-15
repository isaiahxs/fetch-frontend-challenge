import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter } from 'react-router-dom';
import LoginFormModal from './index';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('LoginFormModal Component', () => {
    it('renders without crashing', () => {
        render(
            <MemoryRouter>
                <LoginFormModal />
            </MemoryRouter>
        );
        expect(screen.getByText('Before you can adopt a new furry friend, you must sign in.')).toBeInTheDocument();
    });

    it('checks form elements', () => {
        render(
            <MemoryRouter>
                <LoginFormModal />
            </MemoryRouter>
        );
        expect(screen.getByLabelText('Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Log In' })).toBeInTheDocument();
    });

    // it('handles form submission', async () => {
    //     const mock = new MockAdapter(axios);
    //     const navigate = jest.fn();
    //     useNavigate.mockReturnValue(navigate);

    //     mock.onPost('https://frontend-take-home-service.fetch.com/auth/login').reply(200, {
    //         success: true,
    //     });

    //     render(
    //         <MemoryRouter>
    //             <LoginFormModal />
    //         </MemoryRouter>
    //     );

    //     const nameInput = screen.getByLabelText('Name');
    //     const emailInput = screen.getByLabelText('Email');
    //     const submitButton = screen.getByRole('button', { name: 'Log In' });

    //     userEvent.type(nameInput, 'Isaiah');
    //     userEvent.type(emailInput, 'isaiah@example.com');
    //     userEvent.click(submitButton);

    //     await waitFor(() => {
    //         expect(navigate).toHaveBeenCalledWith('/filter');
    //     });
    // });
});