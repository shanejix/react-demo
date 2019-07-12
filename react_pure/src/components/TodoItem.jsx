import React from "react";

export default class TodoItem extends React.Component {
  todoItem = (isCompleted, content) => {
    if (isCompleted) {
      return <label className="todo completed">{content}</label>;
    } else {
      return <label className="todo ">{content}</label>;
    }
  };
  checkBox = isCompleted => {
    return isCompleted ? (
      <input type="checkbox" checked className="taggle" />
    ) : (
      <input type="checkbox" className="tagggle" />
    );
  };

  render() {
    const todo = this.props.todo;
    return (
      <li >
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onClick={() => {
              this.props.completedTodo(todo.id);
            }}
          />

          {this.todoItem(todo.completed, todo.title)}

          <button
            className="destroy"
            onClick={() => {
              // 为啥状态不同步呢？？？
              this.props.destroy(todo.id);
              // console.log(this.props.getTodos());
              let filter = this.props.filter;
              let arr = this.props.todos.filter((ele) => {
                return ele.id !== todo.id;
              })
              let showTodos = this.props.getShowTodos(arr, filter);
              this.props.changeShowTodos(filter, showTodos);
              // console.log(this.props.getTodos());
            }}
          />
        </div>
      </li>
    );
  }
}
