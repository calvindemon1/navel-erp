import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { login } from "../utils/auth";

export default function LoginPage() {
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = login(username(), password());
    if (user) {
      navigate("/dashboard", { replace: true });
    } else {
      setError("Username atau password salah");
    }
  };

  return (
    <div class="flex justify-center items-center h-screen bg-gray-100">
      <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold mb-6 text-center">Login ERP</h1>
        {error() && <p class="text-red-500 mb-4">{error()}</p>}
        <input
          class="w-full mb-4 px-4 py-2 border rounded"
          type="text"
          placeholder="Username"
          value={username()}
          onInput={(e) => setUsername(e.target.value)}
        />
        <input
          class="w-full mb-4 px-4 py-2 border rounded"
          type="password"
          placeholder="Password"
          value={password()}
          onInput={(e) => setPassword(e.target.value)}
        />
        <button
          class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
