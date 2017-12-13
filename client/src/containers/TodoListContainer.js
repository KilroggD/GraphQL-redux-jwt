import React from 'react';
import TodoList from '../components/TodoList';
import ApiService from '../ApiService';
import { Link } from 'react-router-dom';

class TodoListContainer extends React.Component {

    componentDidMount() {
        const userId = parseInt(this.props.match.params.userId, 10);
        //load todos here
    }

    render () {
        return (
           <div className="todo">
               <TodoList todos={this.props.todos} />
               <Link className="todo__linkback" to='/'>Back to Users search</Link>
           </div>
        );
    }

}

export default TodoListContainer;


