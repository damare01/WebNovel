export class Book {
  _id: string;
  creator: string; //author id
  title: string;
  startChapter: string; //chapter id
  coverImage: string; //img url
  chapters: [string]; //chapter ids
  language: string //language code
}
