export default function Table({ data, columns }: { data: any; columns: any }) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full table-auto text-center text-sm text-gray-800">
        <thead className="bg-teal-700 text-gray-100">
          <tr>
            <th className="px-6 py-3">No</th>
            {columns.map((col: any, index: number) => (
              <th key={index} className="px-6 py-3">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, index: number) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-teal-50" : "bg-gray-50"
              } hover:bg-teal-100`}
            >
              <td className="px-6 py-2 font-medium text-teal-900">
                {index + 1}
              </td>
              {columns.map((col: any, colIndex: number) => (
                <td key={colIndex} className="px-6 py-2">
                  {row[col.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
