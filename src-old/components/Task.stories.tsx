import React from 'react'
import Task, {STATE} from './Task'

export default {
    component: Task,
    title: 'Task'
}

const Template = (args: any) => <Task {...args}/>

export const Default: any = Template.bind({})
Default.args = {
    task: {
        id: 1,
        title: 'Test Task',
        state: STATE.TASK_INBOX,
        updatedAt: new Date(2018, 0, 1, 9, 0)
    }
}

export const Pinned: any = Template.bind({})
Pinned.args = {
    task: {
        ...Default.args.task,
        state: STATE.TASK_PINNED,
    }
}

export const Archived: any = Template.bind({})
Archived.args = {
    task: {
        ...Default.args.task,
        state: STATE.TASK_ARCHIVED
    }
}