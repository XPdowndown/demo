import React, { Component } from 'react'
import './index.css'

export default class List extends Component {
  render() {
    const { users, isFirst, isLoading, err } = this.props
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
