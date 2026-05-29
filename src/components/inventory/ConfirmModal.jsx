import { useEffect } from "react";

const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  // Блокування прокрутки фону при відкритому модальному вікні
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Напівпрозорий фон з розмиттям (backdrop-blur) */}
      <div
        className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Контейнер модального вікна */}
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md m-4 relative z-10 transform transition-all scale-100">
        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
          <svg
            className="w-6 h-6 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            ></path>
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
          Підтвердження видалення
        </h2>
        <p className="text-gray-500 text-center mb-8 text-sm">
          Ви дійсно бажаєте безповоротно видалити цю позицію інвентарю зі
          складу? Цю дію неможливо буде скасувати, і всі пов'язані дані будуть
          втрачені.
        </p>
        <div className="flex justify-center space-x-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors w-full"
          >
            Скасувати
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2.5 bg-red-600 border border-transparent text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors w-full shadow-sm"
          >
            Видалити
          </button>
        </div>
      </div>
    </div>
  );
};
export default ConfirmModal;
