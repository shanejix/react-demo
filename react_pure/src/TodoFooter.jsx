import React from 'react';
import Utils from './Utils';
const ALL_TODOS = "All";
const ACTIVE_TODOS = "Active";
const COMPLETED_TODOS = "Completed";

export default class TodoFooter extends React.Component{
    render() {
        var activeTodoWord = Utils.pluralize(this.props.count, 'item');
        var clearButton = null;

        if (this.props.completedCount > 0) {
            clearButton = (
                <button
                    className="clear-completed"
                    onClick={this.props.onClearCompleted}>
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
                            onClick ={this.props.filterItem}
                            className={nowShowing === ALL_TODOS? 'selected': '' }
                        >
                            All
                        </a>
                    </li>
                    {' '}
                    <li>
                        <a
                            href="#/active"
                            onClick ={this.props.filterItem}
                            className={nowShowing === ACTIVE_TODOS?'selected':''  }
                        >
                            Active
                        </a>
                    </li>
                    {' '}
                    <li>
                        <a
                            href="#/completed"
                            onClick={this.props.filterItem}
                            className={nowShowing === COMPLETED_TODOS ?'selected':''  }
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