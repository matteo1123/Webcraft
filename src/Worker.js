import React, {Component} from 'react';
import './Worker.css';
import pic from './Worker.png';

class Worker extends Component{
	static defaultProps={top:"25px", left: "25px"}
	constructor(props){
		super(props);
		this.state = {moveTo:false};
		this.directClick = this.directClick.bind(this);
		this.moveTo = this.moveTo.bind(this);
		this.setTarget = this.setTarget.bind(this);
		this.moveCommandInterval = false;
		this.clearMoveTo = this.clearMoveTo.bind(this);
	}

	setTarget(id){
		this.moveCommandInterval = setInterval(this.moveTo, 30, document.querySelector("#" + this.props.id), this.props.moveTo.coord);		
	}
	moveTo(target, coord){
		console.log('moveTo');
		this.setState({moveTo: coord});
		let top = Number(target.style.top.slice(0, target.style.top.length -2));
		let left = Number(target.style.left.slice(0, target.style.left.length-2));
		if(top < coord[1]) top += 5;
		if(top > coord[1]) top -=5;
		if(left < coord[0]) left +=5;
		if(left >coord[0]) left  -= 5;
		target.style.top = top + "px";
		target.style.left = left + "px";
		if(Math.abs(top + left - coord[0] - coord[1]) < 30){ 
			this.clearMoveTo();
		}
	}
	clearMoveTo(){
		clearInterval(this.moveCommandInterval);
		this.moveCommandInterval = false;
		this.setState({moveTo: false});		
		
	}
	
	directClick(evt){
		this.props.selected();
		evt.stopPropagation();
		evt.target.parentNode.classList.add("Selected");
	}
	render(){
			if(this.props.moveTo.id){
				if(this.props.moveTo.id.includes(this.props.id)){
					if(this.moveCommandInterval === false){
						this.setTarget(this.props.id);
					}
					if(this.props.moveTo.coord !== this.state.moveTo){
						
						this.clearMoveTo();
						this.setState({moveTo: this.props.moveTo.coord})
					}
				}
			}
		return (
			<div id={this.props.id} onClick = {this.directClick} style={this.props} className='Worker Unit'>
				<img alt="shutup" src= {pic}/>
			</div>	
		)
	}
}

export default Worker;