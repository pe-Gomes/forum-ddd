import { EntityID } from '@/core/entities/value-objects/entity-id'
import { Answer } from '../entities/answer'
import { type AnswersRepository } from '../repositories/answers-repository'

interface AnswerQuestionRequest {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({ instructorId, questionId, content }: AnswerQuestionRequest) {
    const answer = Answer.create({
      content,
      authorId: new EntityID(instructorId),
      questionId: new EntityID(questionId),
    })

    await this.answersRepository.create(answer)

    return answer
  }
}
