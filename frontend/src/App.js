import { BrowserRouter as Router } from 'react-router-dom';
import Main from './components/Main/Main.js';
import { FilterProvider } from './components/FilterPage/FilterContext.js';
import './App.css';

function App() {
  return (
    <FilterProvider>
      <div className="App">
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
