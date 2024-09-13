import { type AnswerAttachment } from '../../enterprise/entities/answer-attachment'

export interface AnswerAttachmentsRepository {
  getManyByAnswerId(questionId: string): Promise<AnswerAttachment[]>

  deleteManyByAnswerId(questionId: string): Promise<void>
}
