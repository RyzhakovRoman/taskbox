import * as React from 'react'
import {FC} from 'react'
import Task, {STATE, TaskInfo} from './Task'
import {connect} from 'react-redux'
import {archiveTask, pinTask} from '../lib/redux'

const LoadingRow = () => {
    return (
        <div className={'loading-item'}>
            <span className={'glow-checkbox'} />
            <div className={'glow-text'}>
                <span>Loading</span> <span>cool</span> <span>state</span>
            </div>
        </div>
    )
}

export const TaskList: FC<TaskListProps> = ({
    loading = false,
    tasks,
    onPinTask,
    onArchiveTask,
}) => {
    if (loading)
        return (
            <div className={'list-items'}>
                <LoadingRow />
                <LoadingRow />
                <LoadingRow />
                <LoadingRow />
                <LoadingRow />
                <LoadingRow />
            </div>
        )

    if (tasks.length === 0)
        return (
            <div className={'list-items'}>
                <div className='wrapper-message'>
                    <span className='icon-check' />
                    <div className='title-message'>You have no tasks</div>
                    <div className='subtitle-message'>Sit back and relax</div>
                </div>
            </div>
        )

    const tasksInOrder = [
        ...tasks.filter((t) => t.state === STATE.TASK_PINNED),
        ...tasks.filter((t) => t.state !== STATE.TASK_PINNED),
    ]

    return (
        <div className={'list-items'}>
            {tasksInOrder.map((task) => (
                <Task
                    key={task.id}
                    task={task}
                    onArchiveTask={onArchiveTask}
                    onPinTask={onPinTask}
                />
            ))}
        </div>
    )
}

interface TaskListProps {
    loading?: boolean
    tasks: TaskInfo[]
    onArchiveTask: (id: number) => void
    onPinTask: (id: number) => void
}

const TaskListCont = connect(
    ({tasks}: any) => ({
        tasks: tasks.filter(
            (t: any) =>
                t.state === STATE.TASK_INBOX || t.state === STATE.TASK_PINNED
        ),
    }),
    (dispatch: any) => ({
        onArchiveTask: (id: number) => dispatch(archiveTask(id)),
        onPinTask: (id: number) => dispatch(pinTask(id)),
    })
)(TaskList)

export default TaskListCont
