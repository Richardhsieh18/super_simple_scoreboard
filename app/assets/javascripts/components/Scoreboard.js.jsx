var Scoreboard = React.createClass({
  getInitialState: function() {
    return({
              players: [],
              name: "",
              description: "",
              editingName: false,
              editingDescription: false
          });
  },
  componentDidMount: function() {
    this.getPlayers();
    // setInterval(this.getPlayers, 30000);
    this.setState({name: this.props.name});
    this.setState({description: this.props.description});
  },
  render: function() {
    var sortedPlayers = _.sortBy(this.state.players, function(player) {
      return Math.sin(player.score);
    });
    var scoreboardTitle;
    if (this.state.editingName) {
      scoreboardTitle = <form onSubmit={this.saveName}>
                          <input className="edit-title"
                                  type="text"
                                  value={this.state.name}
                                  onChange={this.setName}
                                  ref="name"/>
                          <button type="submit" className="control-button save-button"></button>
                        </form>
    } else {
      scoreboardTitle = <h1 className="editable" onClick={this.editName}>{this.state.name}</h1>
    }

    var scoreboardDescription;
        if (this.state.editingDescription) {
          scoreboardDescription = <form onSubmit={this.saveDescription}>
                                    <input className="edit-description"
                                            type="text"
                                            value={this.state.description}
                                            onChange={this.setDescription}
                                            ref="description"/>
                                    <button type="submit" className="control-button save-button"></button>
                                  </form>
        } else {
          scoreboardDescription = <p className="editable" onClick={this.editDescription}>{this.state.description}</p>
        }

        _this = this;
        var playerRows = this.state.players.map(function(player) {
          return <PlayerRow deletePlayer={_this.deletePlayer} player={player} key={player.id} />
        });

    return (
      <section>
        <div className="columns ten">
          {scoreboardTitle}
          {scoreboardDescription}
        </div>
        <span className="control-button refresh-button" onClick={this.getPlayers}></span>

        <NewPlayerForm addPlayerToApp={this.addPlayerToApp}
                        handleSubmit={this.handleSubmit}
                        scoreboardId={this.props.id}/>

        <table className="u-full-width">
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
              </tr>
          </thead>
          <tbody>
            {playerRows}
          </tbody>
        </table>
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
  },
  editName: function() {
    this.setState({editingName: true});
  },
  setName: function() {
    this.setState({name: this.refs.name.value});
  },
  saveName: function(e) {
    _this = this;
    e.preventDefault();
    $.ajax({
      url: '/scoreboards/' + this.props.id,
      method: 'PUT',
      data: {scoreboard: {name: this.state.name}},
      success: function() {
        console.log('Scoreboard name updated.');
        _this.setState({editingName: false});
      }
    })
  },
  editDescription: function() {
    this.setState({editingDescription: true});
  },
  setDescription: function() {
    this.setState({description: this.refs.description.value});
  },
  saveDescription: function(e) {
    _this = this;
    e.preventDefault();
    $.ajax({
      url: '/scoreboards/' + this.props.id,
      method: 'PUT',
      data: {scoreboard: {description: this.state.description}},
      success: function() {
        console.log('Scoreboard description updated.');
        _this.setState({editingDescription: false});
      }
    })
  }
});
