// script/test.js

var Cn = React.createClass({
  render: function() {
    return (
      <div>
        something death like
        <input id="input" onChange={main()} type="text" placeholder="Enter Your Name" />
      </div>
    );
  }
});

var Nav = React.createClass({
  render: function() {
    return (
      <div>
        <table>
          <caption style={{width: '280px'}}>
            <p>table 1. List of HTML elements</p>
          </caption>
          <thead>
            <tr>
              <th>Anything</th>
              <th>Something</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Fuck</td><td>it</td></tr>
            <tr><td>Fucking</td><td>shit</td></tr>
          </tbody>
        </table>
        Hello, world! I am a CommentBox.
        <br />
        <Cn />
       </div>
    );
  }
});

ReactDOM.render(
  <Nav />,
  document.getElementById('a')
);
