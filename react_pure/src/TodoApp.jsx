import React from "react";

export default class TodoApp extends React.Component {
    render() {
        return (
            <div>
                {/* <!-- TodoApp --> */}
                <section className="todoapp" >
                    {/* <!-- NewTodo --> */}
                    <header className="header">
                        <h1>todos</h1>
                        <input
                            className="new-todo"
                            placeholder="What needs to be done?"
                            autoFocus={true}
                        />
                    </header>
                    {/* <!-- MainSection --> */}
                    <section className="main">
                        {/* <!-- ToggleAll --> */}
                        <input id="toggle-all" className="toggle-all" type="checkbox" />
                        <label htmlFor="toggle-all">Mark all as complete</label>
                        {/* <!-- TodoItem --> */}
                        <ul className="todo-list">
                            <li data-id="1562937059308" className="completed">
                                <div className="view">
                                    <input className="toggle" type="checkbox" />
                                    <label>learn React</label>
                                    <button className="destroy"></button>
                                </div>
                            </li>
                            <li data-id="1562937059308" className="completed">
                                <div className="view">
                                    <input className="toggle" type="checkbox"  />
                                    <label>subscribe</label>
                                    <button className="destroy"></button>
                                </div>
                            </li>
                            <li data-id="1562937059308" className="completed">
                                <div className="view">
                                    <input className="toggle" type="checkbox"  />
                                    <label>inform</label>
                                    <button className="destroy"></button>
                                </div>
                            </li>
                        </ul>
                        {/* <!-- FilterItem --> */}
                        <footer className="footer">
                            {/* <!-- active_count --> */}
                            <span className="todo-count"></span>
                            <ul className="filters">
                                <li>
                                    <a href="#/" className="selected">All</a>
                                </li>
                                <li>
                                    <a href="#/active">Active</a>
                                </li>
                                <li>
                                    <a href="#/completed">Completed</a>
                                </li>
                            </ul>
                            <button className="clear-completed">Clear completed</button>
                        </footer>
                    </section>
                </section>
                {/* <!-- Footer --> */}
                <footer className="info">
                    <p>
                        Written by
                        <a href="http://shanejix.github.com">shanejix</a>
                    </p>
                    <p>
                        Power by <a href="http://react.com">React</a>
                    </p>
                </footer>
            </div>
        );
    }
}
