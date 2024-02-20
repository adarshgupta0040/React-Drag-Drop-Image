import React from 'react'

export default function sidebar() {
    return (
        <div className='first-2'>
            <Stack justify="space-between">
                <Heading fontSize="3xl" color="gray.800" textAlign="center">
                    Styling Options
                </Heading>

                <div className='input-group'>
                    <label htmlFor="width">Width: </label>
                    <Input
                        type="text"
                        placeholder="Width"
                        value={listStyle.width}
                        onChange={handleWidthChange}
                        mb="2"
                    />
                </div>

                <div className='input-group'>
                    <label htmlFor="width">Padding: </label>
                    <Input
                        type="text"
                        placeholder="Padding"
                        value={listStyle.padding}

                        onChange={handlePaddingChange}
                        mb="2"
                    />
                </div>

                <div className='input-group'>
                    <label htmlFor="width">Align: </label>
                    <select value={listStyle.align} onChange={handleAlignmentChange} mb="2">
                        <option value="start">Left</option>
                        <option value="center">Center</option>
                        <option value="end">Right</option>
                    </select>
                </div>

                <div className='input-group'>
                    <label htmlFor="width">Url: </label>
                    <Input type="url" value={isurl} onChange={handleUrlChange} placeholder="URL" />
                </div>
            </Stack>
        </div>
    )
}
