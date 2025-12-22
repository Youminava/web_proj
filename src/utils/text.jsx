import React from 'react'

export const renderWithLineBreaks = (text) => {
    const parts = text.split('\n')
    return parts.map((part, index) => (
        <React.Fragment key={index}>
            {part}
            {index < parts.length - 1 && <br />}
        </React.Fragment>
    ))
}
