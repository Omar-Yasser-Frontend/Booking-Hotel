const AppError = require("../core/AppError");
const BaseService = require("../core/base/baseService");
const AuthRepository = require("../repositories/AuthRepository");

class AuthService extends BaseService {
  constructor() {
    super(new AuthRepository());
  }

  async findUserByEmail(email, password) {
    const user = await this.repo.findOne({ email });

    if (!user) throw new AppError("Invalid email or password", 401);

    if (!(await user.comparePassword(password)))
      throw new AppError("Invalid email or password", 401);

    return user.toObject();
  }
}

module.exports = AuthService;
