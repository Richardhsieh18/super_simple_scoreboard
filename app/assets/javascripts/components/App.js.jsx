var App = React.createClass({
  getInitialState: function() {
    return {scoreboardId: 0}
  },
  render: function() {
    if (!this.state.scoreboardId) {
      return (
        <div className="container">
          <h1>Super Simple Scoreboard</h1>

          <p>Welcome to Super Simple Scoreboard!</p>

          <p>A place to keep track of friendly (and not so friendly) competitions.</p>

          <button onClick={this.createScoreboard}>New Scoreboard</button>
        </div>
      )
    } else {
      return <Scoreboard id={this.state.scoreboardId}/>
    }
  },
  createScoreboard: function() {
    _this = this;
    $.post('/scoreboards', function(data) {
      console.log(data.id);
      _this.setState({scoreboardId: data.id});
    });
  }
});
