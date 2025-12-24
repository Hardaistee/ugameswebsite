'use client'

import Snowfall from 'react-snowfall'

export default function SnowEffect() {
    return (
        <Snowfall
            color="#c8d4d5ff"
            snowflakeCount={100}
            style={{
                position: "fixed",
                width: "100vw",
                height: "100vh",
                pointerEvents: "none",
                zIndex: 9999
            }}
        />
    )
}
