import { useContext, useState } from "react";
import { InventoryContext } from "../../store/InventoryContext";
import InventoryGallery from "../../components/gallery/InventoryGallery";
import InventoryQuickView from "../../components/gallery/InventoryQuickView";
import { useFavorites } from "../../hooks/useFavorites";

const Gallery = () => {
  const { items, loading, error } = useContext(InventoryContext);
  const { toggleFavorite, isFavorite } = useFavorites();

  // Стан для управління модальним вікном
  const [selectedItem, setSelectedItem] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Обробник кліку на картку
  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setIsQuickViewOpen(true);
  };

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-96">
        {/* Реалізація Skeleton/Spinner loading state  */}
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-600 mb-6"></div>
        <p className="text-gray-500 text-lg font-medium animate-pulse">
          Завантаження каталогу...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="text-center bg-red-50 p-10 rounded-2xl border border-red-200 mt-10 shadow-sm">
        <svg
          className="w-16 h-16 text-red-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <h3 className="text-xl font-bold text-red-800 mb-2">
          Технічна проблема
        </h3>
        <p className="text-red-600">{error}</p>
      </div>
    );

  return (
    <div className="animate-fadeIn">
      <div className="mb-12 text-center max-w-3xl mx-auto mt-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Каталог Інвентарю
        </h1>
        <p className="text-gray-500 text-lg sm:text-xl">
          Ознайомтеся з нашими доступними позиціями. Використовуйте іконку
          сердечка для додавання товарів до персонального списку улюблених.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-xl font-medium">
            Наразі галерея порожня. Поверніться пізніше.
          </p>
        </div>
      ) : (
        <InventoryGallery
          items={items}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
          onViewDetails={handleViewDetails}
        />
      )}

      {/* Інтеграція компонента Quick View  */}
      <InventoryQuickView
        item={selectedItem}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </div>
  );
};
export default Gallery;
