import { type Question } from '@/domain/forum/enterprise/entities/question'
import { type QuestionsRepository } from '../questions-repository'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public questions: Question[] = []

  async create(question: Question) {
    await Promise.resolve(this.questions.push(question))
  }
}
