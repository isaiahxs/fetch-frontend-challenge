import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const initialTheme = localStorage.getItem('theme') || 'day';
    const [theme, setTheme] = useState(initialTheme);

    // const [theme, setTheme] = useState('day');

    const toggleTheme = () => {
        // setTheme(theme === 'day' ? 'night' : 'day');
        const newTheme = theme === 'day' ? 'night' : 'day';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};