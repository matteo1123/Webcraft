import React, {Component} from 'react';
import './App.css';
import Pause from './Pause';
import Minimap from './Minimap';
import Building from './Building';
import Worker from './Worker';
import CommandBar from './CommandBar';
import Scrollbar from './Scrollbar';

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
		this.scroll = this.scroll.bind(this);
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
		console.log(selectBox.style.top,selectBox.style.height, selectBox.style.left, selectBox.style.width);
		[...document.querySelectorAll(".Unit")].map((unit) => {
			console.log(unit.style.top); 
			if(unit.style.top > selectBox.style.top && unit.style.top < selectBox.style.height)unit.classList.add("Selected");
			return 0;
		})
		selectBox.remove();
		window.removeEventListener('mousemove', this.resizeBox);
		window.removeEventListener('mouseup', this.closeBox);
	}
	rightClick(e){
		e.preventDefault();
		if(document.querySelector(".Selected")){
			let target = document.querySelector(".Selected");
			if(target.classList.contains("Building")){
				console.log("make set waypoint function!")
			}
			if(target.classList.contains("Worker")){
				console.log(target);
				this.setState({target: setInterval(this.moveTo ,25, target, e.pageX, e.pageY)});
				
			}
		}
	}
	moveTo(target, x,y){

		let top = Number(target.style.top.slice(0, target.style.top.length -2));
		let left = Number(target.style.left.slice(0, target.style.left.length-2));
		if(top < y) top += 5;
		if(top > y) top -=5;
		if(left < x) left +=5;
		if(left >x) left  -= 5;
		target.style.top = top + "px";
		target.style.left = left + "px";
		if(Math.abs(top + left - x - y) < 30) clearInterval(this.state.target);
	}
	scroll(direction){

		if(direction === "left"){
			window.scrollBy(-20, 0);
		}if(direction === "right"){
			window.scrollBy( 20, 0);
		}if(direction === "up"){
			window.scrollBy(0, -20);
		}if(direction === "down"){
			window.scrollBy(0, +20);
		}
		
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
				<Worker selected={this.unselectEverythingElse} top="145px"/>
				<Worker selected={this.unselectEverythingElse} top="90px"/>
				<Worker selected={this.unselectEverythingElse}/>
				<Minimap click = {this.miniMapClick}/> 
				<CommandBar selected={document.querySelector(".Selected")}/>
				<Scrollbar mouseover={this.scroll} direction="left" />
				<Scrollbar mouseover={this.scroll} direction="right" />
				<Scrollbar mouseover={this.scroll} direction="up" />
				<Scrollbar mouseover={this.scroll} direction="down" />
				
	  		</div>
		);
 }
}

export default App;
