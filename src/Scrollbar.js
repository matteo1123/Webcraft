import React, {Component} from 'react';
import './Scrollbar.css';

class Scrollbar extends Component{
	constructor(props){
		super(props);
		this.scroll = this.scroll.bind(this);
		this.stopScroll = this.stopScroll.bind(this);
	}
	scroll(){
		this.setState({scrolling: window.setInterval(this.props.mouseover, 50, this.props.direction)});
	}
	stopScroll(){
		window.clearInterval(this.state.scrolling);
		
	}
	render(){
		return (
			<div onMouseOut={this.stopScroll} onMouseOver={this.scroll} className={this.props.direction}>
			</div>	
		)
	}
}
export default Scrollbar;