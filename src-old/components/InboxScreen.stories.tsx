import React from 'react'
import {Provider} from 'react-redux'
import {InboxScreen} from './InboxScreen'
import {action} from '@storybook/addon-actions'
import * as TaskListStories from './TaskList.stories'

// Простое мокетирование для редакс хранилища
const store: any = {
    getState: () => {
        return {
            tasks: TaskListStories.Default.args.tasks,
        }
    },
    subscribe: () => 0,
    dispatch: action('dispatch'),
}

export default {
    component: InboxScreen,
    decorators: [(story: any) => <Provider store={store}>{story()}</Provider>],
    title: 'InboxScreen',
}

const Template = (args: any) => <InboxScreen {...args} />

export const Default = Template.bind({})

export const Error: any = Template.bind({})
Error.args = {
    error: 'Something',
}
