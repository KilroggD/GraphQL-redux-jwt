import React from 'react'
import TodoList from '../components/TodoList'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { todosAction } from '../actions/todosActions'

class TodoListContainer extends React.Component {

    componentDidMount() {
        const userId = parseInt(this.props.match.params.userId, 10);
        //load todos here
        this.props.loadTodos(userId)
    }

    render() {

        //add loading and failure state
        if (this.props.isLoading) {
            return <span>Loading...</span>
        }

        if (this.props.isFailure) {
            return <span>Error loading todos!</span>
        }

        return (
            <div className="todo">
                {this.props.todos && <TodoList todos={this.props.todos} />}
                <Link className="todo__linkback" to='/'>Back to Users search</Link>
            </div>
        );
    }

}

const mapStateToProps = ({ todos }) => {
    return {
        ...todos
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadTodos: (userId) => {
            dispatch(todosAction({ userId }))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoListContainer);
