import React, {Component} from 'react';
import './Building.css';
import pic from './Building.png';


class Building extends Component{
	static defaultProps={top:"25px", left: "25px"}
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
			<div onClick = {this.directClick} style={this.props}className='Building'>
				<img alt="shutup" src= {pic}/>
				
			
			
			</div>	
		)
	}
}

export default Building;