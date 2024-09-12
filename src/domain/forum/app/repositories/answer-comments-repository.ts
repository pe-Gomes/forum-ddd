import { type AnswerComment } from '../../enterprise/entities/answer-comment'

export interface AnswerCommentsRepository {
  create(comment: AnswerComment): Promise<void>

  getById(id: string): Promise<AnswerComment | null>

  delete(id: string): Promise<void>
}
