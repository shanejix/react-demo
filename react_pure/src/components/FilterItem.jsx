import React from "react";

export default class FilterItem extends React.Component {
  handleClick = e => {
    console.log(e.target.text);
    let filter = e.target.text;
    let showTodos = this.props.getShowTodos(this.props.todos, filter);
    this.props.changeShowTodos(filter, showTodos);
  };
  render() {
    return (
      <footer className="footer">
        <span className="todo-count">
          {this.props.activeCount === 1
            ? "1 item "
            : "" + this.props.activeCount + " items "}
          left
        </span>
        <ul className="filters">
          <li>
            <a
              className={this.props.filter === "All" ? "selected" : ""}
              onClick={this.handleClick}
              href="javasvript:;"
            >
              All
            </a>
          </li>
          <li>
            <a
              className={this.props.filter === "Active" ? "selected" : ""}
              onClick={this.handleClick}
              href="javasccript:;"
            >
              Active
            </a>
          </li>
          <li>
            <a
              className={this.props.filter === "Completed" ? "selected" : ""}
              onClick={this.handleClick}
              href="javacript:;"
            >
              Completed
            </a>
          </li>
        </ul>
        <button
          className="clear-completed"
          onClick={this.props.clearCompleted}
        >
          {/* Clear completed */}
        </button>
      </footer>
    );
  }
}
