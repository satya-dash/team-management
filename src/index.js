import React from 'react';
import {render} from 'react-dom';
import Root from './root';
import './index.css';
import { createStore } from 'redux';
import reducer from './reducers';
import { BrowserRouter as Router } from 'react-router-dom';

const store = createStore(reducer)
render(
	<Router>
		<Root store={store}/>
	</Router>,
	document.getElementById('root')
);
