import React, {Component} from 'react';
import './CommandBar.css';
import worker from './WorkerCommandBar.jpg';
import Building from './BuildingCommandBar.jpg';
var img = Building;
class CommandBar extends Component {

	render(){
		
		if(this.props.selected){
			if(this.props.selected.classList[0] === "Worker"){
				img = worker;
			}else{
				img = Building;
			}
		}
		return (
		<div className="CommandBar">
				<img alt="commandPanel" className="CommandPanel" src={img}/>

		</div>
	  );
 }
}

export default CommandBar;