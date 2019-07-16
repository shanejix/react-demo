import Utils from './Utils';

class TodoMode {
    constructor(key) {
        this.key = key;
        this.todos = Utils.store(key);
        this.onChanges = [];
    }
    //订阅
    subscribe = (onChange) => {
        //onChange回调函数，渲染DOM
        this.onChanges.push(onChange);
    };
    //通知
    inform = () => {
        //存储todos
        Utils.store(this.key, this.todos);
        //通知渲染
        this.onChanges.forEach((cb) => { cb(); });
    };

    addTodo = (title) => {
        this.todos = this.todos.concat({
            id: Utils.uuid(),
            title: title,
            completed: false,
            date:new Date()
        });

        this.inform();
    };

    toggleAll = (checked) => {
        this.todos = this.todos.map((todo) => {
            // return Utils.extend({}, todo, { completed: checked });
            // fixme:bug
            todo.completed = checked;
            return todo
        });

        this.inform();
    };

    toggle = (todoToToggle) => {
        // this.todos = this.todos.map(function (todo) {
		// 	return todo !== todoToToggle ?
		// 		todo :
		// 		Utils.extend({}, todo, {completed: !todo.completed});
        // });

        // fixme:bug over

        this.todos = this.todos.map(todo => {
            if (todo === todoToToggle) {
                console.log(todo);
                todo.completed = !todo.completed;
                console.log(todo)
            }
            return todo;
        })
        this.inform();
    };

    destroy = (todo) => {
        this.todos = this.todos.filter((candidate) => {
            return candidate !== todo;
        });

        this.inform();
    };

    save = (todoToSave, text) => {
        this.todos = this.todos.map((todo) => {
            return todo !== todoToSave ? todo : Utils.extend({}, todo, { title: text });
        });

        this.inform();
    };

    clearCompleted = () => {
        this.todos = this.todos.filter((todo) => {
            return !todo.completed;
        });

        this.inform();
    };
}

export default TodoMode;