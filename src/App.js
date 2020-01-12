import React, {Component} from 'react';
import './App.css';
import Pause from './Pause';
import Minimap from './Minimap';
import Building from './Building';
import Worker from './Worker';
import CommandBar from './CommandBar';

class App extends Component {
	constructor(props){
		super(props);
		this.state= {
			paused: false, 
			selectBox:{}, 
			boxPos: []
					}
		
		
		this.paused = this.paused.bind(this);
		this.miniMapClick = this.miniMapClick.bind(this);
		this.selectBox = this.selectBox.bind(this);
		this.resizeBox = this.resizeBox.bind(this);
		this.closeBox = this.closeBox.bind(this);
		this.rightClick = this.rightClick.bind(this);
		this.moveTo = this.moveTo.bind(this);
		
	}

	
	paused(evt){
		if(evt.keyCode ===27){
			if (this.state.paused)this.setState({paused: false});
			else this.setState({paused: true}) ;
		}
	}
	unselectEverythingElse(target){
		let wereSelected = document.querySelectorAll(".Selected");
		[...wereSelected].map((s)=>{
			s.classList.toggle("Selected");
			return 0;
		})
	}
	miniMapClick(x, y) {
		// Minimap gives coordinates 0-20 for x and y		
		let scrollX = x*50 /window.innerWidth * 3500;
		let scrollY = y*40/ window.innerHeight * 1200;
  		window.scrollTo(scrollX, scrollY);
	}
	selectBox(e){
		let selectBox = document.createElement("div");
		selectBox.classList.add("selectBox");
		document.body.appendChild(selectBox);
		let boxPos = [0, 0];
		selectBox.style.display = 'block';
    	selectBox.style.top = e.pageY + 'px';
    	selectBox.style.left = e.pageX + 'px';
    	selectBox.style.width = '0px';
    	selectBox.style.height = '0px';
		boxPos = [e.pageX, e.pageY];
		this.setState({selectBox: selectBox, boxPos: boxPos});
		window.addEventListener('mousemove', this.resizeBox); 

	}
	resizeBox(e) {
		let {boxPos,selectBox} = this.state;
		selectBox.style.top = Math.min(boxPos[1], e.pageY) + 'px';
        selectBox.style.left = Math.min(boxPos[0], e.pageX) + 'px';
        selectBox.style.width = Math.abs(e.pageX - boxPos[0]) + 'px';
        selectBox.style.height = Math.abs(e.pageY - boxPos[1]) + 'px';
		window.addEventListener('mouseup', this.closeBox);
		
		this.setState({selectBox: selectBox});
	}
	closeBox(e){
		let {selectBox} = this.state;
		console.log(selectBox.style.top, selectBox.style.left, selectBox.style.width, selectBox.style.height);
		selectBox.remove();
		window.removeEventListener('mousemove', this.resizeBox);
		window.removeEventListener('mouseup', this.closeBox);
	}
	rightClick(e){
		
		e.preventDefault();
		
		let target = document.querySelector(".Selected");
		if(target.classList.contains("Building")){
			console.log("make set waypoint function!")
		}
		if(target.classList.contains("Worker")){
			this.moveTo(target, e.pageX, e.pageY);
		}
	}
	moveTo(target, x,y){
		console.log(target);
		setInterval((target, x, y) => {
			if(target.style.top < x) target.style.top +=5;
			if(target.style.left < y) target.style.left +=5;
			if(target.style.top > x) target.style.top +=5;
			if(target.style.left > y) target.style.left +=5;
			
		}, 100);
	}

  	componentDidMount(){
    	document.addEventListener("keydown", this.paused, false);
		window.addEventListener('scroll', this.noScroll);
	
  	}
	render(){
		return (
			
			<div 
				draggable="true" 
				className="App" 
				onDragStart={this.selectBox}  
				scroll="no" 
				overflow="hidden"
				 onContextMenu={this.rightClick}
				>
				{this.state.paused && <Pause/>}
				<Building selected = {this.unselectEverythingElse} top="200px" left="150px" />
				<Building selected={this.unselectEverythingElse} top="400px" left="150px" />
				<Worker moveTo={this} selected={this.unselectEverythingElse}/>
				<Minimap click = {this.miniMapClick}/> 
				<CommandBar selected={document.querySelector(".Selected")}/>
	  		</div>
		);
 }
}

export default App;
