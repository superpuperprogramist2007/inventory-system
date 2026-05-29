// src/store/InventoryContext.jsx
import { createContext, useState, useEffect, useCallback } from "react";
import { inventoryApi } from "../services/inventoryApi";

// Ініціалізація контексту
export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Використання useCallback запобігає зайвим перемальовуванням компонента
  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await inventoryApi.getAll();
      setItems(data);
    } catch (err) {
      // Обробка стану помилки
      setError(
        "Не вдалося завантажити інвентар. Перевірте з'єднання з сервером.",
      );
    } finally {
      // Цей блок виконається в будь-якому випадку, знімаючи стан завантаження
      setLoading(false);
    }
  });

  // Первинне завантаження даних при монтуванні провайдера
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Метод для примусового оновлення даних після операцій CRUD
  const refreshInventory = () => {
    fetchItems();
  };

  return (
    <InventoryContext.Provider
      value={{ items, loading, error, refreshInventory }}
    >
      {children}
    </InventoryContext.Provider>
  );
};
