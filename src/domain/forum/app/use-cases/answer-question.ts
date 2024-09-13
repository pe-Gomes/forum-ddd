import { EntityID } from '@/core/entities/value-objects/entity-id'
import { Answer } from '../../enterprise/entities/answer'
import { type AnswersRepository } from '../repositories/answers-repository'
import { success, type Either } from '@/core/either'

type AnswerQuestionRequest = {
  instructorId: string
  questionId: string
  content: string
  attachmentsIds?: string[]
}

type AnswerQuestionResponse = Either<null, { answer: Answer }>

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionRequest): Promise<AnswerQuestionResponse> {
    const answer = Answer.create({
      content,
      authorId: new EntityID(instructorId),
      questionId: new EntityID(questionId),
    })

    await this.answersRepository.create(answer)

    return success({ answer })
  }
}
