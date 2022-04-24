import React from 'react';

class Search extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div data-testid="page-search">
        <div>
          <h1>oi sou child box</h1>
        </div>
      </div>
    );
  }
}

export default Search;
