import React, { Component } from 'react';
import Footer from '../footer/index';
import Current from '../current/index';
import Converter from '../converter/index';
import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: 's'
    };
    this.handleFlagChange = this.handleFlagChange.bind(this);
  }
  handleFlagChange(value) {
    this.setState({flag: value});
  }
  render() {
    return (
      <div className="app">
        <h1 className="title">时间戳转换助手</h1>
        <Current flag={this.state.flag} handleFlagChange={this.handleFlagChange} />
        <Converter flag={this.state.flag} />
        <Footer />
      </div>
    );
  }
}

export default App;
