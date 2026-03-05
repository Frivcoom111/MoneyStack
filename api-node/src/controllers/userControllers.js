import { updatePasswordService } from "../service/userService.js";

export const updatePassword = async (request, response, next) => {
  try {
    const updatedUser = await updatePasswordService(request.body);
    return response.status(201).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
