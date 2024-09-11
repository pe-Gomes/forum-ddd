import { InMemoryAnswerRepository } from '@tests/in-memory-repository/answer'
import { InMemoryQuestionsRepository } from '@tests/in-memory-repository/questions'
import { expect, it, describe, beforeEach } from 'vitest'
import { SetBestAnswerUseCase } from './set-best-answer'
import { createQuestion } from '@tests/factory/question'
import { createAnswer } from '@tests/factory/answer'
import { EntityID } from '@/core/entities/value-objects/entity-id'

let questionRepository: InMemoryQuestionsRepository
let answerRepository: InMemoryAnswerRepository
let sut: SetBestAnswerUseCase

describe('Set Best Answer Use Case', () => {
  beforeEach(() => {
    questionRepository = new InMemoryQuestionsRepository()
    answerRepository = new InMemoryAnswerRepository()
    sut = new SetBestAnswerUseCase(questionRepository, answerRepository)
  })

  it('should set best answer', async () => {
    await questionRepository.create(
      createQuestion(
        {
          authorId: new EntityID('author'),
        },
        new EntityID('question'),
      ),
    )

    await answerRepository.create(
      createAnswer(
        {
          questionId: new EntityID('question'),
        },
        new EntityID('answer-1'),
      ),
    )

    await sut.execute({ answerId: 'answer-1', authorId: 'author' })

    expect(questionRepository.questions[0].bestAnswerId?.toString()).toBe(
      'answer-1',
    )
  })

  it('should throw an error if is not the author of the question', async () => {
    await questionRepository.create(
      createQuestion({}, new EntityID('question')),
    )

    await answerRepository.create(
      createAnswer(
        {
          questionId: new EntityID('question'),
        },
        new EntityID('answer-1'),
      ),
    )

    await expect(
      sut.execute({ answerId: 'answer-1', authorId: 'wrong-id' }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('it should throw an error if answer is not found', async () => {
    await questionRepository.create(createQuestion())

    await expect(
      sut.execute({ answerId: 'answer-1', authorId: 'author' }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('it should throw an error if question is not found', async () => {
    await answerRepository.create(createAnswer({}, new EntityID('answer')))

    await expect(
      sut.execute({ answerId: 'answer', authorId: 'author' }),
    ).rejects.toBeInstanceOf(Error)
  })
})
