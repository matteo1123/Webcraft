import React, {Component} from 'react';
import './Worker.css';
import pic from './Worker.png';


class Worker extends Component{
	static defaultProps={top:"25px", left: "25px"}
	constructor(props){
		super(props);
		this.directClick = this.directClick.bind(this);
	}
	directClick(evt){
		this.props.selected();
		evt.target.parentNode.classList.add("Selected");
	}
	render(){
		
		return (
			<div onClick = {this.directClick} style={this.props}className='Worker'>
				<img alt="shutup" src= {pic}/>
				
			
			
			</div>	
		)
	}
}

export default Worker;