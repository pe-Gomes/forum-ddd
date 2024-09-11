import { type Answer } from '../../enterprise/entities/answer'
import { type AnswersRepository } from '../repositories/answers-repository'

type EditAnswerRequest = {
  authorId: string
  answerId: string
  content: string
}

type EditAnswerResponse = {
  answer: Answer
}

export class EditAnswerUseCase {
  constructor(private questionRepository: AnswersRepository) {}
  async execute(args: EditAnswerRequest): Promise<EditAnswerResponse> {
    const answer = await this.questionRepository.getById(args.answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    if (answer.authorId.toString() !== args.authorId) {
      throw new Error('Not allowed')
    }

    answer.content = args.content

    await this.questionRepository.update(answer)

    return { answer }
  }
}
