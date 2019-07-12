import React from "react";

export default class NewTodo extends React.Component {
  handleKeyDown = e => {
    if (e.keyCode !== 13) {
      return;
    }
    this.props.addNewTodo(e);
    let showTodos = this.props.getShowTodos(
      this.props.todos,
      this.props.filter
    );
    console.log(this.props.filter);
    this.props.changeShowTodos(this.props.filter, showTodos);
  };
  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          autoFocus
          placeholder="What needs to be done?"
          onKeyDown={this.handleKeyDown}
          onChange={this.props.handleNewTodoChange}
          value={this.props.newTodo}
        />
      </header>
    );
  }
}
