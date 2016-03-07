NewPlayerForm = React.createClass({
  getInitialState: function() {
    return {name: ""}
  },
  render: function() {
    return (
      <form className="u-full-width" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Name" ref="name" className="five columns" onChange={this.handleNameChange} />
        <button type="submit" className="button-primary two columns">Add</button>
      </form>
    )
  },
  handleNameChange: function() {
    this.setState({name: this.refs.name.value})
  },
  handleSubmit: function(e) {
    e.preventDefault();
    _this = this;
    $.post('/players', {player: {name: this.state.name}}, function(data) {
      _this.refs.name.value = "";
      _this.props.addPlayerToApp(data);
    })
  }
})
