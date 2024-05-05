import { Gym, Prisma } from '@prisma/client'

export interface FindManyGymNearbyParams {
  latitude: number
  longitude: number
}

interface GymRepository {
  findById(id: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
  searchManyByQuery(query: string, page: number): Promise<Gym[]>
  findManyGymsNearby({
    latitude,
    longitude,
  }: FindManyGymNearbyParams): Promise<Gym[]>
}
export { GymRepository }
