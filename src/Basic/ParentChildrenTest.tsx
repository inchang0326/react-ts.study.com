import Child from "./Child";
import Child2 from "./Child2";
import Parent from "./Parent";
import Parent2 from "./Parent2";

interface BookType {
  key: number;
  name: string;
}

const books: Array<BookType> = [
  { key: 1, name: "one" },
  { key: 2, name: "two" },
];

export default function ParentChildrenTest() {
  return (
    <>
      <Parent books={books}>{(book) => <Child book={book}></Child>}</Parent>
      <Parent2 children={<Child2 />}></Parent2>
    </>
  );
}
