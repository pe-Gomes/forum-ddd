import { type Question } from '@/domain/forum/enterprise/entities/question'
import { type QuestionsRepository } from '@/domain/forum/app/repositories/questions-repository'

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

  async getById(id: string) {
    return await Promise.resolve(
      this.questions.find((question) => question.id.toString() === id) ?? null,
    )
  }

  async delete(id: string) {
    const questionIdx = this.questions.findIndex(
      (question) => question.id.toString() === id,
    )
    await Promise.resolve(this.questions.splice(questionIdx, 1))
  }
}
