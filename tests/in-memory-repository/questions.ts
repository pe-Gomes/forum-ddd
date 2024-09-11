import { type Question } from '@/domain/forum/enterprise/entities/question'
import { type QuestionsRepository } from '../questions-repository'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public questions: Question[] = []

  async create(question: Question) {
    await Promise.resolve(this.questions.push(question))
  }

  async getBySlug(slug: string) {
    return await Promise.resolve(
      this.questions.find((question) => question.slug.value === slug) ?? null,
    )
  }
}
