import React, { Component } from 'react';
import moment from 'moment';
import CopyToClipboard from 'react-copy-to-clipboard';
import './index.css';

class Converter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      output: '',
    };
    // this.onCopy = this.onCopy.bind(this);
    // this.onConverter = this.onConverter.bind(this);
    // this.initTextarea = this.initTextarea.bind(this);
    // this.handleTextareaFocus = this.handleTextareaFocus.bind(this);
    // this.handleTextareaChange = this.handleTextareaChange.bind(this);
    // this.handleTextareaBlur = this.handleTextareaBlur.bind(this);
  }
  componentDidMount() {
    this.initTextarea();
  }
  handleTextareaChange = (event) => {
    this.setState({input: event.target.value});
  }
  handleTextareaFocus = () => {
    if (/输入时间或者时间戳/.test(this.state.input)) {
      this.setState({input: '', output: ''});
    }
  }
  handleTextareaBlur = () => {
    if (!this.state.input.length) {
      this.initTextarea();
    }
  }
  initTextarea = () => {
    this.setState({
      input: `\n\n输入时间或者时间戳\n\n2020-01-01 00:00:00\nor\n1582546814`
    });
  }
  // 复制结果成功提示
  onCopy = () => {
    alert('复制成功');
  }
  // 时间转换功能
  onConverter = () => {
    const flag = this.props.flag;
    const input = this.state.input;
    let output;
    if (/^\d{4}-\d{1,2}-\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}$/.test(input)) {
      if (flag === 's') {
        output = moment(new Date(input)).unix();
      } else {
        output = new Date(input).getTime();
      }
    }
    if (/^\d{10}$/.test(input) && (flag === 's')) {
      output = moment(input*1000).format('YYYY-MM-DD HH:mm:ss');
    }
    if (/^\d{13}$/.test(input) && (flag === 'ms')) {
      output = moment(parseInt(input, 10)).format('YYYY-MM-DD HH:mm:ss');
    }
    if (output) {
      this.setState({output});
    } else {
      alert('请输入正确的时间格式')
    }
  }
  render() {
    return (
      <div className="converter">
        <textarea value={this.state.input} onChange={this.handleTextareaChange} onFocus={this.handleTextareaFocus} onBlur={this.handleTextareaBlur} />
        <div className="opt-btn-area">
          <div className="opt-btn opt-btn-converter">
            <button onClick={this.onConverter}>转换</button>
          </div>
          <div className="opt-btn opt-btn-copy">
            <CopyToClipboard text={this.state.output} onCopy={this.onCopy}>
              <button>复制</button>
            </CopyToClipboard>
          </div>
        </div>
        <textarea value={this.state.output} disabled />
      </div>
    )
  }
}

export default Converter;