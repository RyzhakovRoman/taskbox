import {createStore} from 'redux'
import {STATE} from '../components/Task'

// Действия
export enum ACTIONS {
    ARCHIVE_TASK = 'ARCHIVE_TASK',
    PIN_TASK = 'PIN_TASK',
}

// Создатели действий
export const archiveTask = (id: number) => ({type: ACTIONS.ARCHIVE_TASK, id})
export const pinTask = (id: number) => ({type: ACTIONS.PIN_TASK, id})

function taskStateReducer(taskState: any) {
    return (state: any, action: any) => {
        return {
            ...state,
            tasks: state.tasks.map((task: any) =>
                task.id === action.id ? {...task, state: taskState} : task
            ),
        }
    }
}

export const reducer = (state: any, action: any) => {
    switch (action.type) {
        case ACTIONS.ARCHIVE_TASK:
            return taskStateReducer(STATE.TASK_ARCHIVED)(state, action)
        case ACTIONS.PIN_TASK:
            return taskStateReducer(STATE.TASK_PINNED)(state, action)
        default:
            return state
    }
}

const initTasks = [
    {id: '1', title: 'Something', state: 'TASK_INBOX'},
    {id: '2', title: 'Something more', state: 'TASK_INBOX'},
    {id: '3', title: 'Something else', state: 'TASK_INBOX'},
    {id: '4', title: 'Something again', state: 'TASK_INBOX'},
]

export default createStore(reducer, {tasks: initTasks})
