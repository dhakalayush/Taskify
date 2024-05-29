export const isAuthenticated = () => {
    const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
    return token !== null; // Check if the token exists
  };