import React, { Component } from 'react';
// import Navigation from './Navigation/Navigation';

class App extends Component {
  _renderCategory = () => {
    const pathname = this.props.location.pathname;
    return (
        <h2>
            {pathname}
        </h2>
    );
  };
  render() {
    const { children } = this.props;
    const category = this._renderCategory();
    return (
        <div>
            <div>
                {category}
                {children}
            </div>
        </div>
    );
  }
}

App.propTypes = {
    location: React.PropTypes.object
};

export default App;
