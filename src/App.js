import React, {Component} from 'react';
import './App.css';
import Pause from './Pause';
import Minimap from './Minimap';
import Building from './Building';
import Worker from './Worker';
import CommandBar from './CommandBar';
import Scrollbar from './Scrollbar';
import uuid from 'react-uuid';
import Fighter from './Fighter';

class App extends Component {
	constructor(props){
		super(props);
		this.state= {
			paused: false, 
			selectBox:{}, 
			boxPos: [],
			moveTo: {}
					}
				
		this.paused = this.paused.bind(this);
		this.miniMapClick = this.miniMapClick.bind(this);
		this.selectBox = this.selectBox.bind(this);
		this.resizeBox = this.resizeBox.bind(this);
		this.closeBox = this.closeBox.bind(this);
		this.rightClick = this.rightClick.bind(this);
		this.scroll = this.scroll.bind(this);
	}

	paused(evt){
		if(evt.keyCode ===27){
			if (this.state.paused)this.setState({paused: false});
			else this.setState({paused: true}) ;
		}
	}
	unselectEverythingElse(target){
		
		[...document.querySelectorAll(".Selected")].map((s)=>{
			s.classList.toggle("Selected");
			return 0;
		})
	}
	miniMapClick(x, y) {
		// Minimap gives coordinates 0-20 for x and y
		// at 350 vw  xMax = 2194 at 350 vh YMax = 1527 (on small monitor)
		let scrollX = x * .05 * 2.5 * window.innerWidth;
		let scrollY = y * .05 * 2.5 * window.innerHeight;
		window.scrollTo(scrollX, scrollY);
	}
	selectBox(e){
		this.unselectEverythingElse(null);
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
		[...document.querySelectorAll(".Unit")].map((unit) => {
			let unitTop = Number(unit.style.top.slice(0, unit.style.top.length-2));
			let unitLeft = Number(unit.style.left.slice(0, unit.style.left.length-2));
			let boxTop = Number(selectBox.style.top.slice(0, selectBox.style.top.length - 2));
			let boxHeight = Number(selectBox.style.height.slice(0, selectBox.style.height.length - 2));
			let boxLeft = Number(selectBox.style.left.slice(0, selectBox.style.left.length - 2));
			let boxWidth = Number(selectBox.style.width.slice(0, selectBox.style.width.length - 2));
		if(unitTop +30 >= boxTop &&
		   unitTop +10 <= boxHeight + boxTop &&
		   unitLeft +30  >= boxLeft &&
		   unitLeft +10 <= boxLeft + boxWidth)
			unit.classList.add("Selected");

			return 0;
		})
		selectBox.remove();
		window.removeEventListener('mousemove', this.resizeBox);
		window.removeEventListener('mouseup', this.closeBox);
	}
	rightClick(e){
		
		e.preventDefault();
		if(document.querySelector(".Selected")){
			let target = document.querySelectorAll(".Selected");
			if(target[0].classList.contains("Building")){
				console.log("make set waypoint function!")
			}
			if(target[0].classList.contains("Unit")){
				let uids = [...target].map((u)=>u.id)
				this.setState({moveTo:{
					id: uids,
					coord:[e.pageX, e.pageY]
				}})
			}
		}
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
		}if(direction === "upleft"){
			window.scrollBy(-20, -20);
		}if(direction === "upright"){
			window.scrollBy( 20, -20);
		}if(direction === "downleft"){
			window.scrollBy(-20, 20);
		}if(direction === "downright"){
			window.scrollBy( 20, 20);
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
				onClick={this.unselectEverythingElse}
				>
				{this.state.paused && <Pause/>}
				<Building selected = {this.unselectEverythingElse} top="200px" left="450px" />
				<Worker id={'p1'} moveTo={this.state.moveTo} selected={this.unselectEverythingElse} top="210px" left="375px"/>
				<Worker id={'p2'} moveTo={this.state.moveTo} selected={this.unselectEverythingElse} top="240px" left="375px"/>
				<Worker id={'p3'} moveTo={this.state.moveTo} selected={this.unselectEverythingElse} top="270px" left="375px"/>
				<Worker id={'p4'} moveTo={this.state.moveTo} selected={this.unselectEverythingElse} top="310px" left="375px"/>
				<Worker id={'p5'} moveTo={this.state.moveTo} selected={this.unselectEverythingElse} top="340px" left="375px"/>
				<Fighter id={"f1"} moveTo={this.state.moveTo} selected={this.unselectEverythingElse} top="340px" left="875px"/>
				
				<Minimap click = {this.miniMapClick}/> 
				<CommandBar selected={document.querySelector(".Selected")}/>
				<Scrollbar mouseover={this.scroll} direction="left" />
				<Scrollbar mouseover={this.scroll} direction="right" />
				<Scrollbar mouseover={this.scroll} direction="up" />
				<Scrollbar mouseover={this.scroll} direction="down" />
				<Scrollbar mouseover={this.scroll} direction="upleft" />
				<Scrollbar mouseover={this.scroll} direction="upright" />
				<Scrollbar mouseover={this.scroll} direction="downleft" />
				<Scrollbar mouseover={this.scroll} direction="downright" />
				
	  		</div>
		);
 }
}

export default App;
