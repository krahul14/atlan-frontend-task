import React from 'react';
import { Query, mockData } from '../data/mockData';

interface QuerySelectorProps {
  onSelect: (query: Query) => void;
  selectedQuery: Query | null;
}

const QuerySelector: React.FC<QuerySelectorProps> = ({ onSelect, selectedQuery }) => {
  return (
    <div className="query-selector">
      <label htmlFor="query-select">Predefined Queries:</label>
      <select
        id="query-select"
        value={selectedQuery?.id || ''}
        onChange={(e) => {
          const selected = mockData.predefinedQueries.find(q => q.id === e.target.value);
          if (selected) onSelect(selected);
        }}
      >
        <option value="">Select a query...</option>
        {mockData.predefinedQueries.map((query) => (
          <option key={query.id} value={query.id}>
            {query.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default QuerySelector;