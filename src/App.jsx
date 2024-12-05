import {useEffect, useState} from "react";
import {Scheduler} from "./utility/scheduler.js";
import Initialize from "./components/Initialize.jsx";
import TopSection from "./components/TopSection.jsx";
import LiveStatus from "./components/LiveStatus.jsx";


function App() {
    const [scheduler, setScheduler] = useState(null);

    const initializeMemory = () => {

        const scheduler = new Scheduler([100, 200, 300, 400, 500]);
        setScheduler(scheduler);
    };

    const addProcessToQue = (process) => {
        scheduler.addProcessToQueue(process);
    };




    return (
        <div id="main-container">
            {
                !scheduler && <Initialize setScheduler={setScheduler} />
            }

            {
                scheduler && (
                    <div id="scheduler-section">
                        <TopSection scheduler={scheduler} setScheduler={setScheduler} />

                        <LiveStatus scheduler={scheduler} />

                    </div>
                )
            }


            {/*<button onClick={initializeMemory}>initialize memory</button>*/}

            {/*<button onClick={() => {*/}
            {/*    console.log(scheduler.memory.getMemory());*/}
            {/*    const totalMemorySize = scheduler.getMemory().reduce((acc, block) => acc + block.size, 0);*/}
            {/*    console.log('Total Memory Size:', totalMemorySize);*/}

            {/*}}>get*/}
            {/*</button>*/}

            {/*<button onClick={() => {*/}
            {/*    console.log(scheduler.getCompleted());*/}
            {/*}}>get done*/}
            {/*</button>*/}

            {/*<button onClick={() => addProcessToQue({*/}
            {/*    size: 20,*/}
            {/*    duration: 2000*/}
            {/*})}>Add Process To Que*/}
            {/*</button>*/}

            {/*<button onClick={() => {*/}
            {/*    console.log(scheduler.getQueue());*/}
            {/*}}>get queue*/}
            {/*</button>*/}

            {/*<button onClick={() => {*/}
            {/*    console.log(scheduler.getRejected());*/}
            {/*}}>get rejected*/}

            {/*</button>*/}

        </div>
    );
}

export default App;