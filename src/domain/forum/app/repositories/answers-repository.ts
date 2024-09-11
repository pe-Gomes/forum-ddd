import { type Answer } from '../../enterprise/entities/answer'

export interface AnswersRepository {
  create(answer: Answer): Promise<void>

  getById(id: string): Promise<Answer | null>

  delete(id: string): Promise<void>
}
