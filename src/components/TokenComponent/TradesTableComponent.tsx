const TradesTableComponent = ({ trades }: { trades: any[] }) => {
  return (
    <table className="w-full text-sm text-left text-gray-400">
      <thead className="text-xs uppercase bg-gray-700 text-gray-300">
        <tr>
          <th className="py-3 px-6">Time</th>
          <th className="py-3 px-6">Type</th>
          <th className="py-3 px-6">W2M</th>
          <th className="py-3 px-6">PEPE</th>
          <th className="py-3 px-6">Price</th>
          <th className="py-3 px-6">User</th>
          <th className="py-3 px-6">TXN</th>
        </tr>
      </thead>
      <tbody>
        {trades.map((trade, index) => (
          <tr
            key={index}
            className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700"
          >
            <td className="py-3 px-6">{trade.time}</td>
            <td className="py-3 px-6">{trade.type}</td>
            <td className="py-3 px-6">{trade.ath}</td>
            <td className="py-3 px-6">{trade.pepe}</td>
            <td className="py-3 px-6">{trade.price}</td>
            <td className="py-3 px-6">{trade.user}</td>
            <td className="py-3 px-6">{trade.txn}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TradesTableComponent;
