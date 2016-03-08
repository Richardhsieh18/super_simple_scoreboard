var Scoreboard = React.createClass({
  getInitialState: function() {
    return({players: []})
  },
  componentDidMount: function() {
    this.getPlayers();
    setInterval(this.getPlayers, 10000);
  },
  render: function() {
    return (
      <section>
        <NewPlayerForm addPlayerToApp={this.addPlayerToApp} handleSubmit={this.handleSubmit} scoreboardId={this.props.id}/>
        <PlayerTable players={this.state.players} deletePlayer={this.deletePlayer}/>
      </section>
    )
  },
  getPlayers: function() {
    _this = this;
    $.get('/players', {scoreboard_id: this.props.id}, function(data) {
      _this.setState({players: data})
    });
  },
  addPlayerToApp: function(player) {
    this.setState({players: this.state.players.concat([player])});
  },
  deletePlayer: function(id) {
    _this = this;
    $.ajax({
      url: '/players/' + id,
      type: 'DELETE',
      success: function(result) {
        console.log(result);
        _this.getPlayers();
      }
    })
  }
});
