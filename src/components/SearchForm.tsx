import React, { useState } from 'react';
import { searchKeywords } from '../services/apiService';
import Spinner from './Spinner';
import './SearchForm.css';

interface SearchFormProps {
  onResults: (results: string) => void;
  setLoading: (loading: boolean) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onResults, setLoading }) => {
  const [keywords, setKeywords] = useState('');
  const [url, setUrl] = useState('');
  const [keywordsError, setKeywordsError] = useState<string | null>(null);
  const [urlError, setUrlError] = useState<string | null>(null);
  const [loading, setLoadingState] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let valid = true;

    if (!keywords) {
      setKeywordsError('Keywords are required.');
      valid = false;
    } else {
      setKeywordsError(null);
    }

    if (!url) {
      setUrlError('URL is required.');
      valid = false;
    } else {
      setUrlError(null);
    }

    if (!valid) {
      return;
    }

    setLoading(true);
    setLoadingState(true);
    const results = (await searchKeywords(keywords, url)) || '';
    onResults(results);
    setLoading(false);
    setLoadingState(false);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="form-group">
        <label>
          Keywords:
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </label>
        {keywordsError && <div className="error-message">{keywordsError}</div>}
      </div>
      <div className="form-group">
        <label>
          URL:
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        {urlError && <div className="error-message">{urlError}</div>}
      </div>
      <button type="submit" disabled={loading}>Search</button>
      {loading && <Spinner />}
    </form>
  );
};

export default SearchForm;