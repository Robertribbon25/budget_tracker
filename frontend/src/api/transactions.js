// frontend/src/api/transactions.js
const BASE_URL = 'http://localhost:5000/api/transactions';

// Fetch all transactions (with optional filters object)
export async function getTransactions(filters = {}) {
  const params = new URLSearchParams(filters).toString();
  const res = await fetch(`${BASE_URL}?${params}`);
  if (!res.ok) throw new Error('Failed to fetch transactions');
  return res.json();
}

// Add a new transaction
export async function addTransaction(data) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to add transaction');
  }
  return res.json();
}

// Delete a transaction by id
export async function deleteTransaction(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete transaction');
  return res.json();
}

// Get the summary totals
export async function getSummary() {
  const res = await fetch(`${BASE_URL}/summary`);
  if (!res.ok) throw new Error('Failed to fetch summary');
  return res.json();
}