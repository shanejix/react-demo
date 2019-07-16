import React from "react";
import TodoFooter from "./TodoFooter";
import TodoItem from "./TodoItem";

const ALL_TODOS = "All";
const ACTIVE_TODOS = "Active";
const COMPLETED_TODOS = "Completed";
const ENTER_KEY = 13;

class TodoApp extends React.Component {
    constructor() {
        super();
        this.state = this.getInitialState();
    }
    getInitialState = () => {
        return {
            nowShowing: ALL_TODOS,
            editing: null,
            newTodo: ""
        };
    };

    handleChange = e => {
        this.setState({ newTodo: e.target.value });
    };

    handleNewTodoKeyDown = e => {
        if (e.keyCode !== ENTER_KEY) {
            return;
        }
        e.preventDefault();

        let val = this.state.newTodo.trim();

        if (val) {
            this.props.model.addTodo(val);
            this.setState({ newTodo: "" });
        }
    };
    toggleAll = event => {
        let checked = event.target.checked;
        this.props.model.toggleAll(checked);
    };
    toggle = todoToToggle => {
        this.props.model.toggle(todoToToggle);
    };
    destroy = todo => {
        this.props.model.destroy(todo);
    };
    // edit = todo => {
    //     this.setState({ editing: todo.id });
    // };
    // save = (todoToSave, text) => {
    //     this.props.model.save(todoToSave, text);
    //     this.setState({ editing: null });
    // };
    // cancel = () => {
    //     this.setState({ editing: null });
    // };
    clearCompleted = () => {
        this.props.model.clearCompleted();
    };

    filterItem = (e) => {
        let val = e.target.text;
        this.setState({nowShowing:val})
    }
    render() {
        let todos = this.props.model.todos;
        let showTodos = todos.filter(todo => {
            switch (this.state.nowShowing) {
                case ACTIVE_TODOS:
                    return !todo.completed;
                case COMPLETED_TODOS:
                    return todo.completed;
                default:
                    return true;
            }
        });
        let todoItems = showTodos.map(todo => {
            return (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={this.toggle.bind(this, todo)}
                    onDestroy={this.destroy.bind(this, todo)}
                    // onEdit={todo => {
                    //     this.edit(todo);
                    // }}
                    // editing={todo => {
                    //     this.editing(todo.id);
                    // }}
                    // onSave={todo => {
                    //     this.save(todo);
                    // }}
                    // onCancel={this.cancel}
                />
            );
        });

        let activeTodoCount = todos.reduce((acc, todo) => {
            return todo.completed ? acc : acc+1;
        }, 0);
        console.log(activeTodoCount);
        let completedCount = todos.length - activeTodoCount;

        let footer = null;
        if (activeTodoCount || completedCount) {
            footer = (
                <TodoFooter
                    count={activeTodoCount}
                    completedCount={completedCount}
                    nowShowing={this.state.nowShowing}
                    onClearCompleted={this.clearCompleted}
                    filterItem={this.filterItem}
                />
            );
        }

        let main = null;
        if (todos.length) {
            main = (
                <section className="main">
                    <input
                        id="toggle-all"
                        className="toggle-all"
                        type="checkbox"
                        onChange={this.toggleAll}
                        checked={activeTodoCount === 0}
                    />
                    <label htmlFor="toggle-all">Mark all as complete</label>
                    <ul className="todo-list">{todoItems}</ul>
                </section>
            );
        }
        return (
            <div>
                <section className="todoapp">
                    <header className="header">
                        <h1>todos</h1>
                        <input
                            className="new-todo"
                            placeholder="What needs to be done?"
                            autoFocus={true}
                            value={this.state.newTodo}
                            onKeyDown={this.handleNewTodoKeyDown}
                            onChange={this.handleChange}
                        />
                    </header>

                    {main}
                    {footer}
                </section>
                <footer className="info">
                    <p>
                        Written by{" "}
                        <a href="http://shanjix.github.com"> shanejix</a>
                    </p>
                    <p>
                        Power by <a href="https://github.com/react">react</a>
                    </p>
                </footer>
            </div>
        );
    }
}
export default TodoApp;
