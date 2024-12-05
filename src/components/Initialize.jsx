import {Scheduler} from "../utility/scheduler.js";
import {useState} from "react";


function Initialize({setScheduler}) {
    const [size, setSize] = useState([]);

    const changeInput = (e) => {
        setSize(e.target.value.split(',').map((size) => parseInt(size)).filter((size) => !isNaN(size)));
    }

    const initializeMemory = () => {
        const scheduler = new Scheduler(size);
        setScheduler(scheduler);
    }

    return (
        <div id="initialize-section">
            <div className='card'>
                <h1>Initialize Memory</h1>
                <div className="form">
                    <input type="text" onChange={changeInput}/>
                    <button onClick={initializeMemory}>Initialize Memory</button>
                </div>
            </div>
        </div>
    );
}

export default Initialize;