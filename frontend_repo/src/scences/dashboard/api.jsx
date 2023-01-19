import React from 'react'

const api = (data) => {
    return (
        <div>
            {data && data.map(d => {
                return (
                <div key = {data}>
                    {data[0].total_spending}<br/>
                </div>)
            })}
    
        </div>
      )
    }

export default api