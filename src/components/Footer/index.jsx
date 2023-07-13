import React, { Component } from 'react'
import './index.css'

export default class Footer extends Component {
  // 全选
  handleCheckAll=(e)=>{
    this.props.checkAllTodo(e.target.checked)

  }
  handleClearDone=()=>{
    if(window.confirm('您确定要清除吗？'))
    this.props.clearDoneTodo()

  }
  
  render() {
    const {todos} = this.props
    const total = todos.length
    const countDone = todos.reduce((pre,todo)=> pre + (todo.done?1:0),0)
    return (
       <div className="todo-footer">
        <label>
          <input type="checkbox" checked={total===countDone&&total>0} onChange={this.handleCheckAll} />
        </label>
        <span>
          <span>已完成{countDone}</span> / 全部{total}
        </span>
        <button onClick={this.handleClearDone} className="btn btn-danger">清除已完成任务</button>
      </div>
    )
  }
}
