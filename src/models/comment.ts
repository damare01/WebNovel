import {Author} from './book'

export class Comment {
  _id: string
  author: Author
  posted: Date
  discussion_id: string
  parent_id: string
  text: string
  deleted: boolean
}
