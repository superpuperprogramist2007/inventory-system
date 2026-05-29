import { Link } from "react-router-dom";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";

const InventoryTable = ({ items, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-xl rounded-xl border border-gray-100">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-4 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
              Фотографія
            </th>
            <th className="px-5 py-4 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
              Назва інвентарю
            </th>
            <th className="px-5 py-4 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-bold text-gray-600 uppercase tracking-wider hidden md:table-cell">
              Опис
            </th>
            <th className="px-5 py-4 border-b-2 border-gray-200 bg-gray-50 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
              Управління
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-blue-50 transition-colors duration-200"
            >
              <td className="px-5 py-4 border-b border-gray-100 text-sm">
                <div className="flex-shrink-0 w-16 h-16">
                  <img
                    className="w-full h-full rounded-lg object-cover shadow-sm border border-gray-200"
                    src={item.photoUrl}
                    alt={item.inventory_name}
                  />
                </div>
              </td>
              <td className="px-5 py-4 border-b border-gray-100 text-sm">
                <p className="text-gray-900 whitespace-no-wrap font-semibold text-base">
                  {item.inventory_name}
                </p>
                <p className="text-gray-500 text-xs mt-1">ID: {item.id}</p>
              </td>
              <td className="px-5 py-4 border-b border-gray-100 text-sm hidden md:table-cell">
                <p className="text-gray-600 whitespace-no-wrap truncate max-w-xs">
                  {item.description}
                </p>
              </td>
              <td className="px-5 py-4 border-b border-gray-100 text-sm text-center">
                <div className="flex justify-center space-x-4">
                  <Link
                    to={`/admin/details/${item.id}`}
                    className="p-2 text-blue-600 bg-blue-100 rounded-full hover:bg-blue-200 hover:text-blue-900 transition-colors"
                    title="Переглянути деталі"
                  >
                    <FiEye size={18} />
                  </Link>
                  <Link
                    to={`/admin/edit/${item.id}`}
                    className="p-2 text-amber-600 bg-amber-100 rounded-full hover:bg-amber-200 hover:text-amber-900 transition-colors"
                    title="Редагувати позицію"
                  >
                    <FiEdit size={18} />
                  </Link>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="p-2 text-red-600 bg-red-100 rounded-full hover:bg-red-200 hover:text-red-900 transition-colors"
                    title="Видалити назавжди"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default InventoryTable;
