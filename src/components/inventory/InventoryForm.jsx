import { useState } from "react";

const InventoryForm = ({ initialData, onSubmit, isEditMode }) => {
  const [formData, setFormData] = useState({
    inventory_name: initialData?.inventory_name || "",
    description: initialData?.description || "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    // БАГ ВИПРАВЛЕНО: e.target.files → FileList (об'єкт-список), а не File.
    // FileList не має властивості .type → умова завжди false → файл ніколи не зберігався
    const selectedFile = e.target.files[0]; // <-- потрібен конкретний File об'єкт
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setError("");
    } else if (selectedFile) {
      setError("Будь ласка, оберіть файл зображення (jpg, png, тощо).");
      e.target.value = null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.inventory_name.trim()) {
      setError("Назва інвентарю є обов'язковим полем.");
      return;
    }

    if (!isEditMode && !file) {
      setError("Фотографія є обов'язковою для створення нової позиції.");
      return;
    }

    setError("");
    onSubmit(formData, file);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-2xl mx-auto"
    >
      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-medium rounded">
          {error}
        </div>
      )}

      <div className="mb-6">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="inventory_name"
        >
          Назва інвентарю <span className="text-red-500">*</span>
        </label>
        <input
          id="inventory_name"
          type="text"
          name="inventory_name"
          value={formData.inventory_name}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
          placeholder="Введіть назву позиції..."
        />
      </div>

      <div className="mb-6">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="description"
        >
          Детальний опис
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
          rows="5"
          placeholder="Опишіть характеристики, стан або призначення інвентарю..."
        ></textarea>
      </div>

      <div className="mb-8 p-6 bg-gray-50 border border-gray-200 border-dashed rounded-xl">
        <label
          className="block text-gray-700 font-bold mb-3"
          htmlFor="photo_upload"
        >
          Завантаження фотографії{" "}
          {isEditMode ? (
            <span className="text-gray-400 font-normal text-sm">
              (залиште порожнім, щоб зберегти поточну)
            </span>
          ) : (
            <span className="text-red-500">*</span>
          )}
        </label>
        <input
          id="photo_upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors cursor-pointer"
        />
        {/* Прев'ю нового обраного файлу */}
        {preview && (
          <div className="mt-4 flex items-center space-x-4">
            <span className="text-sm text-gray-500">Нове фото:</span>
            <img
              src={preview}
              alt="Прев'ю"
              className="h-16 w-16 object-cover rounded-lg border border-blue-300 shadow"
            />
          </div>
        )}
        {/* Прев'ю поточного фото при редагуванні (якщо новий файл не обрано) */}
        {initialData?.photoUrl && !preview && (
          <div className="mt-4 flex items-center space-x-4">
            <span className="text-sm text-gray-500">Поточне фото:</span>
            <img
              src={initialData.photoUrl}
              alt="Прев'ю"
              className="h-16 w-16 object-cover rounded-lg border border-gray-300"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-100">
        <button
          type="submit"
          className="w-full sm:w-auto bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all transform hover:-translate-y-0.5"
        >
          {isEditMode ? "Зберегти зміни" : "Створити інвентар"}
        </button>
      </div>
    </form>
  );
};
export default InventoryForm;
