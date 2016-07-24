import React from 'react';
import {render} from 'react-dom';
import LayerComponent from './components/LayerComponent'
import Header from './components/Header'
import ModuleHome from './components/ModuleHome'

import empData from './mockservice/employees.json'

console.log(empData);
class EmployeeDetail extends LayerComponent {
   constructor(props) {
    	super(props);
    	this.state  ={
    			 data:[],
           selected:{
               empId:"",
               empName:"",
               empType:""
           }
    	};
  };
  componentDidMount(){
     // here we will make a ajax cal and will set the in state, but I am using hard code json.
     var self =this;
     console.log(self,"ggggg");
     setTimeout(function(){
        empData.splice(0,0,{
            empId:"",
            empName:"----Select Employee----",
            empType:""
        })
        self.setState({
          data:empData,
          selected:empData[0]
     })
     },200)
     


  };
  onChange (ev) {
     var value = ev.target.value;
     var selected = this.state.data.find((d,i)=>{
          return d.empId ==value;
     })
     console.log(selected);
     this.setState({
     	selected: selected
     });
  };
  renderLayer(){

     if(!this.state.modal) return null;

       return (<div className="modal-win">

       </div>)
  }
  render () {
     var self = this;
    let el = this.state.data.map((d,i)=>{
          var name = d.empId? d.empName+" ("+d.empId +")": d.empName;
          return <option value={d.empId} onClick={self.onChange}>{name}</option>
    });
    console.log(this.state.selected,"this.state.selected");
    return (<div className="form-item"> 
    			<div style={{display:"inline-block"}}> 
            <label className="item-label">Employee</label> 
            <select onChange={this.onChange.bind(this)}>{el}</select>
          </div>

          <div style={{display:"inline-block"}}>
            <input type="text" value={this.state.selected.empId?this.state.selected.empName:""} />
          </div>

          <div style={{display:"inline-block"}}>
            <input type="text" value={this.state.selected.empId?this.state.selected.empType:""} />
          </div>

    	</div>);
  }
}


class App extends React.Component {
   constructor(props) {
    	super(props);
    	this.state  ={
    			 items:[],
    			 empName:"",
    			 subTotal:0
    	};
  }
  render () {
     var currDate = new Date();
     let invNo = Math.floor((Math.random() * 100000) + 1),
         displayDate = (currDate.getMonth()+1)+"/"+currDate.getDate()+"/"+currDate.getFullYear();

         var tables = this.state.items.map((d,i)=>{
             let clsName = i%2==0?"rv-row even":"rv-row odd";
             return (<div className={clsName}>
             			<div className="rv-cell">Item Number</div>
 						<div className="rv-cell">Item Name</div>
 						<div className="rv-cell">Item Type</div>
 						<div className="rv-cell">Quantity</div>
 						<div className="rv-cell">Selling Price</div>
 						<div className="rv-cell">Discount(%)</div>
 						<div className="rv-cell">Actual Discount</div>
 						<div className="rv-cell">Net Amount</div>
             		</div>)
         })
         if(tables.length<5){
             for(var i=tables.length; i<5;i++){
             	let clsName = i%2==0?"rv-row even":"rv-row odd";
             	tables.push((<div className={clsName}>
             			<div className="rv-cell">&nbsp;</div>
 						<div className="rv-cell">&nbsp;</div>
 						<div className="rv-cell">&nbsp;</div>
 						<div className="rv-cell">&nbsp;</div>
 						<div className="rv-cell">&nbsp;</div>
 						<div className="rv-cell">&nbsp;</div>
 						<div className="rv-cell">&nbsp;</div>
 						<div className="rv-cell">&nbsp;</div>
             		</div>))
             }
         }

    return (<div> 
       		  <Header /> 
       		  <ModuleHome />
       </div>);
  }
}

render(<App/>, document.getElementById('app'));