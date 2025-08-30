import Child from "./Child";
import Parent from "./Parent";

interface BookType {
  key: number;
  name: string;
}

const books: Array<BookType> = [
  { key: 1, name: "one" },
  { key: 2, name: "two" },
];

export default function ParentChildrenTest() {
  return <Parent books={books}>{(book) => <Child book={book}></Child>}</Parent>;
}
