import { useState } from "react"

const History = (props) => {
    if (props.allClicks.length === 0) {
        return (
            <div>
                the app is used by pressing the buttons
            </div>
        )
    }
    return (
        <div>
            button press history: {props.allClicks.join(' ')}
        </div>
    )
}

const Button = ({onClick, text}) => {
    return (
        <button onClick={onClick}>{text}</button>
    )
}

const App = () => {
    const [clicks, setClicks] = useState({left: 0, right: 0})

    const [allClicks, setAllClicks] = useState([])
    const [total, setTotal] = useState(0)
    // const [right, setRight] = useState(0)

    const handleLeftClick = (prop) => () => {
        console.log('hello', prop)
        console.log('Left before', clicks.left)
        const updatedLeft = clicks.left + 1
        setClicks({left: updatedLeft, right: clicks.right})
        console.log('Left after', updatedLeft)
        setAllClicks(allClicks.concat('L'))
        setTotal(updatedLeft + clicks.right)
    }

    const handleRightClick = () => {
        console.log('Right before', clicks.right)
        const updatedRight = clicks.right + 1
        setClicks({left: clicks.left, right: updatedRight})
        setAllClicks(allClicks.concat('R'))
        console.log('Right after', updatedRight)
        setTotal(clicks.left + updatedRight)
    }


    return (
        <div>
            {clicks.left}
            <Button onClick={handleLeftClick('world')} text="left" />
            <Button onClick={handleLeftClick('sam')} text="left" />
            <Button onClick={handleLeftClick('grace')} text="left" />
            <Button onClick={handleRightClick} text="right" />
            {clicks.right}

            <p>{allClicks.join(' ')}</p>
            <p>Total Clicks: {total}</p>

            <History allClicks={allClicks} />
        </div>
    )
}





export default App