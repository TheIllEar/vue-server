import Role from '../models/Role.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = 'theillear';
const generateAccessToken = (id, name, roles) => {
  const payload = {
    id,
    name,
    roles,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};

class authController {
  async registration(req, res) {
    try {
      const { username, email, password } = req.body,
        candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ error: { message: 'EMAIL_REPEAT' } });
      }
      const hashPassword = bcrypt.hashSync(password, 7),
        userRole = await Role.findOne({ value: 'USER' }),
        user = new User({ username, email, password: hashPassword, roles: [userRole.value] });

      await user.save();

      const token = generateAccessToken(user._id, user.username, user.roles);
      return res.json({ user, token });
    } catch (e) {
      console.error(e);
      res.status(400).json({ error: { message: 'Registration error' } });
    }
  }
  async login(req, res) {
    try {
      const { username, email, password } = req.body,
        user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: { message: `EMAIL_NOT_FOUND` } });
      }

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ error: { message: `INVALID_PASSWORD` } });
      }

      const token = generateAccessToken(user._id, user.username, user.roles);
      res.json({ user, token });
    } catch (e) {
      console.error(e);
      res.status(400).json({ error: { message: 'Login error' } });
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
