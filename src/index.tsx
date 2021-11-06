import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';

import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/fonts/fonts.css';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';

import './index.css';
import {Provider} from "react-redux";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import store from './services/store';

ReactDOM.render(
    <React.StrictMode>
        <DndProvider backend={HTML5Backend}>
            <Provider store={store}>
                <App/>
            </Provider>
        </DndProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();