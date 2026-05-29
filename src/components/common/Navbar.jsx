import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="text-xl font-bold tracking-wider">Склад PRO</div>
          <div className="flex space-x-2 sm:space-x-4">
            <Link
              to="/"
              className="hover:bg-blue-700 px-3 py-2 rounded-md transition-colors text-sm font-medium"
            >
              Галерея
            </Link>
            <Link
              to="/favorites"
              className="hover:bg-blue-700 px-3 py-2 rounded-md transition-colors text-sm font-medium"
            >
              Улюблені
            </Link>
            <Link
              to="/admin"
              className="bg-blue-900 hover:bg-blue-700 px-3 py-2 rounded-md transition-colors text-sm font-bold border border-blue-600"
            >
              Адмін-панель
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
