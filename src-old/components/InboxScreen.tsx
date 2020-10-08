import React, {FC} from 'react'
import {connect} from 'react-redux'
import TaskListCont from './TaskList'

export const InboxScreen: FC<InboxScreenProps> = ({error}) => {
    if (error)
        return (
            <div className='page lists-show'>
                <div className='wrapper-message'>
                    <span className='icon-face-sad' />
                    <div className='title-message'>Oh no!</div>
                    <div className='subtitle-message'>Something went wrong</div>
                </div>
            </div>
        )

    return (
        <div className='page lists-show'>
            <nav>
                <h1 className='title-page'>
                    <span className='title-wrapper'>Taskbox</span>
                </h1>
            </nav>
            <TaskListCont />
        </div>
    )
}

interface InboxScreenProps {
    error: string
}

const InboxScreenCont = connect(({error}: any) => ({error}))(InboxScreen)

export default InboxScreenCont
