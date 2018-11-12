import React from 'react';
import {observer, inject} from 'mobx-react';

@inject('newStore') @observer
class New extends React.Component {

	render() {
		return (
			<div>Create new club page</div>
		)
	}
}

export default New
