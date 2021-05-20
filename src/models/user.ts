export interface IUser {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar: string
  token: string
  createdAt: string
  updatedAt: string
  dataValues: {
    id: string
    firstName: string
    lastName: string
    email: string
    avatar: string
  }
}
