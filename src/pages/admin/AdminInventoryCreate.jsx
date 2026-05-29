import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import InventoryForm from "../../components/inventory/InventoryForm";
import { inventoryApi } from "../../services/inventoryApi";
import { InventoryContext } from "../../store/InventoryContext";
import { FiArrowLeft } from "react-icons/fi";

const AdminInventoryCreate = () => {
  const navigate = useNavigate(); // Хук для програмної навігації
  const { refreshInventory } = useContext(InventoryContext);

  const handleCreate = async (data, file) => {
    try {
      // Ініціалізація інтерфейсу FormData для multipart/form-data запиту
      const formData = new FormData();
      formData.append("inventory_name", data.inventory_name);
      formData.append("description", data.description);
      formData.append("photo", file);

      await inventoryApi.create(formData);

      // Після успішного створення оновлюємо глобальний стан
      refreshInventory();
      // І повертаємо користувача до таблиці
      navigate("/admin");
    } catch (error) {
      alert("Виникла помилка під час реєстрації нової позиції на сервері.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      <div className="mb-6 flex items-center">
        <Link
          to="/admin"
          className="mr-4 p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
        >
          <FiArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Реєстрація нового інвентарю
          </h1>
          <p className="text-gray-500 mt-1">
            Заповніть форму нижче для додавання позиції на склад
          </p>
        </div>
      </div>
      <InventoryForm onSubmit={handleCreate} isEditMode={false} />
    </div>
  );
};
export default AdminInventoryCreate;
