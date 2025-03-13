export const getTokenFromLocalStorage = async () => {
    return new Promise((resolve, _reject) => {
      const tokenLocal = localStorage.getItem("access_token");
      resolve(tokenLocal);
    });
  };
  
  export const setTokenToLocalStorage = (token: string) => {
    try {
      const tokenString = JSON.stringify({ token });
      localStorage.setItem("token", tokenString);
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };
  
  export const clearToken = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Lỗi khi xóa token khỏi localStorage:", error);
    }
  };
  