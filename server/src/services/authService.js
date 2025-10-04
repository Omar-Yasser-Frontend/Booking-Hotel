import AppError from "../core/AppError.js";
import BaseService from "../core/base/baseService.js";
import AuthRepository from "../repositories/AuthRepository.js";

class AuthService extends BaseService {
  constructor() {
    super(new AuthRepository());
  }

  async findUserByEmail(email, password) {
    const user = await this.repo.findOne({ email });

    if (!user) throw new AppError("Invalid email or password", 401);

    if (!(await user.comparePassword(password)))
      throw new AppError("Invalid email or password", 401);

    return user;
  }
}

export default AuthService;
