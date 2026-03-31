export default function TransactionList({ transactions, onDelete }) {
    if (transactions.length === 0) {
      return <p className="text-center text-gray-400 py-8">No transactions yet. Add one above.</p>;
    }
  
    return (
      <div className="space-y-2">
        <h2 className="font-semibold text-lg">Transactions</h2>
        {transactions.map(txn => (
          <div key={txn._id}
            className="flex items-center justify-between bg-white border rounded-lg px-4 py-3">
            <div className="flex items-center gap-3">
              {/* Colored dot indicator */}
              <span className={`w-3 h-3 rounded-full ${
                txn.type === 'income' ? 'bg-green-400' : 'bg-red-400'
              }`} />
              <div>
                <p className="font-medium text-sm">{txn.description}</p>
                <p className="text-xs text-gray-400">
                  {txn.category} · {new Date(txn.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`font-semibold ${
                txn.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                {txn.type === 'income' ? '+' : '-'}${parseFloat(txn.amount).toFixed(2)}
              </span>
              <button onClick={() => onDelete(txn._id)}
                className="text-gray-300 hover:text-red-500 text-lg leading-none transition-colors"
                aria-label="Delete">
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }