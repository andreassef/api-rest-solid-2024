import { Prisma, User } from '@prisma/client'

interface UsersRepositoryInterface {
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}
export { UsersRepositoryInterface }
