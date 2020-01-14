import React, {Component} from 'react';
import './Worker.css';
import pic from './Worker.png';
import uuid from 'react-uuid';

class Worker extends Component{
	static defaultProps={top:"25px", left: "25px", id:uuid()}
	constructor(props){
		super(props);
		this.directClick = this.directClick.bind(this);
	}
	directClick(evt){
		this.props.selected();
		evt.stopPropagation();
		evt.target.parentNode.classList.add("Selected");
	}
	render(){
		
		return (
			<div id={this.props.id} onClick = {this.directClick} style={this.props}className='Worker Unit'>
				<img alt="shutup" src= {pic}/>
				
			
			
			</div>	
		)
	}
}

export default Worker;