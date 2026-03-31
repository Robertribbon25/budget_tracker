// frontend/src/App.jsx
import { useState, useEffect, useCallback } from 'react';
import Dashboard from './components/Dashboard';
import AddTransactionForm from './components/AddTransactionForm';
import TransactionList from './components/TransactionList';
import { getTransactions, getSummary, deleteTransaction } from './api/transactions';

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ income: 0, expenses: 0, balance: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch everything from the API
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [txns, sum] = await Promise.all([getTransactions(), getSummary()]);
      setTransactions(txns);
      setSummary(sum);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      loadData(); // refresh data after delete
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error)   return <div className="text-red-500 p-8">Error: {error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Budget Tracker</h1>
      <Dashboard summary={summary} />
      <AddTransactionForm onAdd={loadData} />
      <TransactionList transactions={transactions} onDelete={handleDelete} />
    </div>
  );
}