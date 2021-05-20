export interface IUserLikePlace {
  id: string
  placeId: string
  userId: string
  dataValues: {
    id: string
    firstName: string
    lastName: string
    email: string
    avatar: string
  }
}