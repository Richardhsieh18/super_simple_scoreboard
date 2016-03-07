var PlayerRow = React.createClass({
  getInitialState: function() {
    return {
      name: this.props.player.name,
      score: this.props.player.score,
      editing: false
    };
  },
  render: function() {
    if (this.state.editing) {
      return(
        <tr>
          <td>
            <form onSubmit={this.saveName}>
              <input type="text" value={this.state.name} ref="name" onChange={this.handleNameChange} className="edit-name-box" />
              <button type="submit" className="control-button save-button"></button>
            </form>
          </td>
          <td className="score-cell">{this.state.score}</td>
          <td>
            <span onClick={this.upPoint} className="control-button up-button"></span>
            <span onClick={this.downPoint} className="control-button down-button"></span>
          </td>
          <td>
            <span onClick={this.startEditing} className="control-button edit-button"></span>
            <span onClick={this.handleDeleteClick} className="control-button delete-button"></span>
          </td>
        </tr>
      )
      }
      return (
        <tr>
          <td className="name-cell" onClick={this.startEditing}>{this.state.name}</td>
          <td className="score-cell">{this.state.score}</td>
          <td>
            <span onClick={this.upPoint} className="control-button up-button"></span>
            <span onClick={this.downPoint} className="control-button down-button"></span>
          </td>
          <td>
            <span onClick={this.startEditing} className="control-button edit-button"></span>
            <span onClick={this.handleDeleteClick} className="control-button delete-button"></span>
          </td>
        </tr>
    )
  },
  handleDeleteClick: function() {
    this.props.deletePlayer(this.props.player.id);
  },
  upPoint: function() {
    $.ajax({
      url: '/players/' + this.props.player.id,
      method: 'PUT',
      data: {player: {score: this.state.score + 1}}
    });
    this.setState({score: this.state.score + 1 });
  },
  downPoint: function() {
    $.ajax({
      url: '/players/' + this.props.player.id,
      method: 'PUT',
      data: {player: {score: this.state.score - 1}}
    });
    this.setState({score: this.state.score - 1 });
  },
  startEditing: function() {
    this.setState({editing: true});
  },
  handleNameChange: function() {
    this.setState({name: this.refs.name.value})
  },
  saveName: function(e) {
    e.preventDefault();
    $.ajax({
      url: '/players/' + this.props.player.id,
      method: 'PUT',
      data: {player: {name: this.state.name}},
      success: this.setState({editing: false})
    });
  }
});
