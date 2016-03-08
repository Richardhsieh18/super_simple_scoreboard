var App = React.createClass({
  getInitialState: function() {
    return {scoreboard: 0}
  },
  render: function() {
    if (!this.state.scoreboard) {
      return (
        <div className="container">
          <h1>Super Simple Scoreboard</h1>

          <p>Welcome to Super Simple Scoreboard!</p>

          <p>A place to keep track of friendly (and not so friendly) competitions.</p>

          <button onClick={this.createScoreboard}>New Scoreboard</button>
        </div>
      )
    } else {
      return <Scoreboard name={this.state.scoreboard.name}
                        description={this.state.scoreboard.description}
                        id={this.state.scoreboard.id} />
    }
  },
  createScoreboard: function() {
    _this = this;
    $.post('/scoreboards', function(data) {
      _this.setState({scoreboard: data});
    });
  }
});
