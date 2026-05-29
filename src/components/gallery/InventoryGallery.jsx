import InventoryCard from "./InventoryCard";

const InventoryGallery = ({
  items,
  toggleFavorite,
  isFavorite,
  onViewDetails,
}) => {
  return (
    // Реалізація адаптивного grid-макету
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {items.map((item) => (
        <InventoryCard
          key={item.id}
          item={item}
          isFavorite={isFavorite(item.id)}
          onToggleFavorite={toggleFavorite}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};
export default InventoryGallery;
