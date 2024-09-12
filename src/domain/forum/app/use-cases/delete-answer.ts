import { type Either, failure, success } from '@/core/either'
import { type AnswersRepository } from '../repositories/answers-repository'
import { NotAllowedError, ResourceNotFoundError } from '@/core/errors'

type DeleteAnswerRequest = {
  id: string
  authorId: string
}

type DeleteAnswerResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  object
>

export class DeleteAnswerUseCase {
  constructor(private questionRepository: AnswersRepository) {}

  async execute({
    id,
    authorId,
  }: DeleteAnswerRequest): Promise<DeleteAnswerResponse> {
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
