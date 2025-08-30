import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import About from "./About";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import EditTodo from "./EditTodo";
import NotFound from "./NotFound";

const ReduxTestApp = () => {
  console.log("ReduxTestApp Rendering");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout></Layout>}>
          <Route index element={<Home></Home>}></Route>
          <Route path="about" element={<About></About>}></Route>
          <Route path="todos" element={<TodoList></TodoList>}></Route>
          <Route path="todos/add" element={<AddTodo></AddTodo>}></Route>
          <Route path="todos/edit/:id" element={<EditTodo></EditTodo>}></Route>
          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default ReduxTestApp;
