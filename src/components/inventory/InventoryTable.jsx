import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";

// Мінікомпонент для рядка таблиці з fallback для зображення
const TableRow = ({ item, onDelete }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <tr className="hover:bg-blue-50 transition-colors duration-200">
      <td className="px-5 py-4 border-b border-gray-100 text-sm">
        <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-gray-100 flex-shrink-0">
          {!imgError ? (
            <img
              className="w-full h-full object-cover"
              src={item.photoUrl}
              alt={item.inventory_name}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>
      </td>
      <td className="px-5 py-4 border-b border-gray-100 text-sm">
        <p className="text-gray-900 font-semibold text-base">
          {item.inventory_name}
        </p>
        <p className="text-gray-400 text-xs mt-1">ID: {item.id}</p>
      </td>
      <td className="px-5 py-4 border-b border-gray-100 text-sm hidden md:table-cell">
        <p className="text-gray-600 truncate max-w-xs">
          {item.description || "—"}
        </p>
      </td>
      <td className="px-5 py-4 border-b border-gray-100 text-sm text-center">
        <div className="flex justify-center space-x-3">
          {/* БАГ ВИПРАВЛЕНО: маршрут /admin/details/:id тепер зареєстрований в App.jsx */}
          <Link
            to={`/admin/details/${item.id}`}
            className="p-2 text-blue-600 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
            title="Переглянути деталі"
          >
            <FiEye size={17} />
          </Link>
          <Link
            to={`/admin/edit/${item.id}`}
            className="p-2 text-amber-600 bg-amber-100 rounded-full hover:bg-amber-200 transition-colors"
            title="Редагувати позицію"
          >
            <FiEdit size={17} />
          </Link>
          <button
            onClick={() => onDelete(item.id)}
            className="p-2 text-red-600 bg-red-100 rounded-full hover:bg-red-200 transition-colors"
            title="Видалити"
          >
            <FiTrash2 size={17} />
          </button>
        </div>
      </td>
    </tr>
  );
};

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
              Назва
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
            <TableRow key={item.id} item={item} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default InventoryTable;
