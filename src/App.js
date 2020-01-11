import React, {Component} from 'react';
import './App.css';
import Pause from './Pause';
import Minimap from './Minimap';
import Building from './Building';

class App extends Component {
	constructor(props){
		super(props);
		this.state= {paused: false}
		this.paused = this.paused.bind(this);
		this.miniMapClick = this.miniMapClick.bind(this);
		
	}

	
	paused(evt){
		if(evt.keyCode ===27){
			if (this.state.paused)this.setState({paused: false});
			else this.setState({paused: true}) ;
		}
	}
	miniMapClick(x, y) {
		// Minimap gives coordinates 0-20 for x and y

		console.log("width/x: ", x*50 /window.innerWidth, "height/y: ", y*40/ window.innerHeight);
		
		let scrollX = x*50 /window.innerWidth * 3500;
		let scrollY = y*40/ window.innerHeight * 1200;
  		window.scrollTo(scrollX, scrollY);
	}
  	componentDidMount(){
    	document.addEventListener("keydown", this.paused, false);
		window.addEventListener('scroll', this.noScroll);
	
  	}
	render(){
		return (
			
			<div className="App">
				{this.state.paused && <Pause/>}
				<Building/>
				
				<Minimap click = {this.miniMapClick}/> 
	  		</div>
		);
 }
}

export default App;
