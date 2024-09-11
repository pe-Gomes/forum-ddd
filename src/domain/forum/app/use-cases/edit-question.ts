import { type QuestionsRepository } from '../repositories/questions-repository'

type EditQuestionRequest = {
  authorId: string
  questionId: string
  title: string
  content: string
}

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}
  async execute(args: EditQuestionRequest) {
    const question = await this.questionRepository.getById(args.questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    if (question.authorId.toString() !== args.authorId) {
      throw new Error('Not allowed')
    }

    question.title = args.title
    question.content = args.content

    await this.questionRepository.update(question)
  }
}
