import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

const InventoryCard = ({
  item,
  isFavorite,
  onToggleFavorite,
  onViewDetails,
}) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group relative border border-gray-100 flex flex-col h-full">
      {/* Контейнер зображення з ефектом масштабування (zoom) при наведенні */}
      <div
        className="relative h-64 overflow-hidden cursor-pointer"
        onClick={() => onViewDetails(item)}
      >
        <img
          src={item.photoUrl}
          alt={item.inventory_name}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
        {/* Напівпрозорий Overlay з кнопкою Quick View  */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white/90 backdrop-blur-sm text-gray-900 font-bold px-6 py-2 rounded-full shadow-lg">
            Швидкий перегляд
          </span>
        </div>
      </div>

      {/* Текстовий блок картки */}
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 leading-tight pr-4">
            {item.inventory_name}
          </h3>

          {/* Кнопка "Улюблені" з анімацією натискання  */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // Запобігає спрацюванню кліку на картку
              onToggleFavorite(item);
            }}
            className={`p-2 rounded-full transition-all duration-200 focus:outline-none ${isFavorite ? "bg-red-50 text-red-500" : "bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50"}`}
            title={isFavorite ? "Видалити з улюблених" : "Додати в улюблені"}
          >
            {isFavorite ? (
              <FaHeart
                size={22}
                className="transform scale-110 transition-transform"
              />
            ) : (
              <FiHeart size={22} />
            )}
          </button>
        </div>
        <p className="text-gray-500 text-sm line-clamp-3 mt-auto">
          {item.description}
        </p>
      </div>
    </div>
  );
};
export default InventoryCard;
