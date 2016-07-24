var Dispatcher = require('flux').Dispatcher;

var AppDispatcher = assign(new Dispatcher(), {

  /**
   * A bridge function between the views and the dispatcher, marking the action
   * as a view action.  Another variant here could be handleServerAction.
   * @param  {object} action The data coming from the view.
   */
  handleViewAction: function(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }
});
//Register to handle all updates
AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.actionType) {
	  case "test":
		   
	    break;
     default:
      return true;
  }

  return true; // No errors.  Needed by promise in Dispatcher.
});
module.exports = AppDispatcher;

