import axios from "axios";

const API_URL = "/api";

const apiClient = axios.create({
  baseURL: API_URL,
});

// Допоміжна функція: конструює URL фотографії з id позиції.
// API сервує фото за GET /inventory/:id/photo, але у відповіді getAll()
// може не бути поля photoUrl → будуємо його самостійно.
const buildPhotoUrl = (id) => `${API_URL}/inventory/${id}/photo`;

export const inventoryApi = {
  getAll: async () => {
    const response = await apiClient.get("/inventory");
    // Додаємо поле photoUrl до кожного елемента для використання в UI
    return response.data.map((item) => ({
      ...item,
      photoUrl: item.photoUrl || buildPhotoUrl(item.id),
    }));
  },

  getById: async (id) => {
    const response = await apiClient.get(`/inventory/${id}`);
    const item = response.data;
    return {
      ...item,
      photoUrl: item.photoUrl || buildPhotoUrl(item.id),
    };
  },

  create: async (formData) => {
    const response = await apiClient.post("/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  updateText: async (id, data) => {
    const response = await apiClient.put(`/inventory/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  },

  updatePhoto: async (id, formData) => {
    const response = await apiClient.put(`/inventory/${id}/photo`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  delete: async (id) => {
    const response = await apiClient.delete(`/inventory/${id}`);
    return response.data;
  },
};
