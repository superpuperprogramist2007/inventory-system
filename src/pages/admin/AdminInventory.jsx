import { useContext, useState } from "react";
import { InventoryContext } from "../../store/InventoryContext";
import InventoryTable from "../../components/inventory/InventoryTable";
import ConfirmModal from "../../components/inventory/ConfirmModal";
import { Link } from "react-router-dom";
import { inventoryApi } from "../../services/inventoryApi";

const AdminInventory = () => {
  const { items, loading, error, refreshInventory } =
    useContext(InventoryContext);

  // БАГ ВИПРАВЛЕНО: const [setDeleteId] = useState(null)
  // деструктурувало лише сеттер, а deleteId ніколи не оголошувався як змінна →
  // confirmDelete використовував deleteId = undefined → ReferenceError
  const [deleteId, setDeleteId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteRequest = (id) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await inventoryApi.delete(deleteId);
      refreshInventory();
    } catch (err) {
      alert("Виникла критична помилка під час видалення позиції.");
    } finally {
      setIsModalOpen(false);
      setDeleteId(null);
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
        <p className="mt-4 text-gray-600 font-medium">
          Завантаження інвентарю зі сховища...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-md shadow-sm mt-10">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-lg font-medium text-red-800">
              Помилка комунікації з сервером
            </h3>
            <p className="text-red-700 mt-2">{error}</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Управління інвентарем
          </h1>
          <p className="text-gray-500 mt-1">Система адміністрування складу</p>
        </div>
        <Link
          to="/admin/create"
          className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          Нова позиція
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-white shadow-sm rounded-xl border-2 border-dashed border-gray-300">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Інвентар відсутній
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Почніть з додавання нової позиції на склад.
          </p>
        </div>
      ) : (
        <InventoryTable items={items} onDelete={handleDeleteRequest} />
      )}

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};
export default AdminInventory;
