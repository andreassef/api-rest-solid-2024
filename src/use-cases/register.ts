import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

class RegisterUseCase {
  constructor(private usersRepository: any) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const emailAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (emailAlreadyExists) {
      throw new Error('E-mail already exists')
    }

    const passwordHash = await hash(password, 6)

    // const prismaUsersRepository = new PrismaUsersRepository()

    await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash,
    })
  }
}

export { RegisterUseCase }
