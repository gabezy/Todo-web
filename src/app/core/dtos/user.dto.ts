export interface UserDTO {
  id: number,
  email: string,
  roles: Role[],
  createdAt: Date
}

export interface CreateUserDTO {
  email: string,
  password: string
}

export interface UpdateUserDTO {
  email: string,
  password: string,
  roles: Role[]
}

interface Role {
  id: number,
  name: string
}
