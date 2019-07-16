import React from "react";
import Utils from "./Utils";

const ALL_TODOS = "All";
const ACTIVE_TODOS = "Active";
const COMPLETED_TODOS = "Completed";

export default class TodoFooter extends React.Component {
    render() {
        var activeTodoWord = Utils.pluralize(this.props.count, "item");
        var clearButton = null;

        if (this.props.completedCount > 0) {
            clearButton = (
                <button
                    className="clear-completed"
                    onClick={this.props.onClearCompleted}
                >
                    Clear completed
                </button>
            );
        }

        var nowShowing = this.props.nowShowing;
        return (
            <footer className="footer">
                <span className="todo-count">
                    <strong>{this.props.count}</strong> {activeTodoWord} left
                </span>
                <ul className="filters">
                    <li>
                        <a
                            href="#/"
                            className={
                                nowShowing === ALL_TODOS ? "selected" : ""
                            }
                            onClick ={this.props.filterItem}
                        >
                            All
                        </a>
                    </li>{" "}
                    <li>
                        <a
                            href="#/active"
                            className={
                                nowShowing === ACTIVE_TODOS ? "selected" : ""
                            }
                            onClick ={this.props.filterItem}
                        >
                            Active
                        </a>
                    </li>{" "}
                    <li>
                        <a
                            href="#/completed"
                            className={
                                nowShowing === COMPLETED_TODOS ? "selected" : ""
                            }
                            onClick ={this.props.filterItem}
                        >
                            Completed
                        </a>
                    </li>
                </ul>
                {clearButton}
            </footer>
        );
    }
}
