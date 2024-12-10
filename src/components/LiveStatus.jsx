import {useEffect, useState} from "react";
import DataSelectionPopup from "./DataSelectionPopup.jsx";


function LiveStatus({scheduler, resetMemory}) {
    const totalMemory = scheduler.getTotalMemory();
    const [data, setData] = useState([]);
    const [memory, setMemory] = useState(null);
    const [loadDataSet, setLoadDataSet] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {

        const interval = setInterval(() => {
            const completed = scheduler.getCompleted();
            const rejected = scheduler.getRejected();
            const queue = scheduler.getQueue();
            const memory = scheduler.getMemory();
            const currentProcess = memory.filter((block) => block.pid) || [];

            setData({
                completed,
                rejected,
                queue,
                currentProcess
            })

            setMemory(memory);
        },);

        return () => {
            clearInterval(interval);
        };

    }, [scheduler]);


    // useEffect(() => {
    //     if (!scheduler) return;
    //     const x = setInterval(() => {
    //
    //         const time = Math.floor(Math.random() * 2000) + 100;
    //
    //         const size = Math.floor(Math.random() * 1000) + 1;
    //
    //         scheduler.addProcessToQueue({
    //             size: size,
    //             duration: time
    //         })
    //     }, 500);
    //
    //
    //     return () => {
    //         clearInterval(x);
    //     };
    // }, []);

    const start = () => {
        resetMemory()
        scheduler.addProcessToQueue(loadDataSet);
    }

    const openDataSelection = () => {
        setOpen(true);
    }

    return (
        <div id="live-status">
            {open && <DataSelectionPopup setLoadDataSet={setLoadDataSet} setOpen={setOpen} resetMemory={resetMemory}/>}
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
                                    isFree ? <p title={`${size}KB`}>{size} kb</p> : <div>
                                        <p title={pid}>{pid}</p>
                                        <p title={`${size}KB`}>{size} kb</p>
                                    </div>

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

                <div className="queue">
                    <h3>Processing <span>({data?.currentProcess?.length || 0})</span></h3>
                    <table>
                        <thead>
                        <tr>
                            <th>PID</th>
                            <th>Size (kb)</th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            data && data?.currentProcess?.map((process, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{process.pid}</td>
                                        <td>{process.size}</td>
                                    </tr>
                                )
                            })
                        }

                        {
                            data && data?.currentProcess?.length === 0 && (
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

            <br/>
            <hr/>

            <h4>Load data to memory</h4>

            <div className="btns">
                <button onClick={openDataSelection} className="cloose">Choose Data Set</button>
                {loadDataSet && loadDataSet.length > 0 &&
                    <button onClick={start} className="save">Load to Queue & Start</button>}
            </div>

        </div>
    );
}

export default LiveStatus;