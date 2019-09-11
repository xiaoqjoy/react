import React from 'react';
import { Link } from 'react-router-dom';
import RenderRoutes from '../../../components/RenderRoutes';
import { connect } from 'react-redux';
import { is } from 'immutable';

import { Modal, Button } from 'antd';

import CacheComponent from '../../../components/CacheComponent';
import { addUser, deleteUser, todoServerAsync } from '../../../actions';

class UserList extends CacheComponent {

    shouldComponentUpdate(nextProps, nextState) {
        const { users, todos } = this.props;
        const { users: nextUsers, todos: nextTodos } = nextProps;
        return !is(users, nextUsers) || !is(todos, nextTodos);
    }

    _handlerAddUser(e) {
        this.props.addUser(Math.floor(Math.random() * 10));
    }

    _handlerDeleteUser(e) {
        const { users } = this.props;
        const Confirm = Modal.confirm;
        const delStr = users.size > 0 ? users.get(0).get('userName') : '';
        Confirm({
            title: '确认删除？',
            content: `您将从数组中删除${delStr}`,
            okText: '确认',
            cancelText: '取消',
            okType: 'danger',
            onOk: () => {
                this.props.deleteUser(delStr);
            }
        });
    }

    _handlerRequest(e) {
        this.props.todoServerAsync({ test: 'test' });
    }

    render() {
        const users = this.props.users;
        const todos = this.props.todos;
        const { path } = this.props.match;
        return (
            <div>
                <div>
                    <Button type="primary" onClick={this._handlerAddUser.bind(this)}>添加</Button>
                    <Button type="danger" onClick={this._handlerDeleteUser.bind(this)}>删除</Button>
                    <Button type="primary" onClick={this._handlerRequest.bind(this)}>异步请求</Button>
                </div>
                <h2>用户列表</h2>
                <ul>
                    {users.map((user, i) => {
                        return <li key={i}><Link to={`${path}/userdetail/${user.get('userName')}`}>{user.get('userName')}</Link></li>
                    })}
                </ul>
                <ul>
                    {todos.map((todo, i) => {
                        return <li key={i}>{todo}</li>
                    })}
                </ul>
                <RenderRoutes parentPath={path} routes={this.props.routes} />
            </div>
        );
    }

}

const mapStateToProps = (state /*, ownProps*/) => {

    return {
        users: state.get('UserApp'),
        todos: state.get('TodoApp'),
    };

};

const mapDispatchToProps = {
    addUser,
    deleteUser,
    todoServerAsync,
};

UserList = connect(mapStateToProps, mapDispatchToProps)(UserList);

export default UserList;