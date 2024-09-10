import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswerRepository } from '../repositories/in-memory/answer'

const answerRepository = new InMemoryAnswerRepository()

test('create asnwer', async () => {
  const useCase = new AnswerQuestionUseCase(answerRepository)

  const answer = await useCase.execute({
    content: 'answer content',
    questionId: 'question id',
    instructorId: 'user id',
  })

  expect(answer.content).toEqual('answer content')
})
