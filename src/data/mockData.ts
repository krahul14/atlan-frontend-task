export interface Query {
  id: string;
  name: string;
  sql: string;
  results: any[];
  timestamp?: Date;
}

export const mockData = {
  predefinedQueries: [
    {
      id: 'q1',
      name: 'Select all users',
      sql: 'SELECT * FROM users;',
      results: [
        { id: 1, name: 'John Doe', email: 'john@example.com', age: 28 },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 32 },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 45 },
      ],
    },
    {
      id: 'q2',
      name: 'Count orders by status',
      sql: 'SELECT status, COUNT(*) as count FROM orders GROUP BY status;',
      results: [
        { status: 'pending', count: 12 },
        { status: 'shipped', count: 8 },
        { status: 'delivered', count: 15 },
        { status: 'cancelled', count: 3 },
      ],
    },
    {
      id: 'q3',
      name: 'Products with low inventory',
      sql: 'SELECT product_name, quantity FROM inventory WHERE quantity < 10;',
      results: [
        { product_name: 'Wireless Mouse', quantity: 5 },
        { product_name: 'Mechanical Keyboard', quantity: 3 },
        { product_name: 'USB-C Cable', quantity: 8 },
      ],
    },
  ],
  customQueryResults: [
    { id: 1, column1: 'Sample', column2: 'Data', column3: 'Row 1' },
    { id: 2, column1: 'Example', column2: 'Results', column3: 'Row 2' },
    { id: 3, column1: 'Test', column2: 'Information', column3: 'Row 3' },
  ],
};