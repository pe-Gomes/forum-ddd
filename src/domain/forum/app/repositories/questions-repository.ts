import { type Question } from '../../enterprise/entities/question'

export interface QuestionsRepository {
  create(question: Question): Promise<void>

  getBySlug(slug: string): Promise<Question | null>
  getById(id: string): Promise<Question | null>

  delete(id: string): Promise<void>
}
