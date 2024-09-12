import { describe, it, beforeEach, expect } from 'vitest'
import { DeleteCommentUseCase } from './delete-comment'
import { InMemoryAnswerCommentRepository } from '@tests/in-memory-repository/answer-comment'
import { InMemoryQuestionCommentRepository } from '@tests/in-memory-repository/question-comment'
import { createQuestionComment } from '@tests/factory/question-comment'
import { createAnswerComment } from '@tests/factory/answer-comment'

let answerCommentRepo: InMemoryAnswerCommentRepository
let questionCommentRepo: InMemoryQuestionCommentRepository
let sut: DeleteCommentUseCase | undefined

describe('Delete Comments Use Case', () => {
  beforeEach(() => {
    answerCommentRepo = new InMemoryAnswerCommentRepository()
    questionCommentRepo = new InMemoryQuestionCommentRepository()
    sut = undefined
  })

  it('should delete a comment from an existing question', async () => {
    sut = new DeleteCommentUseCase(questionCommentRepo)

    const comment = createQuestionComment()

    await questionCommentRepo.create(comment)

    await sut.execute({
      commentId: comment.id.toString(),
      authorId: comment.authorId.toString(),
    })

    expect(questionCommentRepo.comments[0]).toBeUndefined()
  })

  it('should delete a comment from an existing answer', async () => {
    sut = new DeleteCommentUseCase(answerCommentRepo)

    const comment = createAnswerComment()

    await answerCommentRepo.create(comment)

    await sut.execute({
      commentId: comment.id.toString(),
      authorId: comment.authorId.toString(),
    })

    expect(answerCommentRepo.comments[0]).toBeUndefined()
  })

  it('should throw an error if answer comment does not exist', async () => {
    sut = new DeleteCommentUseCase(answerCommentRepo)

    await expect(
      sut.execute({ commentId: 'non-existing-id', authorId: '1' }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should throw an error if question comment does not exist', async () => {
    sut = new DeleteCommentUseCase(questionCommentRepo)

    await expect(
      sut.execute({ commentId: 'non-existing-id', authorId: '1' }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should throw an error if is not the author of the question comment', async () => {
    sut = new DeleteCommentUseCase(questionCommentRepo)
    const comment = createQuestionComment()
    await questionCommentRepo.create(comment)

    await expect(
      sut.execute({ commentId: comment.id.toString(), authorId: 'wrong-id' }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should throw an error if is not the author of the answer comment', async () => {
    sut = new DeleteCommentUseCase(answerCommentRepo)
    const comment = createQuestionComment()
    await questionCommentRepo.create(comment)

    await expect(
      sut.execute({ commentId: comment.id.toString(), authorId: 'wrong-id' }),
    ).rejects.toBeInstanceOf(Error)
  })
})
