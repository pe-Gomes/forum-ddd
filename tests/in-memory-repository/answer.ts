import { type Answer } from '@/domain/forum/enterprise/entities/answer'
import { type AnswersRepository } from '@/domain/forum/app/repositories/answers-repository'

export class InMemoryAnswerRepository implements AnswersRepository {
  public answers: Answer[] = []

  async create(answer: Answer) {
    await Promise.resolve(this.answers.push(answer))
  }

  async getById(id: string) {
    return await Promise.resolve(
      this.answers.find((question) => question.id.toString() === id) ?? null,
    )
  }

  async delete(id: string) {
    const questionIdx = this.answers.findIndex(
      (question) => question.id.toString() === id,
    )
    await Promise.resolve(this.answers.splice(questionIdx, 1))
  }
}
