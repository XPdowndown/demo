import React, { Component } from 'react'
import axios from 'axios'
import PubSub from 'pubsub-js'
export default class Search extends Component {
  search = () => {
    //获取用户的输入(连续解构赋值+重命名)
    const { keyWordElement: { value: keyWord } } = this
    //发布消息通知List更新状态
    PubSub.publish('MY TOPIC', { isLoading: true, isFirst: false });
    // axios.get(`/api1/search/users?q=${keyWord}`).then(
    axios.get(`https://api.github.com/search/users?q=${keyWord}`).then(
      res => {
        //发布消息通知List更新状态
        PubSub.publish('MY TOPIC', { isLoading: false, users: res.data.items });
      },
      err => {
        //发布消息通知List更新状态
        PubSub.publish('MY TOPIC', { err: err.message, isLoading: false });
      }
    )
  }

  render() {
    return (
      <section className="jumbotron">
        <h3 className="jumbotron-heading">Search Github Users</h3>
        <div>
          <input ref={c => this.keyWordElement = c} type="text" placeholder="enter the name you search" />&nbsp;<button onClick={this.search}>Search</button>
        </div>
      </section>
    )
  }
}
