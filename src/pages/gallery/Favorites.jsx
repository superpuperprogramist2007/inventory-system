import { useState } from "react";
import { useFavorites } from "../../hooks/useFavorites";
import InventoryGallery from "../../components/gallery/InventoryGallery";
import InventoryQuickView from "../../components/gallery/InventoryQuickView";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setIsQuickViewOpen(true);
  };

  return (
    <div className="animate-fadeIn">
      <div className="mb-10 border-b border-gray-200 pb-6 mt-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          Ваші Улюблені
        </h1>
        <p className="text-gray-500 mt-3 text-lg">
          Збережені позиції для швидкого доступу. Дані зберігаються локально у
          вашому браузері.
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-20 bg-white shadow-sm rounded-2xl border border-gray-100 mt-10">
          <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Список порожній
          </h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Ви ще не додали жодної позиції до улюблених. Перейдіть до каталогу,
            щоб знайти цікавий інвентар.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-3.5 rounded-xl hover:bg-blue-700 transition-colors font-bold shadow-md hover:shadow-lg"
          >
            Перейти до Галереї
          </Link>
        </div>
      ) : (
        <InventoryGallery
          items={favorites}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
          onViewDetails={handleViewDetails}
        />
      )}

      <InventoryQuickView
        item={selectedItem}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </div>
  );
};
export default Favorites;
