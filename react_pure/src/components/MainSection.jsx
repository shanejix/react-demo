import React from "react";
import ToggleAll from "./ToggleAll";
import FilterItem from "./FilterItem";
import TodoItem from "./TodoItem";

export default class MainSection extends React.Component {
  todoList = () => {
    return this.props.showTodos.map(todo => {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          todos={this.props.todos}
          completedTodo={this.props.completedTodo}
          handleDestroy
          destroy={this.props.destroy}
          filter={this.props.filter}
          getShowTodos={this.props.getShowTodos}
          changeShowTodos={this.props.changeShowTodos}
          getTodos={this.props.getTodos}
        />
      );
    });
  };
  activeNumber = () => {
    return this.props.todos.filter(todo => {
      return todo.completed === false;
    }).length;
  };
  filterItem = () => {
    if (this.props.todos.length > 0) {
      return (
        <FilterItem
          activeCount={this.activeNumber()}
          getShowTodos={this.props.getShowTodos}
          changeShowTodos={this.props.changeShowTodos}
          todos={this.props.todos}
          destroy={this.props.destroy}
          filter={this.props.filter}
          updateTodos={this.props.updateTodos}
          clearCompleted={this.props.clearCompleted}
        />
      );
    }
  };

  toggleAll = () => {
    if (this.props.todos.length > 0) {
      return <ToggleAll toggleAllChange={this.props.toggleAllChange} />;
    }
  };
  render() {
    return (
      <section className="main">
        {this.toggleAll()}
        <ul className="todo-list">{this.todoList()}</ul>
        {this.filterItem()}
      </section>
    );
  }
}
