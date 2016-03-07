var PlayerTable = React.createClass({
  render: function() {
    _this = this;
    var playerRows = this.props.players.map(function(player) {
      return <PlayerRow deletePlayer={_this.props.deletePlayer} player={player} key={player.id} />
    });

    return (
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
    )
  }
})
