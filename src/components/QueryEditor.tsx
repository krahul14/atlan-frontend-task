import React from 'react';
import Editor from '@monaco-editor/react';

interface QueryEditorProps {
  value: string;
  onChange: (value: string) => void;
  darkMode: boolean;
}

const QueryEditor: React.FC<QueryEditorProps> = ({ value, onChange, darkMode }) => {
  return (
    <div className="query-editor">
      <Editor
        height="200px"
        language="sql"
        theme={darkMode ? 'vs-dark' : 'light'}
        value={value}
        onChange={(val) => onChange(val || '')}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: true,
          fontSize: 14,
          wordWrap: 'on',
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default QueryEditor;