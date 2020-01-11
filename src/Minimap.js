import React, {Component} from 'react';
import './Minimap.css';

class Minimap extends Component {
	constructor(props){
		super(props);
		this.clickMiniMap = this.clickMiniMap.bind(this);
		this.state = {top:"75vh", left:"25vw"}
	}
	clickMiniMap(evt){
		// var x = evt.pageX - this.offsetLeft; 
		// var y = evt.pageY - this.offsetTop; 
		// document.querySelector(".App").offsetLeft);
		
		let boxTop = (evt.clientY/window.innerHeight - .75) * 100 > 20 ? 20 : (evt.clientY/window.innerHeight - .75) * 100 ;
		let boxLeft = evt.clientX/window.innerWidth * 100 - 3> 20 ? 20 :evt.clientX/window.innerWidth * 100 - 3;
		if(boxLeft < 0) boxLeft = 0;
		if(boxTop < 0) boxTop = 0;
		this.setState({top :boxTop + "vh",
					  left: boxLeft + "vw"					  
					  });
		this.props.click(boxLeft, boxTop);
	}
	render(){
		var boxPosition = {
		 	top:this.state.top ,
			left:this.state.left
		};
		return (
		<div onClick={this.clickMiniMap} className="Minimap">
				<div style={boxPosition} className="screenIndicator"></div>

		</div>
	  );
 }
}

export default Minimap;