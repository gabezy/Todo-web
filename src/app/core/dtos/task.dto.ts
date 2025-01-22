export interface TaskDTO {
  id: number,
  content: string,
  completed: boolean
}

export interface CreateTaskDTO {
  content: string,
  completed: boolean
}

export interface TaskCompletedDTO {
  completed: boolean
}
