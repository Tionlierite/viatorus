import React, {useEffect, useState} from "react";

function App() {
    const [data, setData] = useState(null)

    useEffect(() => {
        fetch('/api')
            .then(response => response.json())
            .then(response => setData(response.message))
    }, [])

    return (
        <>
            {data}
        </>
    )
}

export default App;
