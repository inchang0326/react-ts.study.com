var Title = function (props) {
  return (
    <div>
      <h2>{props.title}</h2>
    </div>
  );
};

var TodoList = function (props) {
  var todoList = props.todos.map((item, index) => {
    let status = "";
    if (item.done == true) status = "완료";
    else status = "진행중";
    return (
      <li key={item.id}>
        {item.todo} - {status}
      </li>
    );
  });
  return <ul>{todoList}</ul>;
};

const TApp = () => {
  let msg = <h2>Hello, World!</h2>;
  return (
    <>
      <div>
        <h2>{msg}</h2>
      </div>
      <div>
        <h2>{msg}</h2>
      </div>
    </>
  );
};
// function TApp() {
//   var data = {
//     title: "해야 할 일 목록",
//     todos: [
//       { id: 1, todo: "리액트 공부", done: false },
//       { id: 2, todo: "Typescript 정리", done: true },
//       { id: 3, todo: "styled components 학습", done: true },
//       { id: 4, todo: "명상", done: false },
//     ],
//   };
//   return (
//     <div>
//       <Title title={data.title}></Title>
//       <TodoList todos={data.todos}></TodoList>
//     </div>
//   );
// }

export default TApp;
