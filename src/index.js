import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function ListItem(props) {
  return (
    <div>
      {props.isEdit ? (
        <input defaultValue={props.value} onChange={props.change} />
      ) : (
        <p>{props.value}</p>
      )}
      <button onClick={props.onEdit}>Edit</button>
      <button onClick={props.onClick}>Remove</button>
    </div>
  );
}

function InputForm(props) {
  return (
    <form onSubmit={props.submit}>
      <input type="text" onChange={props.change} />
      <button>Add</button>
    </form>
  );
}

class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: JSON.parse(localStorage.getItem("list")) || [],
      inputValue: ""
    };
  }

  submitItem(event) {
    const newList = this.state.list.slice();
    newList.push({ value: this.state.inputValue, isEdit: false });
    localStorage.setItem("list", JSON.stringify(newList));
    this.setState({
      list: newList
    });
    event.preventDefault();
  }

  removeItem(i) {
    this.state.list.splice(i, 1);
    this.setState({
      list: this.state.list
    });
  }

  editItem(i) {
    const newList = this.state.list.slice();
    newList[i].isEdit = !newList[i].isEdit;
    this.setState({
      list: newList
    });
  }

  handleChange(event) {
    this.setState({
      inputValue: event.target.value
    });
  }

  handleChangeItem(event, i) {
    const newList = this.state.list.slice();
    newList[i].value = event.target.value;
    this.setState({
      list: newList
    });
  }

  render() {
    console.log(localStorage.getItem("list"));
    const currentList = this.state.list;

    const listRender = currentList.map((title, listNum) => {
      return (
        <li key={listNum}>
          <ListItem
            value={title.value}
            isEdit={title.isEdit}
            onClick={() => this.removeItem(listNum)}
            onEdit={() => this.editItem(listNum)}
            change={event => this.handleChangeItem(event, listNum)}
          />
        </li>
      );
    });

    return (
      <div>
        <h1>To-Do App</h1>
        <InputForm
          submit={event => this.submitItem(event)}
          change={event => this.handleChange(event)}
        />
        <ul>{listRender}</ul>
      </div>
    );
  }
}

ReactDOM.render(<ToDo />, document.getElementById("root"));
