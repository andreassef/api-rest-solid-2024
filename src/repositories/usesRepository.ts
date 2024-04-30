import { Prisma, User } from '@prisma/client'

interface UsersRepository {
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}
export { UsersRepository }
