import { BrowserRouter as Router } from 'react-router-dom';
import Main from './components/Main/Main.js';
import { FilterProvider } from './components/FilterPage/FilterContext.js';
import { useTheme } from './ThemeContext.js';
import './App.css';

function App() {
  const { theme } = useTheme();

  return (
    <FilterProvider>
      <div className={`App ${theme}`}>
        <header className="App-header">
          <Router>
            <Main />
          </Router>
        </header>
      </div>
    </FilterProvider>
  );
}

export default App;
