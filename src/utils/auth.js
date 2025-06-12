// src/utils/auth.js
export const authorize = (email, password) => {
  return new Promise((resolve) => {
    const name = email.split("@")[0]; // Fallback to email prefix if no prior registration
    resolve({
      token: "fake-token-123",
      user: { name, email, _id: "fake-user-id" },
    });
  });
};

export const checkToken = (token) => {
  return new Promise((resolve) => {
    resolve({
      data: { name: "Aaron", email: "aaron@example.com", _id: "fake-user-id" },
    });
  });
};

export const register = (email, password, username) => {
  return new Promise((resolve) => {
    resolve({
      token: "fake-token-123",
      user: { name: username, email, _id: "fake-user-id" },
    });
  });
};
