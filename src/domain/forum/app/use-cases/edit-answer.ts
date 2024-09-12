import { NotAllowedError, ResourceNotFoundError } from '@/core/errors'
import { type Answer } from '../../enterprise/entities/answer'
import { type AnswersRepository } from '../repositories/answers-repository'
import { type Either, failure, success } from '@/core/either'

type EditAnswerRequest = {
  authorId: string
  answerId: string
  content: string
}

type EditAnswerResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  {
    answer: Answer
  }
>

export class EditAnswerUseCase {
  constructor(private questionRepository: AnswersRepository) {}
  async execute(args: EditAnswerRequest): Promise<EditAnswerResponse> {
    const answer = await this.questionRepository.getById(args.answerId)

    if (!answer) {
      return failure(new ResourceNotFoundError())
    }

    if (answer.authorId.toString() !== args.authorId) {
      return failure(new NotAllowedError())
    }

    answer.content = args.content

    await this.questionRepository.update(answer)

    return success({ answer })
  }
}
