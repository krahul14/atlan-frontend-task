import React, { useState } from 'react';
import QueryEditor from './components/QueryEditor';
import QuerySelector from './components/QuerySelector';
import ResultsTable from './components/ResultsTable';
import QueryHistory from './components/QueryHistory';
import { Query, mockData } from './data/mockData';
import './styles/App.scss';

const App: React.FC = () => {
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null);
  const [customQuery, setCustomQuery] = useState<string>('');
  const [executedQuery, setExecutedQuery] = useState<Query | null>(null);
  const [queryHistory, setQueryHistory] = useState<Query[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  const handleQuerySelect = (query: Query) => {
    setSelectedQuery(query);
    setCustomQuery('');
  };

  const handleCustomQueryChange = (value: string) => {
    setCustomQuery(value);
    setSelectedQuery(null);
  };

  const executeQuery = () => {
    const queryText = selectedQuery?.sql || customQuery;
    if (!queryText.trim()) return;
    
    setIsExecuting(true);
    
    setTimeout(() => {
      const queryToExecute = selectedQuery || {
        id: `custom-${Date.now()}`,
        name: 'Custom Query',
        sql: customQuery,
        results: mockData.customQueryResults,
        timestamp: new Date()
      };
      
      setExecutedQuery(queryToExecute);
      addToHistory(queryToExecute);
      setIsExecuting(false);
    }, 500);
  };

  const addToHistory = (query: Query) => {
    setQueryHistory(prev => [
      {
        ...query,
        timestamp: new Date()
      },
      ...prev
    ].slice(0, 10));
  };

  const clearQuery = () => {
    setCustomQuery('');
    setSelectedQuery(null);
    setExecutedQuery(null);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <header>
        <h1>SQL Query Interface</h1>
        <button 
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>

      <div className="main-content">
        <div className="query-section">
          <QuerySelector 
            onSelect={handleQuerySelect}
            selectedQuery={selectedQuery}
          />
          
          <QueryEditor
            value={selectedQuery?.sql || customQuery}
            onChange={handleCustomQueryChange}
            darkMode={darkMode}
          />
          
          <div className="query-actions">
            <button 
              onClick={executeQuery} 
              disabled={isExecuting || (!selectedQuery && !customQuery.trim())}
            >
              {isExecuting ? 'Executing...' : 'Execute Query'}
            </button>
            <button onClick={clearQuery}>Clear</button>
          </div>
        </div>

        <div className="results-section">
          <h2>Results</h2>
          {executedQuery && (
            <ResultsTable 
              data={executedQuery.results} 
              darkMode={darkMode}
            />
          )}
        </div>
      </div>

      <QueryHistory 
        history={queryHistory}
        onSelect={(query) => {
          setSelectedQuery(query);
          setCustomQuery('');
          setExecutedQuery(query);
        }}
        darkMode={darkMode}
      />
    </div>
  );
};

export default App;