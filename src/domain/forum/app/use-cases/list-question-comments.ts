import { type QuestionComment } from '../../enterprise/entities/question-comment'
import { type QuestionCommentsRepository } from '../repositories/question-comments-repository'

type ListQuestionCommentsRequest = {
  questionId: string
  page: number
  limit: number
}

type ListQuestionCommentsResponse = {
  comments: QuestionComment[]
}

export class ListQuestionCommentsUseCase {
  constructor(private questionRepository: QuestionCommentsRepository) {}
  async execute({
    questionId,
    page,
    limit,
  }: ListQuestionCommentsRequest): Promise<ListQuestionCommentsResponse> {
    const comments = await this.questionRepository.getManyByQuestionId(
      questionId,
      { page, limit },
    )

    return { comments }
  }
}
