import React from 'react';
import {observer, inject} from 'mobx-react';

@inject('checkinStore') @observer
class Checkin extends React.Component {

	render() {
		return (
			<div>Checkin page</div>
		)
	}
}

export default Checkin
