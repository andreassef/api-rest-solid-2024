import { UsersRepositoryInterface } from '@/repositories/usesRepositoryInterface'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

class RegisterUseCase {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const emailAlreadyExists = await this.usersRepository.findByEmail(email)

    if (emailAlreadyExists) {
      throw new Error('E-mail already exists')
    }

    const passwordHash = await hash(password, 6)

    await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash,
    })
  }
}

export { RegisterUseCase }