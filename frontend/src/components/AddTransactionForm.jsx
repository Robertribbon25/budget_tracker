import { useState } from 'react';
import { addTransaction } from '../api/transactions';

const CATEGORIES = ['Food', 'Transport', 'Housing', 'Health', 'Entertainment', 'Salary', 'Other'];

export default function AddTransactionForm({ onAdd }) {
  const [form, setForm] = useState({
    type: 'expense', amount: '', description: '', category: 'Other',
    date: new Date().toISOString().split('T')[0], // today's date as default
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (!form.amount || parseFloat(form.amount) <= 0) {
      return setError('Please enter a valid amount');
    }
    try {
      setSubmitting(true);
      await addTransaction({ ...form, amount: parseFloat(form.amount) });
      setForm({ type: 'expense', amount: '', description: '', category: 'Other',
                date: new Date().toISOString().split('T')[0] });
      onAdd(); // tell App to refresh
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-4 space-y-3">
      <h2 className="font-semibold text-lg">Add Transaction</h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Type toggle */}
      <div className="flex gap-2">
        {['expense', 'income'].map(t => (
          <button key={t} type="button"
            onClick={() => setForm({ ...form, type: t })}
            className={`flex-1 py-2 rounded-lg capitalize font-medium transition-colors ${
              form.type === t
                ? t === 'income' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}>
            {t}
          </button>
        ))}
      </div>

      <input name="description" placeholder="Description" value={form.description}
        onChange={handleChange} required
        className="w-full border rounded-lg px-3 py-2 text-sm" />

      <div className="flex gap-2">
        <input name="amount" type="number" placeholder="Amount" min="0.01" step="0.01"
          value={form.amount} onChange={handleChange} required
          className="flex-1 border rounded-lg px-3 py-2 text-sm" />
        <input name="date" type="date" value={form.date} onChange={handleChange}
          className="border rounded-lg px-3 py-2 text-sm" />
      </div>

      <select name="category" value={form.category} onChange={handleChange}
        className="w-full border rounded-lg px-3 py-2 text-sm">
        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
      </select>

      <button type="submit" disabled={submitting}
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50">
        {submitting ? 'Adding...' : 'Add Transaction'}
      </button>
    </form>
  );
}