import { type Question } from '../../enterprise/entities/question'
import { type AnswersRepository } from '../repositories/answers-repository'
import { type QuestionsRepository } from '../repositories/questions-repository'

type SetBestAnswerRequest = {
  authorId: string
  answerId: string
}

type SetBestAnswerResponse = {
  question: Question
}

export class SetBestAnswerUseCase {
  constructor(
    private questionRepository: QuestionsRepository,
    private answerRepository: AnswersRepository,
  ) {}

  async execute({
    authorId,
    answerId,
  }: SetBestAnswerRequest): Promise<SetBestAnswerResponse> {
    const answer = await this.answerRepository.getById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    const question = await this.questionRepository.getById(
      answer.questionId.toString(),
    )

    if (!question) {
      throw new Error('Question not found')
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error('Not authorized.')
    }

    question.bestAnswerId = answer.id

    await this.questionRepository.update(question)

    return { question }
  }
}
