import React from 'react';
import ReactDOM from 'react-dom';
import Todo from './todos'

class App extends React.Component{
    constructor(){
        super()
        this.state = {
            input:"",
            todos:[],
            time:new Date(),
            intervalId:""
        }
        this.addToDo = this.addToDo.bind(this)
        this.tick = this.tick.bind(this)
        this.removeToDo = this.removeToDo.bind(this)
    }
    tick(){
        let{ time } = this.state
        time.setSeconds(time.getSeconds()+ 1)
        this.setState({time:time})
    }
    componentDidMount(){
        let id = setInterval(this.tick,1000)
        this.setState({intervalId:id})
    }
    componentWillUnmount(){
        clearInterval(this.state.intervalId)
    }
    addToDo(){
        let { todos,input } = this.state
        todos = todos.concat(input)
        this.setState({todos: todos,input:"" })
    }
    removeToDo(i){
        let{ todos } = this.state
        todos = todos.slice(0,i).concat(todos.slice( i + 1 ))
        this.setState({todos:todos,input:""})
    }
    render(){
        return (
        <div>
          <h1>新しいタスク</h1>
          <input type="text" 
                 onChange= {e => this
                    .setState({input:e.target.value})}
                value={this.state.input}
            />
          <button onClick={this.addToDo}>押す</button>
          <h2>現在の時間</h2>
          <span>今の時間{this.state.time.toLocaleTimeString()}</span>
          <h2>ToDo:</h2>
          <Todo todos={this.state.todos} removeToDo={this.removeToDo} />
        </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("app")
)