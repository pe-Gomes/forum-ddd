import { type QuestionsRepository } from '../repositories/questions-repository'

type DeleteQuestionRequest = {
  id: string
  authorId: string
}

export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({ id, authorId }: DeleteQuestionRequest) {
    const question = await this.questionRepository.getById(id)

    if (!question) {
      throw new Error('Question not found')
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error('Not authorized.')
    }

    await this.questionRepository.delete(id)
  }
}
