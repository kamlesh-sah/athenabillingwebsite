
import React from 'react';
import {render} from 'react-dom';
import empData from '../mockservice/employees.json'

export default class EmployeeDetail extends React.Component {
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
     this.setState({
      selected: selected
     });
     this.props.onEmpchange(selected)
  };
  
  render () {
     var self = this;
    let el = this.state.data.map((d,i)=>{
          var name = d.empId? d.empName+" ("+d.empId +")": d.empName;
          return <option value={d.empId} onClick={self.onChange}>{name}</option>
    });

    return (<div className="form-item"> 
          <div style={{display:"inline-block"}}> 
            <label className="item-label">Employee</label> 
            <select onChange={this.onChange.bind(this)}>{el}</select>
          </div>

          <div style={{display:"inline-block"}}>
            <input type="text" value={this.state.selected.empId?this.state.selected.empName:""} readOnly={true}/>
          </div>

          <div style={{display:"inline-block"}}>
            <input type="text" value={this.state.selected.empId?this.state.selected.empType:""} readOnly={true}/>
          </div>

      </div>);
  }
}

