
import { useState, useEffect } from 'react';

export const useFavorites = () => {
  // Ініціалізація стану з перевіркою наявності даних у localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem('inventory_favorites');
      return savedFavorites? JSON.parse(savedFavorites) :;
    } catch (error) {
      console.error('Помилка парсингу localStorage', error);
      return;
    }
  });

  // Синхронізація стану з localStorage при кожній зміні масиву favorites 
  useEffect(() => {
    localStorage.setItem('inventory_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (item) => {
    if (!favorites.find(fav => fav.id === item.id)) {
      setFavorites([...favorites, item]);
    }
  };

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(fav => fav.id!== id));
  };

  // Метод для перевірки статусу (використовується для рендерингу іконки сердечка)
  const isFavorite = (id) => {
    return favorites.some(fav => fav.id === id);
  };

  // Метод-перемикач для зручного використання на кнопці
  const toggleFavorite = (item) => {
    if (isFavorite(item.id)) {
      removeFavorite(item.id);
    } else {
      addFavorite(item);
    }
  };

  return { favorites, toggleFavorite, isFavorite };
};