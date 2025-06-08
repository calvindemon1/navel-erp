import { users } from "../data/users";

export function login(username, password) {
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  } else {
    return null;
  }
}

export function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

export function logout() {
  localStorage.removeItem("user");
}
