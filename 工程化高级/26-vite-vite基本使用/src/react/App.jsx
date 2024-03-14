import React, { useState } from 'react'

function AppReact() {
    const [count, setCount] = useState(0)
    return (
        <div className='app'>
            <h2>React 计数器：{count}</h2>
            <button onClick={e => setCount(count + 1)}>+1</button>
        </div>
    )
}

export default AppReact