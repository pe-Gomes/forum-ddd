import { EntityID } from '@/core/entities/value-objects/entity-id'
import { Question } from '../../enterprise/entities/question'
import { type QuestionsRepository } from '../repositories/questions-repository'

type CreateQuestionRequest = {
  authorId: string
  title: string
  content: string
}

type CreateQuestionResponse = {
  question: Question
}

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    title,
    authorId,
    content,
  }: CreateQuestionRequest): Promise<CreateQuestionResponse> {
    const question = Question.create({
      title,
      content,
      authorId: new EntityID(authorId),
    })

    await this.questionsRepository.create(question)
    return { question }
  }
}
