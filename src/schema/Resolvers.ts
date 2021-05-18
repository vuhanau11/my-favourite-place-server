import { IUser } from '../models/user'
import { STATUS_PLACE } from '../models/place'
import Sequelize from 'sequelize'
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

export const resolvers = {
  Query: {
    async me(_, _args: { id: string }, { user, models }) {
      return await models.User.findByPk(user?.id)
    },
    async getAllUsers(_, _args: IUser, { models }) {
      return models.User.findAll()
    },
    async getDetailUser(_, args: { id: string }, { models }) {
      return models.User.findByPk(args?.id)
    },
    async getPlaceByUser(_, args, { models }) {
      const { userId } = args?.input
      return models.Place.findAll({
        where: {
          userId,
        },
      })
    },
    async getAllPlaces(_, args, { models }) {
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
    async getDetailPlace(_, args: { id: string }, { models }) {
      return models.Place.findByPk(args?.id)
    },
  },

  Mutation: {
    async createPlace(_, args, { models }) {
      const { name, description, longitude, latitude, image, status, userId } =
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
        image,
        status,
        userId,
      })
    },

    async login(_, args: { input: IUser }, { models }) {
      try {
        const { email, firstName, lastName, avatar } = args?.input
        const user = await models?.User?.findOne({ where: { email } })
        if (!user) {
          const newUser = await models.User.create({ email, firstName, lastName, avatar })
          return responseOAuth(newUser)
        }
        return new Promise((resolve, reject) => {
          models.User.update(
            { firstName, lastName, avatar },
            {
              returning: true,
              where: { id: user.id }
            }
          ).then(() => {
            resolve(responseOAuth(user))
          }).catch((error) => {
            reject(error)
          })
        })
      } catch (error) {
        throw new Error(error.message)
      }
    },
  },
}

module.exports = { resolvers }
