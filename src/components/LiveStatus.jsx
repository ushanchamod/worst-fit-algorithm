import {useEffect, useState} from "react";
import Chart from "./Chart.jsx";


function LiveStatus({scheduler}) {
    const totalMemory = scheduler.getTotalMemory();
    const [data, setData] = useState([]);
    const [memory, setMemory] = useState(null);


    console.log('data', memory);
    useEffect(() => {

        const interval = setInterval(() => {
            const completed = scheduler.getCompleted();
            const rejected = scheduler.getRejected();
            const queue = scheduler.getQueue();
            const memory = scheduler.getMemory();

            setData({
                completed,
                rejected,
                queue,
            })

            setMemory(memory);
        }, 1000);

        return () => {
            clearInterval(interval);
        };

    }, []);


    useEffect(() => {
        if (!scheduler) return;
        const x = setInterval(() => {

            const time = Math.floor(Math.random() * 2000) + 100;

            const size = Math.floor(Math.random() * 1000) + 1;

            scheduler.addProcessToQueue({
                size: size,
                duration: time
            })
        }, 500);


        return () => {
            clearInterval(x);
        };
    }, []);

    return (
        <div id="live-status">
            {/*<button onClick={() => {*/}
            {/*    scheduler.addProcessToQueue({*/}
            {/*        size: 10,*/}
            {/*        duration: 500*/}
            {/*    });*/}
            {/*}}>sasdxsad*/}
            {/*</button>*/}

            <div className="memory" id="memory-001">
                {
                    memory && memory?.map((block, index) => {
                        const {size, isFree, pid} = block;

                        // get div width using id
                        const totalWidth = document.getElementById('memory-001').offsetWidth;

                        const blockWidth = (size / totalMemory) * totalWidth;
                        return (
                            <div key={index} className="single-block"
                                 style={{width: `${blockWidth}px`, background: isFree ? 'green' : 'black'}}>

                                {
                                    isFree ? <p>{size} kb</p> : <p>{pid}</p>

                                }
                            </div>
                        )
                    })
                }
            </div>

            <div className="table-section">
                <div className="queue">
                    <h3>Queue <span>({data?.queue?.length || 0})</span></h3>
                    <table>
                        <thead>
                        <tr>
                            <th>PID</th>
                            <th>Size (kb)</th>
                            <th>Duration (ms)</th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            data && data?.queue?.map((process, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{process.pid}</td>
                                        <td>{process.size}</td>
                                        <td>{process.duration}</td>
                                    </tr>
                                )
                            })
                        }

                        {
                            data && data?.queue?.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="no-data">No process in queue</td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>

                <div className="completed">
                    <h3>Completed <span>({data?.completed?.length || 0})</span></h3>
                    <table>
                    <thead>
                        <tr>
                            <th>PID</th>
                            <th>Size (kb)</th>
                            <th>Duration (ms)</th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            data && data?.completed?.map((process, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{process.pid}</td>
                                        <td>{process.size}</td>
                                        <td>{process.duration}</td>
                                    </tr>
                                )
                            })
                        }

                        {
                            data && data?.completed?.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="no-data">No process in queue</td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>

                <div className="rejected">
                    <h3>Rejected <span>({data?.rejected?.length || 0})</span></h3>
                    <table>
                    <thead>
                        <tr>
                            <th>PID</th>
                            <th>Size (kb)</th>
                            <th>Duration (ms)</th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            data && data?.rejected?.map((process, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{process.pid}</td>
                                        <td>{process.size}</td>
                                        <td>{process.duration}</td>
                                    </tr>
                                )
                            })
                        }

                        {
                            data && data?.rejected?.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="no-data">No process in queue</td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>



        </div>
    );
}

export default LiveStatus;