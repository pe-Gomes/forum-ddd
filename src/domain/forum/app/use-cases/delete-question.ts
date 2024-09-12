import { type Either, failure, success } from '@/core/either'
import { type QuestionsRepository } from '../repositories/questions-repository'
import { NotAllowedError, ResourceNotFoundError } from '@/core/errors'

type DeleteQuestionRequest = {
  id: string
  authorId: string
}

type DeleteQuestionResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  object
>

export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    id,
    authorId,
  }: DeleteQuestionRequest): Promise<DeleteQuestionResponse> {
    const question = await this.questionRepository.getById(id)

    if (!question) {
      return failure(new ResourceNotFoundError())
    }

    if (question.authorId.toString() !== authorId) {
      return failure(new NotAllowedError())
    }

    await this.questionRepository.delete(id)

    return success({})
  }
}
