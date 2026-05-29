// src/services/inventoryApi.js
import axios from "axios";

// Конфігурація базового URL. Під час розробки він зазвичай вказує на локальний сервер.
const API_URL = "http://localhost:8000/api";

const apiClient = axios.create({
  baseURL: API_URL,
});

export const inventoryApi = {
  // Отримання повного списку інвентарю
  getAll: async () => {
    const response = await apiClient.get("/inventory");
    return response.data;
  },

  // Запит детальної інформації за ідентифікатором
  getById: async (id) => {
    const response = await apiClient.get(`/inventory/${id}`);
    return response.data;
  },

  // Створення нового запису за допомогою POST /register
  // Використовується об'єкт FormData браузера для передачі файлів
  create: async (formData) => {
    const response = await apiClient.post("/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Оновлення текстових полів (JSON)
  updateText: async (id, data) => {
    const response = await apiClient.put(`/inventory/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  },

  // Ізольоване оновлення фотографії (Multipart)
  updatePhoto: async (id, formData) => {
    const response = await apiClient.put(`/inventory/${id}/photo`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Видалення об'єкта
  delete: async (id) => {
    const response = await apiClient.delete(`/inventory/${id}`);
    return response.data;
  },
};
