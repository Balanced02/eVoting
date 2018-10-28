import React from 'react';
import { Layout } from 'antd';
import Input from '../../components/uielements/input';
// import todoAction from '../../redux/todos/actions.js';
import TodoList from './todoList';
import { TodoWrapper } from './todo.style';

const { Header, Content } = Layout;

export default ({ edit, data, submit, todos, remove, update }) => {
  return (
    <Layout style={{ background: 'none' }}>
      <TodoWrapper className="isomorphicTodoComponent">
        <Header className="isoTodoHeader">
          <Input
            placeholder={'Type here for add a new todo'}
            value={data.body}
            className="isoTodoInput"
            onChange={event => edit(event)}
            onPressEnter={event => submit()}
          />
        </Header>
        <Content className="isoTodoContentBody">
          <TodoList {...this.props} todos={todos} remove={remove} update={update} />
        </Content>
      </TodoWrapper>
    </Layout>
  );
};
