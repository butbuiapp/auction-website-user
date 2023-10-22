import http from './HttpService';
class UserService {

  login = async ({ email, password }) => {
    try {
      const response = await http.post("/auth/token", { email, password });
      return response.data.access_token;
    } catch (error) {
      throw new Error(error.response.data.detail);
    }
  }

  register = async (payload)=> {
    try {
      const response = await http.post("/users", payload);
      return response.data.access_token;
    } catch (error) {
      throw new Error(error.response.data.detail);
    }
  }

}

const userService = new UserService();
export default userService;