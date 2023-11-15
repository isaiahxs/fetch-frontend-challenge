import React from 'react';
import { getByText, render } from '@testing-library/react';
import Footer from './index';

describe('<Footer />', () => {
    it('renders without crashing', () => {
        const { container } = render(<Footer />);
        expect(container).toBeTruthy();
    })

    it('renders the appropriate text', () => {
        const { getByText } = render(<Footer />);
        expect(getByText('Fetch Challenge')).toBeInTheDocument();
    })

    it('renders my name', () => {
        const { getByText } = render(<Footer />);
        expect(getByText('Isaiah Sinnathamby')).toBeInTheDocument();
    })
})