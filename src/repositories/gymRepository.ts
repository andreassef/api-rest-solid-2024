import { Gym, Prisma } from '@prisma/client'

interface GymRepository {
  findById(id: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
  searchManyByQuery(query: string, page: number): Promise<Gym[]>
}
export { GymRepository }
