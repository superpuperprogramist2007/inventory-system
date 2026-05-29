import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow p-4 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto">
        {/* Саме тут з'являтимуться сторінки Галереї або Адмін-панелі */}
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-gray-400 text-center py-4 text-sm mt-auto">
        © 2026 Система управління складом. Всі права захищено.
      </footer>
    </div>
  );
};
export default Layout;
