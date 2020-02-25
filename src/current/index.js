import React, { Component } from 'react';
import moment from 'moment';
import './index.css';
import startImg from '../../assets/images/start.png';
import pauseImg from '../../assets/images/pause.png';

class Current extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 'open',
      timestamp: moment().unix(Date.now()),
      time: moment().format('YYYY-MM-DD HH:mm:ss'),
    };
    this.tick = this.tick.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleButtonChange = this.handleButtonChange.bind(this);
  }

  // 组件加载后开启时间更新定时任务
  componentDidMount() {
    this.timerID = setInterval(() => {this.tick()}, 1000);
  }
   
  // 清除定时器
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  // 定时更新当前时间任务
  tick() {
    let timestamp = moment().unix(Date.now());
    const time = moment().format('YYYY-MM-DD HH:mm:ss');
    if (this.props.flag === 'ms') {
      timestamp = Date.now();
    }
    this.setState({
      time,
      timestamp,
    });
  }

  // 下拉单位表单改变
  handleSelectChange(event) {
    this.props.handleFlagChange(event.target.value);
    let timestamp = new Date(this.state.time).getTime();
    console.log(timestamp)
    if (event.target.value === 's') {
      timestamp = moment(this.state.time).unix();
    }
    this.setState({timestamp});
  }

  // 启动、暂定按钮触发事件
  handleButtonChange() {
    if (this.state.status === 'open') {
      clearInterval(this.timerID);
      this.setState({status: 'pause'});
    } else {
      this.timerID = setInterval(() => {this.tick()}, 1000);
      this.setState({status: 'open'});
    }
  }

  render() {
    let buttonImg = pauseImg;
    if (this.state.status === 'pause') {
      buttonImg = startImg;
    }
    return (
      <div className="current">
        <p className="time"><span>{this.state.time}</span></p>
        <select value={this.props.flag} onChange={this.handleSelectChange}>
          <option value="s">秒</option>
          <option value="ms">毫秒</option>
        </select>
        <p className="time"><span>{this.state.timestamp}</span></p>
        <div className="start-button">
          <img src={buttonImg} alt="status" onClick={this.handleButtonChange} />
        </div>
      </div>
    )
  }
}

export default Current;