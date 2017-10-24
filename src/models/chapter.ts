export class Chapter {
  _id: string
  author: string
  title: string
  body: string
  parent: string
  children: any[]
  _children: any[]
  childrenIds: string[]
  book: string
  tags: string[]
  published: boolean
  isInAltPath: boolean
}
