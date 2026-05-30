import { useState, useEffect } from "react";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("inventory_favorites");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Помилка парсингу localStorage:", error);
      // БАГ ВИПРАВЛЕНО: return; → повертав undefined замість [],
      // тоді favorites = undefined → .find(), .filter(), .some(), .length → TypeError crash
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("inventory_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (item) => {
    if (!favorites.find((fav) => fav.id === item.id)) {
      setFavorites((prev) => [...prev, item]);
    }
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
  };

  const isFavorite = (id) => {
    return favorites.some((fav) => fav.id === id);
  };

  const toggleFavorite = (item) => {
    if (isFavorite(item.id)) {
      removeFavorite(item.id);
    } else {
      addFavorite(item);
    }
  };

  return { favorites, toggleFavorite, isFavorite };
};
