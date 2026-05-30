// src/store/InventoryContext.jsx
import { createContext, useState, useEffect, useCallback } from "react";
import { inventoryApi } from "../services/inventoryApi";

// Ініціалізація контексту
export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // БАГ ВИПРАВЛЕНО: useCallback БЕЗ масиву залежностей [] створював нову функцію
  // при кожному рендері → useEffect запускався нескінченно (infinite loop)
  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await inventoryApi.getAll();
      setItems(data);
    } catch (err) {
      setError(
        "Не вдалося завантажити інвентар. Перевірте з'єднання з сервером.",
      );
    } finally {
      setLoading(false);
    }
  }, []); // <-- [] означає: функція створюється лише один раз

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const refreshInventory = useCallback(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <InventoryContext.Provider
      value={{ items, loading, error, refreshInventory }}
    >
      {children}
    </InventoryContext.Provider>
  );
};
