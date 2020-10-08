import React from 'react'
import {AddonPanel, ActionBar} from '@storybook/components'
import {addons, types} from '@storybook/addons'
import {useParameter, useStorybookState, useAddonState} from '@storybook/api'
import {styled} from '@storybook/theming'

const getUrl = (input) => (typeof input === 'string' ? input : input.url)

const Iframe = styled.iframe({
    width: '100%',
    height: '100%',
    border: '0 none',
})

const Img = styled.img({
    width: '100%',
    height: '100%',
    border: '0 none',
    objectFit: 'contain',
})

const Asset = ({url}) => {
    if (!url) return null
    if (url.match(/\.(png|gif|jpeg|tiff|svg|anpg|webp)/))
        return <Img src={url} alt={''} />
    return <Iframe title={url} src={url} />
}

const Content = () => {
    const results = useParameter('assets', []),
        {storyId} = useStorybookState(),
        [selected, setSelected] = useAddonState('my/design-addon', 0)

    if (!results.length) return null

    if (!results[selected]) {
        setSelected(0)
        return null
    }

    const url = getUrl(results[selected]).replace('{id}', storyId),
        actionItems = results.map((i, index) => {
            return {
                title: typeof i === 'string' ? `asset #${index + 1}` : i.name,
                onClick: () => setSelected(index),
            }
        })

    console.log('results ', results, url)

    return (
        <>
            <Asset url={url} />
            <ActionBar actionItems={actionItems} />
        </>
    )
}

addons.register('my/design-addon', () => {
    addons.add('design-addon/panel', {
        title: 'assets',
        type: types.PANEL,
        render: ({active, key}) => (
            <AddonPanel active={active} key={key}>
                <Content />
            </AddonPanel>
        ),
    })
})
