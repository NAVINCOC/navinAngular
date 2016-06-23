var TableNav = React.createClass({
  render: function() {
    return (
      <table>
        <thead><tr><th>Game</th><th>Production</th></tr></thead>
        <tbody>
          <tr><td>NFS</td><td>Ghost Creation</td></tr>
          <tr><td>Dota2</td><td>Free to Play</td></tr>
          <tr><td>Dirt Rally</td><td>Unknown Inc.</td></tr>
          <tr><td>Real Steel</td><td>Reliance Game</td></tr>
        </tbody>
      </table>
    );
  }
});

ReactDOM.render(
  <TableNav />,
  document.getElementById('sometable')
);
