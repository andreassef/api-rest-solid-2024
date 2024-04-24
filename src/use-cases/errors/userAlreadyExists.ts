class UserAlreadyExistsError extends Error {
  constructor() {
    super('Email already exists')
  }
}

export { UserAlreadyExistsError }
