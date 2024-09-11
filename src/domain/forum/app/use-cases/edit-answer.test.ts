import { describe, it, beforeEach, expect } from 'vitest'
import { EditAnswerUseCase } from './edit-answer'
import { InMemoryAnswerRepository } from '@tests/in-memory-repository/answer'
import { EntityID } from '@/core/entities/value-objects/entity-id'
import { createAnswer } from '@tests/factory/answer'

let answerRepository: InMemoryAnswerRepository
let sut: EditAnswerUseCase

describe('EditAnswer Use Case', () => {
  beforeEach(() => {
    answerRepository = new InMemoryAnswerRepository()
    sut = new EditAnswerUseCase(answerRepository)
  })

  it('should edit a answer an existing question', async () => {
    await answerRepository.create(
      createAnswer(
        {
          authorId: new EntityID('1'),
        },
        new EntityID('2'),
      ),
    )
    await sut.execute({
      content: 'test',
      authorId: '1',
      answerId: '2',
    })

    expect(answerRepository.answers[0]).toMatchObject({
      content: 'test',
    })
  })

  it('should NOT edit a answer of a different author', async () => {
    await answerRepository.create(createAnswer({}, new EntityID('2')))

    await expect(
      sut.execute({
        content: 'test',
        authorId: 'wrong-author-id',
        answerId: '2',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should throw an error if answer not found', async () => {
    await answerRepository.create(createAnswer({}))

    await expect(
      sut.execute({
        content: 'test',
        authorId: 'wrong-author-id',
        answerId: 'wrong-question-id',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
