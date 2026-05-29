import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import InventoryForm from "../../components/inventory/InventoryForm";
import { inventoryApi } from "../../services/inventoryApi";
import { InventoryContext } from "../../store/InventoryContext";
import { FiArrowLeft } from "react-icons/fi";

const AdminInventoryEdit = () => {
  const { id } = useParams(); // Отримання ID з URL
  const navigate = useNavigate();
  const { refreshInventory } = useContext(InventoryContext);
  const [initialData, setInitialData] = useState(null);

  // Отримання поточних даних позиції для попереднього заповнення форми
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await inventoryApi.getById(id);
        setInitialData(data);
      } catch (error) {
        alert(
          "Не вдалося завантажити дані для редагування. Можливо, об'єкт було видалено.",
        );
        navigate("/admin");
      }
    };
    fetchItem();
  }, [id, navigate]);

  const handleUpdate = async (data, file) => {
    try {
      // 1. Оновлення текстових даних (формат JSON)
      await inventoryApi.updateText(id, {
        inventory_name: data.inventory_name,
        description: data.description,
      });

      // 2. Оновлення фотографії лише у випадку, якщо користувач обрав новий файл
      if (file) {
        const photoFormData = new FormData();
        photoFormData.append("photo", file); // Формат multipart/form-data
        await inventoryApi.updatePhoto(id, photoFormData);
      }

      refreshInventory();
      navigate("/admin");
    } catch (error) {
      alert(
        "Виникла помилка під час оновлення інвентарю. Перевірте консоль для деталей.",
      );
    }
  };

  if (!initialData)
    return (
      <div className="flex justify-center mt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );

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
            Редагування позиції #{id}
          </h1>
          <p className="text-gray-500 mt-1">
            Зміна характеристик існуючого інвентарю
          </p>
        </div>
      </div>
      <InventoryForm
        initialData={initialData}
        onSubmit={handleUpdate}
        isEditMode={true}
      />
    </div>
  );
};
export default AdminInventoryEdit;
