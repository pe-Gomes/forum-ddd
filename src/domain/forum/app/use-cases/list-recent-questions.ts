import { type PaginationParams } from '@/core/repositories/pagination-params'
import { type QuestionsRepository } from '../repositories/questions-repository'
import { type Question } from '../../enterprise/entities/question'

type ListRecentQuestionsRequest = PaginationParams

type ListRecentQuestionsResponse = {
  questions: Question[]
}

export class ListRecentQuestionsUseCase {
  constructor(private questionRepository: QuestionsRepository) {}
  async execute({
    page,
    limit,
  }: ListRecentQuestionsRequest): Promise<ListRecentQuestionsResponse> {
    const questions = await this.questionRepository.getMany({
      page,
      limit,
    })

    if (questions.length === 0) {
      throw new Error('No questions found')
    }

    return { questions }
  }
}
