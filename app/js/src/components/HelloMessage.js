/** @jsx React.DOM */

var React = require('react');
var DummyText = require('./DummyText');

var HelloMessage = React.createClass({
  getDefaultProps: function() {
    return {
      message: 'Hello World',
      paraCount: 1
    }
  },
  render: function() {
    
    var dummyText = [];
    for (var i = 0; i < this.props.paraCount; i++) {
      dummyText.push(<DummyText key={i}/>);
    };

    return (
      <div className="row">
        <div className="col-xs-12">
          <h1 className="text-center">{this.props.message}</h1>
          {dummyText}
        </div>
      </div>  
    );
  } 

});

module.exports = HelloMessage;