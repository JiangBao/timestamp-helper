import React, { Component } from 'react';
import Footer from '../footer/index';
import './index.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <h1>时间戳转换助手</h1>
        <Footer />
      </div>
    );
  }
}

export default App;
