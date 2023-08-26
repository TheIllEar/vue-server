import Role from '../models/Role.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

class authController {
  async registration(req, res) {
    try {
      const { username, password } = req.body,
        candidate = await User.findOne({ username });

      if (candidate) {
        return res.status(400).json({ message: 'Пользователь с таким именем уже существует' });
      }
      const hashPassword = bcrypt.hashSync(password, 7),
        userRole = await Role.findOne({ value: 'USER' }),
        user = new User({ username, password: hashPassword, roles: [userRole.value] });
      await user.save();
      return res.json({ message: 'Пользователь успешно зарегистрирован' });
    } catch (e) {
      console.error(e);
      res.status(400).json({ message: 'Registration error' });
    }
  }
  async login(req, res) {
    try {
    } catch (e) {
      console.error(e);
      res.status(400).json({ message: 'Login error' });
    }
  }
  async getUsers(req, res) {
    try {
      // Создание ролей
      // const userRole = new Role();
      // const adminRole = new Role({ value: 'ADMIN' });
      // await userRole.save();
      // await adminRole.save();
      res.json('server work');
    } catch (e) {
      console.error(e);
    }
  }
}

export default new authController();
