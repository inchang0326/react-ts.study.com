import { Fragment, ReactNode } from "react";

interface BookType {
  key: number;
  name: string;
}

interface ParentProps {
  books: Array<BookType>;
  children: (book: BookType) => ReactNode;
}

export default function Parent(props: ParentProps) {
  return (
    <div>
      {props.books.map((book: BookType) => {
        return <Fragment key={book.key}>{props.children(book)}</Fragment>;
      })}
    </div>
  );
}
