import { type Question } from '../../enterprise/entities/question'
import { type QuestionsRepository } from '../repositories/questions-repository'

type EditQuestionRequest = {
  authorId: string
  questionId: string
  title: string
  content: string
}

type EditQuestionResponse = {
  question: Question
}

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}
  async execute(args: EditQuestionRequest): Promise<EditQuestionResponse> {
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

    return { question }
  }
}
