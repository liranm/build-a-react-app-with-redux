import { getTodos, createTodo } from '../lib/todoServices';
import { showMessage } from './messages';

const initState = {
    todos: [],
    currentTodo: ''
};

const CURRENT_UPDATE = 'CURRENT_UPDATE';
export const TODOS_LOAD = 'TODOS_LOAD';
export const TODO_ADD = 'TODO_ADD';

export const updateCurrent = (val) => ({ type: CURRENT_UPDATE, payload: val });
export const loadTodos = (todos) => ({ type: TODOS_LOAD, payload: todos });
export const addTodo = (todo) => ({ type: TODO_ADD, payload: todo });
export const fetchTodos = () => {
    return (dispatch) => {
        dispatch(showMessage('Loading Todos'));
        getTodos()
            .then(todos => dispatch(loadTodos(todos)));
    };
};
export const saveTodo = (name) => {
    return (dispatch) => {
        dispatch(showMessage('Saving Todo'));
        createTodo(name)
            .then(todo => dispatch(addTodo(todo)));
    };
};

export default (state = initState, action) => {
    switch(action.type) {
        case TODO_ADD:
            return { 
                ...state, 
                todos: state.todos.concat(action.payload),
                currentTodo: ''
            };
        case TODOS_LOAD:
            return {
                ...state,
                todos: action.payload
            };
        case CURRENT_UPDATE:
            return {
                ...state,
                currentTodo: action.payload
            };
        default:
            return state;
    }
};