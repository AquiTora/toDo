import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doRequest: ''
    }

    this.handleDoRequestChange = this.handleDoRequestChange.bind(this);
    this.handleDoAdd = this.handleDoAdd.bind(this);
  }
  
  handleDoRequestChange(e) {
    this.setState({
      doRequest: e.target.value
    });
  }

  handleDoAdd(e) {
    this.props.onDoAdd(e.target.value);
  }

  render() {
    return (
      <div>
        <input 
        type='text'
        value={this.state.doRequest}
        onChange={this.handleDoRequestChange}
        placeholder='What to do?'/>
        <button
        value={this.state.doRequest}
        onClick={this.handleDoAdd}>
          add</button>
      </div>
    )
  }
}

class ToDoPart extends React.Component {
  constructor(props) {
    super(props);

    this.handleDoDelete = this.handleDoDelete.bind(this);
  }

  handleDoDelete(e) {
    this.props.onDoDelete(e.target.value)
  }

  render() {
    const toDoListOutput = this.props.doToList.map((element, index) => {
      return (
        <li key={index}>
          {element + ' '}
          <button
          value={index}
          onClick={this.handleDoDelete}>
            delete</button>
        </li>                
      );

    });
    return (
      <div>
        <ul>
          {toDoListOutput}
        </ul>
      </div>
    );
  }
}

class MainPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: [],
      do: []
      }

    this.handleDoAdd = this.handleDoAdd.bind(this);
    this.handleDoDelete = this.handleDoDelete.bind(this);
  }
  
  handleDoAdd(whatNeed) {
    const newList = this.state.do;
    newList.unshift(whatNeed);

    this.setState({
      do: newList
    });
  }
  handleDoDelete(deleteIndex) {
    const buferList = this.state.do;
    const newList = buferList.filter((element, index) => index != deleteIndex);

    this.setState({
      do: newList
    });
  }

  render() {
    console.log(this.state.do);
    return (
      <div>
        <Input do={this.state.do} onDoAdd={this.handleDoAdd}/>
        <ToDoPart onDoDelete={this.handleDoDelete} doToList={this.state.do}/>
      </div>
    );
  }
}

function ToDoListHead(props) {
  return <h1>Todo list using React</h1>;
}

class Main extends React.Component {
  render() {
    return (
      <div>
        <ToDoListHead/>
        <MainPanel/>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main/>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
