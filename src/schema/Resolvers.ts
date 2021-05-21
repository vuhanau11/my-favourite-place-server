import Sequelize from 'sequelize'
import jsonwebtoken from 'jsonwebtoken'
import { IUser } from '../models/user'
import { STATUS_PLACE, IPlace } from '../models/place'

const op = Sequelize.Op

const responseOAuth = async (user: IUser) => {
  const token = await jsonwebtoken.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )
  return { token, user }
}

export const resolvers = {
  Query: {
    async myData(_, __, context: { user, models }) {
      if (!context.user) {
        throw new Error('Authorization not found')
      }
      return await context.models.User.findByPk(context.user?.id)
    },

    async getAllUsers(_, args: IUser, { models }) {
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
      const allPlaces = await models.Place.findAll({
        limit: pageSize,
        offset: pageSize * (page - 1),
        where: {
          name: { [op.like]: `%${name}%` },
          status: STATUS_PLACE.PUBLIC,
        },
        include: {
          model: models.User,
          required: true,
        },
      })
      return allPlaces.map(async (place: IPlace, index: number) => {
        const userId = place?.User?.dataValues['id']
        const userLikePlace = await models.user_like_place.findAll({
          where: {
            userId: userId
          }
        })

        return Object.assign(
          {},
          {
            id: place.id,
            name: place.name,
            description: place.description,
            longitude: place.longitude,
            latitude: place.latitude,
            status: place.status,
            createdAt: place.createdAt,
            updatedAt: place.updatedAt,
            user: Object.assign(
              {},
              {
                id: userId,
                firstName: place?.User?.dataValues['firstName'],
                lastName: place?.User?.dataValues['lastName'],
                email: place?.User?.dataValues['email'],
                avatar: place?.User?.dataValues['avatar'],
              }
            ),
            user_like_place: userLikePlace.map((item) => {
              return Object.assign(
                {},
                {
                  id: item.dataValues['id'],
                }
              )
            })
          }
        )
      })
    },
    async getDetailPlace(_, args: { id: string }, context: { user, models }) {
      const placeDatail = await context.models.Place.findOne({
        where: { id: args?.id },
        include: {
          model: context?.models?.User,
          required: true,
        },
      })
      return Object.assign(
        {},
        {
          id: placeDatail.id,
          name: placeDatail.name,
          description: placeDatail.description,
          longitude: placeDatail.longitude,
          latitude: placeDatail.latitude,
          status: placeDatail.status,
          user: Object.assign(
            {},
            {
              id: placeDatail?.User?.dataValues['id'],
              firstName: placeDatail?.User?.dataValues['firstName'],
              lastName: placeDatail?.User?.dataValues['lastName'],
              email: placeDatail?.User?.dataValues['email'],
              avatar: placeDatail?.User?.dataValues['avatar'],
            }
          ),
        }
      )
    },
  },

  Mutation: {
    async createPlace(_, args, { user, models }) {
      const { name, description, longitude, latitude, image, status, userId } =
        args?.input

      const countUser = await models.User.count({
        where: { id: userId },
      })
      if (!countUser) {
        throw new Error('user not invalid')
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
          const newUser = await models.User.create({
            email,
            firstName,
            lastName,
            avatar,
          })
          return responseOAuth(newUser)
        }
        await models.User.update(
          { firstName, lastName, avatar },
          {
            returning: true,
            where: { id: user.id },
          }
        )
        return responseOAuth(user)
      } catch (error) {
        throw new Error(error.message)
      }
    },

    async userLike(
      _,
      args: { userId: string; placeId: string },
      { models }
    ) {
      const { userId, placeId } = args
      const checkUser = await models.user_like_place.findOne({
        where: { userId, placeId },
      })
      if (checkUser) {
        return checkUser.destroy()
      }
      return await models.user_like_place.create({ userId, placeId })
    },
  },
}

module.exports = { resolvers }
