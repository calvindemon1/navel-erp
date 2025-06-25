import { getUser, logout } from "../utils/auth";
import { A, useNavigate } from "@solidjs/router";

export default function MainLayout(props) {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div class="flex h-screen">
      {/* Sidebar */}
      <aside class="w-64 bg-gray-800 text-white flex flex-col">
        <div class="p-4 text-xl font-bold">ERP Textile</div>
        <nav class="flex-1">
          <ul>
            <li>
              <A href="/dashboard" class="block p-4 hover:bg-gray-700">
                Dashboard
              </A>
            </li>
            <li>
              <A href="/orders" class="block p-4 hover:bg-gray-700">
                Pesanan
              </A>
            </li>
            <li>
              <A href="/customers" class="block p-4 hover:bg-gray-700">
                Customer
              </A>
            </li>
            <li>
              <A href="/transactions" class="block p-4 hover:bg-gray-700">
                Transaksi
              </A>
            </li>
            <li>
              <A href="/users" class="block p-4 hover:bg-gray-700">
                Users
              </A>
            </li>
          </ul>
        </nav>
        <div class="p-4 border-t border-gray-700">
          <button onClick={handleLogout} class="w-full bg-red-600 py-2 rounded">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div class="flex-1 flex flex-col">
        <header class="bg-white shadow p-4 flex justify-between">
          <div>
            Selamat datang, {user?.name} ({user?.username.toUpperCase()})
          </div>
        </header>

        <main class="p-6 bg-gray-100 flex-1 overflow-y-auto">
          {props.children}
        </main>
      </div>
    </div>
  );
}
