import { IUser } from './user'
import { IUserLikePlace } from './userLikePlace'

export enum STATUS_PLACE {
  'PRIVATE' = 0,
  'PUBLIC' = 1
}

export interface IPlace {
  id: string
  name: string
  description: string
  longitude: number
  latitude: number
  status: number
  User: IUser
  user_like_places: IUserLikePlace
  createdAt: string
  updatedAt: string
}

export const STATUS_NAME = {
  0: 'PRIVATE',
  1: 'PUBLIC'
}