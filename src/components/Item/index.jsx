import React, { Component } from 'react'
import './index.css'

export default class Item extends Component {
    
    state={mouse:false} // 鼠标进出的状态改变
    handleMouse=(flag)=>{
        return ()=>{
            this.setState({mouse:flag})
        }
    }
    // 点击多选框的状态改变
    handleCheck=(id)=>{
        return (e)=>{
            this.props.updateTodo(id,e.target.checked)
        }
    }
    //删除一个todo的回调
    handleDelete(id){
        if(window.confirm('您确定要删除吗？'))
        this.props.deleteTodo(id)

    }
  render() {
    const {name,done,id} = this.props
    const {mouse} = this.state
    return (
       <li onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)} style={{backgroundColor:mouse?'#ddd':'white'}} >
          <label>
            <input type="checkbox" checked={done} onChange={this.handleCheck(id)} />
            <span>{name}</span>
          </label>
          <button onClick={()=>{this.handleDelete(id)}} className="btn btn-danger" style={{display:mouse?'block':'none'}}>删除</button>
        </li>

    )
  }
}
