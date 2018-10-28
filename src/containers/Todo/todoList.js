import React, { Component } from 'react';
import Button from '../../components/uielements/button';
import { timeDifference } from '../../helpers/utility';
import { EditableComponent } from '../../components/';
import { TodoListWrapper } from './todo.style';

function filterTodos(todos, search) {
  const selectedTodos =
    search === 'All' ? todos : todos.filter(todo => todo.done === (search === 'Completed'));
  return { selectedTodos };
}

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.singleTodo = this.singleTodo.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      search: 'All',
    };
  }

  singleTodo(todo) {
    const onDelete = () => this.props.remove(todo._id);
    const updateTodo = (key, value) => {
      todo[key] = value;
      todo['body'] = todo.body;
      this.props.update(todo, todo._rev, todo._id);
    };
    return (
      <div className="isoTodoList" key={todo._id}>
        <div className="isoTodoContentWrapper">
          <span className="isoTodoDate">{timeDifference(todo.date)}</span>
          <EditableComponent value={todo.body} itemKey="todo" onChange={updateTodo} />
        </div>
        <Button className="isoTodoDelete" icon="close" type="button" onClick={onDelete} />
      </div>
    );
  }

  onChange(event) {
    this.setState({ search: event.target.value });
  }

  render() {
    const { search } = this.state;
    const { selectedTodos } = filterTodos(this.props.todos.notes, search);
    return (
      <TodoListWrapper className="isoTodoContent">
        <div className="isoTodoListWrapper">
          {selectedTodos.length > 0 ? (
            selectedTodos.map(note => this.singleTodo(note))
          ) : (
            <h3 className="isoNoTodoFound">No todo found</h3>
          )}
        </div>
      </TodoListWrapper>
    );
  }
}
