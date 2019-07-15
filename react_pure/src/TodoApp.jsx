import React from "react";
import Utils from "./Utils";
import TodoItem from "./TodoItem";
import TodoFooter from "./TodoFooter";

const ALL_TODOS = "All";
const ACTIVE_TODOS = "Active";
const COMPLETED_TODOS = "Completed";
const ENTER_KEY = 13;

export default class TodoApp extends React.Component {
    constructor() {
        super();
        this.state = {
            // 所有的list
            todos: [],
            // 筛选标签
            nowShowing: ALL_TODOS,
            // 修改list的内容
            editing: null,
            // 新增的list
            newTodo: ""
        };
    }

    handleChange = event => {
        this.setState({ newTodo: event.target.value });
    };

    handleNewTodoKeyDown = event => {
        if (event.keyCode !== ENTER_KEY) {
            return;
        }

        event.preventDefault();

        var val = this.state.newTodo.trim();

        if (val) {
            let newItem = {
                id: Utils.uuid(),
                title: val,
                completed: false,
                date: new Date()
            };
            this.setState({ todos: [...this.state.todos, newItem] });
            this.setState({ newTodo: "" });
        }
    };

    toggleAll = event => {
        var checked = event.target.checked;
        let todos = this.state.todos.map(function(todo) {
            return Utils.extend({}, todo, { completed: checked });
        });

        this.setState({ todos });
    };

    toggle = todoToToggle => {
        let todos = this.state.todos.map(function(todo) {
            return todo !== todoToToggle
                ? todo
                : Utils.extend({}, todo, { completed: !todo.completed });
        });

        this.setState({ todos });
    };

    destroy = todo => {
        let todos = this.state.todos.filter(candidate => {
            return candidate !== todo;
        });

        this.setState({ todos });
    };

    clearCompleted = () => {
        let todos = this.state.todos.filter(todo => {
            return !todo.completed;
        });

        this.setState({ todos });
    };

    filterItem = e => {
        let filter = e.target.text;
        switch (filter) {
            case ACTIVE_TODOS:
                this.setState({ nowShowing: ACTIVE_TODOS });
                break;
            case COMPLETED_TODOS:
                this.setState({ nowShowing: COMPLETED_TODOS });
                break;
            default:
                this.setState({ nowShowing: ALL_TODOS });
        }
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

    render() {
        let todos = this.state.todos;
        let shownTodos = todos.filter(todo => {
            switch (this.state.nowShowing) {
                case ACTIVE_TODOS:
                    return !todo.completed;
                case COMPLETED_TODOS:
                    return todo.completed;
                default:
                    return true;
            }
        });

        let todoItems = shownTodos.map(todo => {
            return (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={this.toggle.bind(this, todo)}
                    onDestroy={this.destroy.bind(this, todo)}
                    // onEdit={this.edit.bind(this, todo)}
                    // editing={this.state.editing === todo.id}
                    // onSave={this.save.bind(this, todo)}
                    // onCancel={this.cancel}
                />
            );
        });
        let activeTodoCount = todos.reduce((accum, todo) => {
            return todo.completed ? accum : accum + 1;
        }, 0);

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
                        // checked={activeTodoCount === 0}
                    />
                    <label htmlFor="toggle-all" />
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
                            value={this.state.newTodo}
                            onKeyDown={this.handleNewTodoKeyDown}
                            onChange={this.handleChange}
                            autoFocus={true}
                        />
                    </header>
                    {main}
                    {footer}
                </section>
                <footer className="info">
                    <p>
                        Written by
                        <a href="http://shanejix.github.com"> shanejix</a>
                    </p>
                    <p>
                        Power by <a href="http://react.com">React</a>
                    </p>
                </footer>
            </div>
        );

        // return (
        //     <div>
        //         {/* <!-- TodoApp --> */}
        //         <section className="todoapp">
        //             {/* <!-- NewTodo --> */}
        //             <header className="header">
        //                 <h1>todos</h1>
        //                 <input
        //                     className="new-todo"
        //                     placeholder="What needs to be done?"
        //                     autoFocus={true}
        //                 />
        //             </header>
        //             {/* <!-- MainSection --> */}
        //             <section className="main">
        //                 {/* <!-- ToggleAll --> */}
        //                 <input
        //                     id="toggle-all"
        //                     className="toggle-all"
        //                     type="checkbox"
        //                 />
        //                 <label htmlFor="toggle-all">Mark all as complete</label>
        //                 {/* <!-- TodoItem --> */}
        //                 <ul className="todo-list">
        //                     <li data-id="1562937059308" className="completed">
        //                         <div className="view">
        //                             <input className="toggle" type="checkbox" />
        //                             <label>learn React</label>
        //                             <button className="destroy" />
        //                         </div>
        //                     </li>
        //                     <li data-id="1562937059308" className="completed">
        //                         <div className="view">
        //                             <input className="toggle" type="checkbox" />
        //                             <label>subscribe</label>
        //                             <button className="destroy" />
        //                         </div>
        //                     </li>
        //                     <li data-id="1562937059308" className="completed">
        //                         <div className="view">
        //                             <input className="toggle" type="checkbox" />
        //                             <label>inform</label>
        //                             <button className="destroy" />
        //                         </div>
        //                     </li>
        //                 </ul>
        //                 {/* <!-- FilterItem --> */}
        //                 <footer className="footer">
        //                     {/* <!-- active_count --> */}
        //                     <span className="todo-count" />
        //                     <ul className="filters">
        //                         <li>
        //                             <a href="#/" className="selected">
        //                                 All
        //                             </a>
        //                         </li>
        //                         <li>
        //                             <a href="#/active">Active</a>
        //                         </li>
        //                         <li>
        //                             <a href="#/completed">Completed</a>
        //                         </li>
        //                     </ul>
        //                     <button className="clear-completed">
        //                         Clear completed
        //                     </button>
        //                 </footer>
        //             </section>
        //         </section>
        //         {/* <!-- Footer --> */}
        //         <footer className="info">
        //             <p>
        //                 Written by
        //                 <a href="http://shanejix.github.com">shanejix</a>
        //             </p>
        //             <p>
        //                 Power by <a href="http://react.com">React</a>
        //             </p>
        //         </footer>
        //     </div>
        // );
    }
}
