import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { inventoryApi } from "../../services/inventoryApi";
import { FiArrowLeft, FiEdit2, FiTrash2 } from "react-icons/fi";

const AdminInventoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await inventoryApi.getById(id);
        setItem(data);
      } catch (err) {
        alert("Позицію не знайдено.");
        navigate("/admin");
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id, navigate]);

  if (loading)
    return (
      <div className="flex justify-center mt-24">
        <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-blue-600"></div>
      </div>
    );

  if (!item) return null;

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      {/* Заголовок + навігація */}
      <div className="mb-6 flex items-center">
        <Link
          to="/admin"
          className="mr-4 p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
        >
          <FiArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Деталі позиції
          </h1>
          <p className="text-gray-500 mt-1">ID: {item.id}</p>
        </div>
      </div>

      {/* Картка деталей */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Зображення */}
          <div className="w-full md:w-2/5 h-72 md:h-auto bg-gray-100 relative flex-shrink-0">
            {!imgError ? (
              <img
                src={item.photoUrl}
                alt={item.inventory_name}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 flex-col gap-2">
                <svg
                  className="w-12 h-12"
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
                <span className="text-sm">Фото недоступне</span>
              </div>
            )}
          </div>

          {/* Інформація */}
          <div className="flex-1 p-8 flex flex-col">
            <div className="uppercase tracking-widest text-xs text-blue-600 font-bold mb-2">
              Інвентар
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-4">
              {item.inventory_name}
            </h2>

            <div className="bg-gray-50 rounded-xl p-4 mb-6 flex-grow">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Опис
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {item.description || "Опис відсутній."}
              </p>
            </div>

            {/* Кнопки дій */}
            <div className="flex gap-3 mt-auto">
              <Link
                to={`/admin/edit/${item.id}`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-semibold shadow-sm"
              >
                <FiEdit2 size={16} />
                Редагувати
              </Link>
              <Link
                to="/admin"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
              >
                Назад до списку
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminInventoryDetails;
