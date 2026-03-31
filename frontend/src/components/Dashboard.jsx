export default function Dashboard({ summary }) {
    const { income, expenses, balance } = summary;
  
    return (
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <p className="text-sm text-green-600 font-medium">Income</p>
          <p className="text-2xl font-bold text-green-700">${income.toFixed(2)}</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-sm text-red-600 font-medium">Expenses</p>
          <p className="text-2xl font-bold text-red-700">${expenses.toFixed(2)}</p>
        </div>
        <div className={`rounded-lg p-4 text-center border ${
          balance >= 0
            ? 'bg-blue-50 border-blue-200'
            : 'bg-orange-50 border-orange-200'
        }`}>
          <p className="text-sm font-medium">Balance</p>
          <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-700' : 'text-orange-700'}`}>
            ${balance.toFixed(2)}
          </p>
        </div>
      </div>
    );
  }