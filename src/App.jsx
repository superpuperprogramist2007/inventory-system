import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Імпортуємо загальний макет сторінки (наприклад, з навігаційним меню Navbar)
import Layout from "./components/common/Layout";

// Імпортуємо компоненти з папки gallery (Клієнтський розділ)
import Gallery from "./pages/gallery/Gallery";
import Favorites from "./pages/gallery/Favorites";

// Імпортуємо компоненти з папки admin (Адміністративний розділ)
import AdminInventory from "./pages/admin/AdminInventory";
import AdminInventoryCreate from "./pages/admin/AdminInventoryCreate.jsx";
import AdminInventoryEdit from "./pages/admin/AdminInventoryEdit";

function App() {
  return (
    <Router>
      <Routes>
        {/* Головний маршрут "/", який використовує Layout як обгортку для всіх сторінок */}
        <Route path="/" element={<Layout />}>
          {/* ----- МАРШРУТИ КЛІЄНТСЬКОГО РОЗДІЛУ ----- */}
          {/* Атрибут "index" означає, що цей компонент відкриється за замовчуванням за адресою "/" */}
          <Route index element={<Gallery />} />
          {/* Відкриється за адресою "/favorites" */}
          <Route path="favorites" element={<Favorites />} />

          {/* ----- МАРШРУТИ АДМІНІСТРАТИВНОГО РОЗДІЛУ ----- */}
          {/* Вкладений роутинг: всі дочірні шляхи автоматично отримають префікс "/admin" */}
          <Route path="admin">
            {/* Відкриється за адресою "/admin" */}
            <Route index element={<AdminInventory />} />
            {/* Відкриється за адресою "/admin/create" */}
            <Route path="create" element={<AdminInventoryCreate />} />
            {/* Відкриється за адресою "/admin/edit/123" (де 123 - це динамічний ID) */}
            <Route path="edit/:id" element={<AdminInventoryEdit />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
