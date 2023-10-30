import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Main from './components/Main/Main';

// Mock the Main component
jest.mock('./components/Main/Main', () => {
  return function DummyMain() {
    return (
      <div data-testid="main-component">
        Main Component
      </div>
    );
  };
});

describe('<App />', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  it('renders the Main component', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('main-component')).toBeTruthy();
  });
});