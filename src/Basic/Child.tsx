interface BookType {
  key: number;
  name: string;
}

interface ChildProps {
  book: BookType;
}
export default function Child({ book }: ChildProps) {
  return <div>책 이름: {book.name}</div>;
}
