/* global document */
import React from 'react';
import ReactDOM from 'react-dom';


class LayerComponent extends React.Component {
 
  
  constructor(props, root) {
    super(props);
    this._root = 'body';
  }

  componentDidMount() {
    this._node = document.createElement('div');
    document.querySelector(this._root).appendChild(this._node);
    this._renderLayer();
  }

  componentDidUpdate() {
    this._renderLayer();
  }

  componentWillUnmount() {
    this._node.parentNode.removeChild(this._node);
  }

  _renderLayer() {
   

    ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
        <div className={this.props.layerClassName}>{this.renderLayer()}</div>,
      this._node
    );
  }
}

export default LayerComponent;
