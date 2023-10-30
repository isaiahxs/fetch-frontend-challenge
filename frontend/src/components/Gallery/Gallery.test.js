import React from 'react';
import { render } from '@testing-library/react';
import Gallery from './index';

// Mock the useLanguage hook
jest.mock('../../LanguageContext', () => ({
    useLanguage: () => ({
        currentLanguage: 'english',
        setCurrentLanguage: jest.fn()
    })
}));

describe('<Gallery />', () => {

    it('renders without crashing', () => {
        const { container } = render(<Gallery />);
        expect(container).toBeTruthy();
    });

    it('renders the correct number of images', () => {
        const { getAllByAltText } = render(<Gallery />);
        const images = getAllByAltText('Slide Image');
        expect(images.length).toBe(12);
    });

    it('renders the gallery header', () => {
        const { getByText } = render(<Gallery />);
        expect(getByText('Our Gallery')).toBeInTheDocument();
    });
});
