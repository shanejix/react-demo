import React from "react";
import NewTodo from "./NewTodo";
import MainSection from "./MainSection";
import Footer from "./Footer";

const ENTER_KEY = 13;

let todos = [
  {
    id: "1",
    title: "learn ract",
    completed: false,
    date: "2019-09-07T22:01:45Z"
  },
  {
    id: "2",
    title: "learn antd",
    completed: false,
    date: "2019-09-07T22:02:45Z"
  },
  {
    id: "3",
    title: "learn redux",
    completed: true,
    date: "2019-09-07T22:03:45Z"
  }
];

class TodoApp extends React.Component {
  constructor() {
    super();

    this.state = {
      todos: [],
      newTodo: null,
      filter: "All",
      showTodos: []
    };
  }

  completedTodo = id => {
    const todos = this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    this.setState(todos);
  };

  addNewTodo = event => {
    console.log(event);
    if (event.keyCode !== ENTER_KEY) {
      return;
    }
    let val = event.target.value.trim();
    if (val) {
      const newTodo = {
        id: this.state.todos.length + 1,
        title: val,
        completed: false,
        date: new Date()
      };
      this.state.todos.push(newTodo);
      this.setState({
        todos: this.state.todos,
        newTodo: null
      });
    }

    event.target.value = "";
  };

  handleNewTodoChange = event => {
    this.setState({
      newTodo: event.target.value
    });
  };
  toggleAllChange = event => {
    const todos = this.state.todos.map(todo => {
      todo.completed = event.target.checked;
      return todo;
    });
    this.setState({ todos });
    console.log(this.state.todos);
    let arr = this.getShowTodos(this.state.todos, this.state.filter);
    this.changeShowTodos(this.state.filter, arr);
  };
  destroy = id => {
    const todos = this.state.todos.filter(todo => todo.id !== id);
    this.setState({ todos });
  };
  updateTodos = todos => {
    this.setState({ todos });
  };
  getTodos = () => {
    return this.state.todos;
  };
  getShowTodos = (todos, filter) => {
    return todos.filter(todo => {
      switch (filter) {
        case "Completed":
          return todo.completed;
        case "Active":
          return !todo.completed;
        default:
          return true;
      }
    });
  };

  changeShowTodos = (filter, showTodos) => {
    this.setState({
      filter: filter,
      showTodos: showTodos
    });
	};
	
	/**
	 * Fixme:
	 * 
	 * 点击clear completed 只能清除一个item？？？？
	 * 
	 * 场景：
	 * 
	 * B和C组件都有来自A组件state传入的props；
	 * 
	 * B中修改A中的props发现B中的传入的prop没有变化但是C中的传入的Props变了
	 * 
	 * 可能是setState的原因么？
	 * 
	 * 宁外，
	 * 
	 * 将state作为props传入子组件，在子组件处理相应的逻辑（函数）
	 * 
	 * 和在父组件中直接调用state处理相应的逻辑（函数）是————等效的？？
	 * 
	 * 
	 */
	
  clearCompleted = () => {
    let unCompleted = this.state.todos.filter(todo => {
      return !todo.completed;
    });
    this.setState({ todos: unCompleted });

    let arr = this.getShowTodos(this.state.todos, this.state.filter);
    this.changeShowTodos(this.state.filter, arr);
  };

  render() {
    return (
      <div>
        <section className="todoapp">
          <NewTodo
            newTodo={this.state.newTodo}
            addNewTodo={this.addNewTodo}
            handleNewTodoChange={this.handleNewTodoChange}
            getShowTodos={this.getShowTodos}
            filter={this.state.filter}
            todos={this.state.todos}
            changeShowTodos={this.changeShowTodos}
          />
          <MainSection
            todos={this.state.todos}
            completedTodo={this.completedTodo}
            toggleAllChange={this.toggleAllChange}
            destroy={this.destroy}
            showTodos={this.state.showTodos}
            filter={this.state.filter}
            getTodos={this.getTodos}
            getShowTodos={this.getShowTodos}
            changeShowTodos={this.changeShowTodos}
            updateTodos={this.updateTodos}
            clearCompleted={this.clearCompleted}
          />
        </section>
        <Footer />
      </div>
    );
  }
}

export default TodoApp;
