import React, {FC} from 'react'

export enum STATE {
    TASK_ARCHIVED = 'TASK_ARCHIVED',
    TASK_INBOX = 'TASK_INBOX',
    TASK_PINNED = 'TASK_PINNED',
}

const Task: FC<TaskProps> = ({
    task: {id, title, state},
    onArchiveTask,
    onPinTask,
}) => {
    return (
        <div className={`list-item ${state}`}>
            <label className={'checkbox'}>
                <input
                    type={'checkbox'}
                    defaultChecked={state === STATE.TASK_ARCHIVED}
                    name={'checked'}
                    disabled
                />
                <span
                    className={'checkbox-custom'}
                    onClick={() => onArchiveTask(id)}
                />
            </label>
            <div className={'title'}>
                <input
                    type={'text'}
                    value={title}
                    placeholder={'Input title'}
                    readOnly
                    style={{textOverflow: 'ellipsis'}}
                />
            </div>

            <div className={'actions'} onClick={(e) => e.stopPropagation()}>
                {state !== STATE.TASK_ARCHIVED && (
                    <a onClick={() => onPinTask(id)}>
                        <span className={`icon-star`} />
                    </a>
                )}
            </div>
        </div>
    )
}

export interface TaskInfo {
    id: number
    title: string
    state: STATE
}

interface TaskProps {
    task: TaskInfo
    onArchiveTask: (id: number) => void
    onPinTask: (id: number) => void
}

export default Task
