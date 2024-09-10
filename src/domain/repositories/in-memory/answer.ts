import { type Answer } from '@/domain/entities/answer'
import { type AnswersRepository } from '../answers-repository'

export class InMemoryAnswerRepository implements AnswersRepository {
  public answers: Answer[] = []

  async create(answer: Answer) {
    await Promise.resolve(this.answers.push(answer))
  }
}
