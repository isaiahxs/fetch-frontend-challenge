import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import Navigation from './index';

describe('Navigation Component', () => {
    it('renders without crashing', () => {
        render(
            <Router>
                <Navigation />
            </Router>
        );
        expect(screen.getByText('Fetch Challenge')).toBeInTheDocument();
    });

    it('toggles navigation menu when hamburger icon is clicked', () => {
        render(
            <Router>
                <Navigation />;
            </Router>
        );
        const hamburgerMenu = screen.getByAltText('Hamburger Menu');
        fireEvent.click(hamburgerMenu);
        expect(screen.getByText('X')).toBeInTheDocument();
    });

    it('closes navigation menu when X button is clicked', () => {
        render(
            <Router>
                <Navigation />
            </Router>
        );
        const hamburgerMenu = screen.getByAltText('Hamburger Menu');
        fireEvent.click(hamburgerMenu);
        const closeButton = screen.getByText('X');
        fireEvent.click(closeButton);
    });

    it('displays Log Out button when user is logged in', () => {
        Storage.prototype.getItem = jest.fn(() => 'true');

        render(
            <Router>
                <Navigation />
            </Router>
        );
        const hamburgerMenu = screen.getByAltText('Hamburger Menu');
        fireEvent.click(hamburgerMenu);
        expect(screen.getByText('Log Out')).toBeInTheDocument();
    });
});