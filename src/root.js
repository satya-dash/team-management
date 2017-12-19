import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';

import App from './components/App';
import CreateForm from './containers/createform';

const Root = ({ store }) => (
	<Provider store={store}>
		<div className="App">
			<Route exact path="/" component={App}/>
			<Route path="/:id" component={CreateForm}/>
		</div>
	</Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root
