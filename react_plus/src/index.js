import React from 'react';
import ReactDOM from 'react-dom';

import App from './TodoApp';
import todoModel from './todoModel';

let model = new todoModel("todoapp");
function render() {
    ReactDOM.render(
        <App model={model} />,
        document.getElementById('root')
    );
}

model.subscribe(render);
render();


