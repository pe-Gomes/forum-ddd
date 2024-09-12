import { type Either, failure, success } from '@/core/either'
import { ResourceNotFoundError, NotAllowedError } from '@/core/errors'
import { type Question } from '../../enterprise/entities/question'
import { type QuestionsRepository } from '../repositories/questions-repository'

type EditQuestionRequest = {
  authorId: string
  questionId: string
  title: string
  content: string
}

type EditQuestionResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  {
    question: Question
  }
>

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}
  async execute(args: EditQuestionRequest): Promise<EditQuestionResponse> {
    const question = await this.questionRepository.getById(args.questionId)

    if (!question) {
      return failure(new ResourceNotFoundError())
    }

    if (question.authorId.toString() !== args.authorId) {
      return failure(new NotAllowedError())
    }

    question.title = args.title
    question.content = args.content

    await this.questionRepository.update(question)

    return success({ question })
  }
}
