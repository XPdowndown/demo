import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import './index.css'

export default class List extends Component {
  state = { //初始化状态
    users: [], //users初始值为数组
    isFirst: true, //是否为第一次打开页面
    isLoading: false,//标识是否处于加载中
    err: '',//存储请求相关的错误信息
  }
  componentDidMount() {
    // 订阅消息接收数据
    this.token = PubSub.subscribe('MY TOPIC', (_, data) => {
      this.setState(data)
    });

  }
  componentWillUnmount() {
    PubSub.unsubscribe(this.token)
  }

  render() {
    const { users, isFirst, isLoading, err } = this.state
    return (
      isFirst ? <h2>欢迎使用，输入关键字，随后点击搜索</h2> :
        isLoading ? <h2>加载中...</h2> :
          err ? <h2 style={{ color: 'red' }}>{err}</h2> :
            <div className="row">
              {users.map(item => {
                return (
                  <div className="card" key={item.id}>
                    <a rel="noreferrer" href={item.html_url} target="_blank">
                      <img alt="head_portrait" src={item.avatar_url} style={{ width: '100px' }} />
                    </a>
                    <p className="card-text">{item.login}</p>
                  </div>
                )
              })}


            </div>
    )
  }
}
