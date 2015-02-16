/** @jsx React.DOM */

var React = require('react');

var HelloMessage = React.createClass({

  render: function() {
    return (
      <h1 className="text-center">Hello React JS</h1>
    );
  }

});

module.exports = HelloMessage;