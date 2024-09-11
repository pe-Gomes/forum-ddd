import { type AnswersRepository } from '../repositories/answers-repository'

type DeleteAnswerRequest = {
  id: string
  authorId: string
}

export class DeleteAnswerUseCase {
  constructor(private questionRepository: AnswersRepository) {}

  async execute({ id, authorId }: DeleteAnswerRequest) {
    const question = await this.questionRepository.getById(id)

    if (!question) {
      throw new Error('Answer not found')
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error('Not authorized.')
    }

    await this.questionRepository.delete(id)
  }
}
