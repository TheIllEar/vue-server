import Role from '../models/Role.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = 'theillear';
const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};

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
      const { username, password } = req.body,
        user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: `Пользователь ${username} не найден` });
      }

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: `Неверный пароль` });
      }

      const token = generateAccessToken(user._id, user.roles);
      res.json({ token });
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
      
      // Юзеры
      // const users = await User.find();
      // res.json(users);
    } catch (e) {
      console.error(e);
    }
  }
}

export default new authController();
