import { type AnswersRepository } from '../repositories/answers-repository'
import { type Answer } from '../../enterprise/entities/answer'
import { type PaginationParams } from '@/core/repositories/pagination-params'

type ListRecentAnswersRequest = {
  questionId: string
} & PaginationParams

type ListRecentAnswersResponse = {
  answers: Answer[]
}

export class ListAnswersForQuestionUseCase {
  constructor(private answerRepository: AnswersRepository) {}
  async execute({
    questionId,
    page,
    limit,
  }: ListRecentAnswersRequest): Promise<ListRecentAnswersResponse> {
    const answers = await this.answerRepository.findManyByQuestionId({
      page,
      questionId,
      limit,
    })

    if (answers.length === 0) {
      throw new Error('No answers found')
    }

    return { answers }
  }
}
