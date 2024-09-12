import { type AnswerComment } from '../../enterprise/entities/answer-comment'
import { type AnswerCommentsRepository } from '../repositories/answer-comments-repository'

type ListAnswerCommentsRequest = {
  answerId: string
  page: number
  limit: number
}

type ListAnswerCommentsResponse = {
  comments: AnswerComment[]
}

export class ListAnswerCommentsUseCase {
  constructor(private answerRepository: AnswerCommentsRepository) {}
  async execute({
    answerId,
    page,
    limit,
  }: ListAnswerCommentsRequest): Promise<ListAnswerCommentsResponse> {
    const comments = await this.answerRepository.getManyByAnswerId(answerId, {
      page,
      limit,
    })

    return { comments }
  }
}
