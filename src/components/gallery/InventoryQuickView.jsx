import { FiX } from "react-icons/fi";
import { useEffect } from "react";

const InventoryQuickView = ({ item, isOpen, onClose }) => {
  // Блокування скролінгу під час відкритого модального вікна
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Темний фон з ефектом розмиття (blur overlay)  */}
      <div
        className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Контейнер деталей */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-5xl flex flex-col md:flex-row relative z-10 animate-fadeIn max-h-[90vh]">
        {/* Кнопка закриття */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-gray-500 hover:text-gray-900 bg-white/80 backdrop-blur rounded-full p-2 shadow-md transition-all hover:bg-gray-100"
        >
          <FiX size={24} />
        </button>

        {/* Секція великого зображення */}
        <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-100 relative">
          <img
            src={item.photoUrl}
            alt={item.inventory_name}
            className="w-full h-full object-cover absolute inset-0"
          />
        </div>

        {/* Секція детального опису */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto">
          <div className="uppercase tracking-widest text-xs text-blue-600 font-bold mb-2">
            Деталі інвентарю
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
            {item.inventory_name}
          </h2>

          <div className="flex-grow prose prose-blue max-w-none">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b pb-2">
              Опис та характеристики
            </h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-base">
              {item.description}
            </p>
          </div>

          <div className="mt-10 pt-6 border-t border-gray-100 bg-gray-50 p-4 rounded-xl flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">
              Системний ID: <span className="text-gray-900">{item.id}</span>
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
              В наявності
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InventoryQuickView;
