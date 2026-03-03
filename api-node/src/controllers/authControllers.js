import { registerService, loginService } from "../service/authService.js";

export const register = async (request, response, next) => {
  try {
    const user = await registerService(request.body);
    return response.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const login = async (request, response, next) => {
  try {
    const token = await loginService(request.body);
    return response.status(200).json({ token: token });
  } catch (error) {
    next(error);
  }
};
