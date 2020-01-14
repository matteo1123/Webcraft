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
		[...document.querySelectorAll(".Selected")].map((s)=>{
			s.classList.toggle("Selected");
			return 0;
		})
	}
	miniMapClick(x, y) {
		// Minimap gives coordinates 0-20 for x and y
		// at 350 vw  xMax = 2194 at 350 vh YMax = 1527
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
		if(unitTop +20 >= boxTop &&
		   unitTop -8 <= boxHeight + boxTop &&
		   unitLeft +20  >= boxLeft &&
		   unitLeft -8 <= boxLeft + boxWidth)
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
				[...target].map((u)=>{
					this.setState({id: false});
					this.setState({id : setInterval(this.moveTo ,25, u, e.pageX, e.pageY)});	
					return 0;
				})
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
		console.log(target.id);
		if(Math.abs(top + left - x - y) < 30) this.setState({id: false});
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
				<Scrollbar mouseover={this.scroll} direction="upleft" />
				<Scrollbar mouseover={this.scroll} direction="upright" />				
				<Scrollbar mouseover={this.scroll} direction="downleft" />
				<Scrollbar mouseover={this.scroll} direction="downright" />
				
	  		</div>
		);
 }
}

export default App;
