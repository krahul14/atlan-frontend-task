import React from 'react';
import { Query } from '../data/mockData';

interface QueryHistoryProps {
  history: Query[];
  onSelect: (query: Query) => void;
  darkMode: boolean;
}

const QueryHistory: React.FC<QueryHistoryProps> = ({ history, onSelect, darkMode }) => {
  if (history.length === 0) return null;

  return (
    <div className={`query-history ${darkMode ? 'dark' : ''}`}>
      <h3>Query History</h3>
      <ul>
        {history.map((query, index) => (
          <li key={index}>
            <button 
              onClick={() => onSelect(query)}
              title={query.sql}
            >
              {query.name || 'Custom Query'} - {query.timestamp?.toLocaleTimeString()}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QueryHistory;