import { IUser } from '../models/user'
import { STATUS_PLACE } from '../models/place'
import Sequelize from 'sequelize'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'

const op = Sequelize.Op

const responseOAuth = (user: IUser) => {
  const token = jsonwebtoken.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )
  return { token, user }
}

const checkHasLogin = (user: IUser) => {
  if (!user) throw new Error('Bạn chưa đăng nhập')
}

export const resolvers = {
  Query: {
    async me(_, _args: { id: string }, { user, models }) {
      checkHasLogin(user)
      return await models.User.findByPk(user?.id)
    },
    async getAllUsers(_, _args: IUser, { user, models }) {
      checkHasLogin(user)
      return models.User.findAll()
    },
    async getDetailUser(_, args: { id: string }, { user, models }) {
      checkHasLogin(user)
      return models.User.findByPk(args?.id)
    },
    async getPlaceByUser(_, args, { user, models }) {
      checkHasLogin(user)
      const { userId } = args?.input
      return models.Place.findAll({
        where: {
          userId,
        },
      })
    },
    async getAllPlaces(_, args, { user, models }) {
      checkHasLogin(user)
      const { name, page, pageSize } = args?.input
      return models.Place.findAll({
        limit: pageSize,
        offset: pageSize * (page - 1),
        where: {
          name: { [op.like]: `%${name}%` },
          status: STATUS_PLACE.PUBLIC,
        },
      })
    },
    async getDetailPlace(_, args: { id: string }, { user, models }) {
      checkHasLogin(user)
      return models.Place.findByPk(args?.id)
    },
  },

  Mutation: {
    async createPlace(_, args, { user, models }) {
      checkHasLogin(user)
      const { name, description, longitude, latitude, status, userId } =
        args?.input

      const countUser = await models.User.count({
        where: { id: userId },
      })
      if (!countUser) {
        throw new Error('Khách hàng không hợp lệ')
      }

      return models.Place.create({
        name,
        description,
        longitude,
        latitude,
        status,
        userId,
      })
    },
    async login(_, args, { models }) {
      try {
        const { email, password } = args?.input
        const user = await models?.User?.findOne({ where: { email } })
        if (!user) {
          const newUser = await models.User.create({
            email,
            password: bcrypt.hashSync(password, 10),
          })
          return responseOAuth(newUser)
        }
        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
          throw new Error('Sai mật khẩu')
        }
        return responseOAuth(user)
      } catch (error) {
        throw new Error(error.message)
      }
    },
  },
}

module.exports = { resolvers }
