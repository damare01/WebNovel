export class Book {
  _id: string
  creator: string // author id
  title: string
  startChapter: string // chapter id
  coverImage: string // img url
  language: string // language code
  genre: string[]
  author: Author
  description: string
}

export class Author {
  id: string
  penName: string
}
