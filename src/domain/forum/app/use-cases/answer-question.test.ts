import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryAnswerRepository } from '@tests/in-memory-repository/answer'
import { AnswerQuestionUseCase } from './answer-question'

let repository: InMemoryAnswerRepository
let useCase: AnswerQuestionUseCase

describe('Answer Question Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryAnswerRepository()
    useCase = new AnswerQuestionUseCase(repository)
  })

  it('should create a answer', async () => {
    const { answer } = await useCase.execute({
      content: 'answer content',
      instructorId: 'instructorId',
      questionId: 'questionId',
    })

    expect(answer.id).toBeDefined()
    expect(answer.content).toEqual('answer content')
    expect(answer.authorId.toString()).toEqual('instructorId')
    expect(answer.questionId.toString()).toEqual('questionId')
    expect(answer.createdAt).toBeDefined()

    expect(repository.answers[0].id).toBe(answer.id)
  })
})
