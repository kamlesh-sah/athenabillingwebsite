import React from 'react';
import {render} from 'react-dom';
import LayerComponent from './LayerComponent'
import EmployeeDetail from './EmployeeDetail'


var items = [
		{
			itemId:0,
			itemNo:0,
			itemName:"---Select Product----",
			itemType:"grocery",
			price:100
		},{
			itemId:1,
			itemNo:123245,
			itemName:"Product xyz",
			itemType:"grocery",
			price:105
		},{
			itemId:2,
			itemNo:546786,
			itemName:"ABC Mxydb",
			itemType:"Electronics",
			price:300
		},{
			itemId:3,
			itemNo:677899,
			itemName:"MYX otyupkgnd",
			itemType:"Electronics",
			price:140
		},{
			itemId:4,
			itemNo:677899,
			itemName:"MYX otyupkgnd",
			itemType:"Electronics",
			price:140
		},{
			itemId:5,
			itemNo:123245,
			itemName:"Product xyz",
			itemType:"grocery",
			price:1005
		},{
			itemId:6,
			itemNo:123245,
			itemName:"Product xyz",
			itemType:"grocery",
			price:10
		},{
			itemId:7,
			itemNo:123245,
			itemName:"Product xyz",
			itemType:"grocery",
			price:140
		},{
			itemId:8,
			itemNo:123245,
			itemName:"Product xyz",
			itemType:"grocery",
			price:500
		}
]
const GROSS_ITEM_DIS = 5;

function getEmpdiscount(empType, amount){
	let dis = 0;
	if(empType ==="Store Employee")
	    dis = 30;
	else if(empType ==="Store Member") 
	 	dis = 10
	else
		dis = 0;
	return amount*dis/100;
}

export default class ModuleHome extends LayerComponent {
   constructor(props) {
    	super(props);
    	this.state  ={
    			 items:items,
    			 selectedItems:[],
    			 quantity:null,
    			 selectedItem:{},
    			 emp:{}
    	};
  }
  changeQuantity(ev){
     let selectedItem =this.state.selectedItem;
     	selectedItem.quantity = parseInt(ev.target.value);
  		this.setState({
  			quantity: ev.target.value,
  			selectedItem:selectedItem
  		})
  		console.log(this.state.selectedItem);

  }
  onItemChange(ev){
  	 var value = ev.target.value;
     var selected = this.state.items.find((d,i)=>{
          return d.itemId ==value;
     })
     console.log(selected);
     this.setState({
        selectedItem: selected
     });
  }
  addItem(){
  	var item = this.state.selectedItem,
      	selectedItems = this.state.selectedItems;
    if(!this.state.selectedItem.itemId ||   this.state.selectedItem.itemId==0) {  
  		alert("Please select item");
  		return false
  	}
    if(!this.state.quantity) {
    	alert("Please  enter quantity");
    	return false;
    }

  	
  	selectedItems.push(item);
  	this.setState({
    	selectedItems: selectedItems,
    	quantity:0,
    	selectedItem:{
				itemId:0,
				itemNo:0,
				itemName:"---Select Product----",
				itemType:"grocery",
				price:100
			}
 	});
 	this.refs.itemcombo.value=0;
  }
  onEmpchange(emp){
     console.log(this)
      this.setState({
      		emp:emp
      });
  }
  renderLayer(){

     if(!this.state.modal) return null;

       return (<div className="modal-win">

       </div>)
  }
  _renderTable(){
  		var subToal = 0;

       var tables = this.state.selectedItems.map((d,i)=>{
             let clsName = i%2==0?"rv-row even":"rv-row odd",
                 discount = d.itemType ==="grocery"?5:0,
                 totaldiscount = d.price*discount/100,
                 amount = d.price - totaldiscount;
                 subToal += amount;

             return (<div className={clsName}>
             			<div className="rv-cell">{d.itemNo}</div>
 						<div className="rv-cell">{d.itemName}</div>
 						<div className="rv-cell">{d.itemType}</div>
 						<div className="rv-cell">{d.quantity}</div>
 						<div className="rv-cell">{d.price}</div>
 						<div className="rv-cell">{discount===0?"N/A":discount}</div>
 						<div className="rv-cell">{totaldiscount}</div>
 						<div className="rv-cell">{amount}</div>
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
         var empDiscount = getEmpdiscount(this.state.emp.empType, subToal);
         var netAmount = subToal - empDiscount;

       return (
  		<div> 
     		<div style={{position:"relative", borderBottom:"1px solid #dedede", margin:"0 0 10px 0"}}> 
     			<h5>Item Details</h5> 
     			<div style={{position:"absolute", right:20, top:-10}}>
	     			<div style={{display:"inline-block"}}><label>Add Item</label> </div>
	     			<div style={{display:"inline-block"}}>{this._renderItems()}</div>
	     			<div style={{display:"inline-block"}}><input type="text" value={this.state.quantity} onChange={this.changeQuantity.bind(this)}/>
	     				<button onClick={this.addItem.bind(this)}>Add</button>
     				</div>
     			</div>
     		</div>
		     
		    <div>
		        <div className="rv-table">
		        	<div className="rv-table-header">
						<div className="rv-row">
							<div className="rv-cell">Item Number</div>
							<div className="rv-cell">Item Name</div>
							<div className="rv-cell">Item Type</div>
							<div className="rv-cell">Quantity</div>
							<div className="rv-cell">Selling Price</div>
							<div className="rv-cell">Discount(%)</div>
							<div className="rv-cell">Actual Discount</div>
							<div className="rv-cell">Net Amount</div>
						</div>
		        	</div>
		        	<div className="rv-table-container" style={{maxHeight:500, overflow:"auto"}}>
		        		{tables}
		          	</div>
		          	<div className="right">
		  				<div className="form-item"> <label className="item-label">Sub Total</label> <input type="text" value={subToal}/></div>
		  				<div className="form-item"> <label className="item-label">Employee Discount</label> <input type="text" value={empDiscount}/></div>
		  				<div className="form-item"> <label className="item-label">Final Total</label> <input type="text" value={netAmount}/></div>
	  	   			</div>
		        </div>
		    </div>
		</div>
         )
  }
  _renderItems(){
      var self =this,
      	 items = this.state.items.map((d,i)=>{
  			var name = d.itemName;
           return <option key={i} value={d.itemId} onClick={self.onChange}>{name}</option>
  		})
  		return (
  			<select ref="itemcombo" onChange={this.onItemChange.bind(this)}>
  				{items}
  			</select>
  		)
  }
  render () {
     var currDate = new Date();
     let invNo = Math.floor((Math.random() * 100000) + 1),
         displayDate = (currDate.getMonth()+1)+"/"+currDate.getDate()+"/"+currDate.getFullYear();

    return (      		  
	  <section>
	  	<div className="widget">
	  		<div className="widget-header  width-100" style={{position:"relative"}}>
	  		   <h4 className="section-title">Invoice Details</h4>
	  		</div>
	  		<div className="section-content widget-content" >

	  			<div className="form-item"> <label className="item-label">Invoice number</label> <input type="text" value={invNo}/></div>
	  			<div className="form-item"> <label className="item-label">Invoice Date</label> <input type="text" value={displayDate}/></div>
	  			<EmployeeDetail onEmpchange = {this.onEmpchange.bind(this)}/>	     		
	  			{this._renderTable()}
	  		</div>
	  		
	  	</div>
	  </section>
       );
  }

}