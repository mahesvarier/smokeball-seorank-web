import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchForm from './components/SearchForm';
import Spinner from './components/Spinner';

function App() {
  const [results, setResults] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="App">
      <header className="App-header">
        <h1>SEO Keyword Search</h1>
        <SearchForm onResults={setResults} setLoading={setLoading} />
        {loading ? (
          <Spinner/>
        ) : (
          results && (
            <div>
              <h2>Results:</h2>
              <p>{results}</p>
            </div>
          )
        )}
      </header>
    </div>
  );
}

export default App;