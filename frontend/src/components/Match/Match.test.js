import React from 'react';
import { MemoryRouter, Route, Router, Routes } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Match from './index';

describe('Match Component', () => {
    it('renders without crashing', () => {
        render(
            <MemoryRouter initialEntries={['/match']}>
                <Routes>
                    <Route path="/match" component={Match} />
                </Routes>
            </MemoryRouter>
        );
    });

    it('displays the correct match details', () => {
        render(
            <MemoryRouter initialEntries={[{ pathname: '/match', state: { matchDetails: { name: 'Fido', age: '2', breed: 'Lab', zip_code: '12345', img: 'img_url_here' } } }]}>
                <Routes>
                    <Route path="/match" element={<Match />} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByText('Congratulations, your match is Fido!')).toBeInTheDocument();
        expect(screen.getByText('Age: 2')).toBeInTheDocument();
        expect(screen.getByText('Breed: Lab')).toBeInTheDocument();
        expect(screen.getByText('Zip Code: 12345')).toBeInTheDocument();
    });

    it('displays fallback UI when match details are not provided', () => {
        render(
            <MemoryRouter initialEntries={['/match']}>
                <Routes>
                    <Route path="/match" element={<Match />} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByText('To find your companion, please sign in, then search for pets first.')).toBeInTheDocument();
    });

    it('button clicks work as expected', () => {
        const { getByText } = render(
            <MemoryRouter initialEntries={['/match']}>
                <Routes>
                    <Route path="/match" element={<Match />} />
                </Routes>
            </MemoryRouter>
        );
        fireEvent.click(getByText('Return Home'));
    });
});