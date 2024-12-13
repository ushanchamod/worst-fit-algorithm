import {useState} from "react";
import {getDataSet, testingSet3, testingSet4} from "../data/helper-data.js";

function DataSelectionPopup({setLoadDataSet, setOpen, resetMemory}) {
    const [selectedDataSet, setSelectedDataSet] = useState("");
    const [data, setData] = useState([]);

    const change = (e) => {
        console.log(e.target.value)
        setSelectedDataSet(e.target.value)
        const x = getDataSet(e.target.value)
        setData(x)
    }

    const use = () => {
        resetMemory();
        setLoadDataSet(data);
        setOpen(false);
    }

    const close = () => {
        setOpen(false);
    }

    return (<div id="data-selection-popup">
            <div className="card0">
                <label htmlFor="data-set-selection-input">Select Data Set</label>
                <select name="" id="data-set-selection-input" value={selectedDataSet}
                        onChange={change}>
                    <option value="" disabled>Select Data Set</option>
                    <option value="dataSet1">Data Set 1 - 20 processors</option>
                    <option value="dataSet2">Data Set 2 - 10 processors & Long process time</option>
                    <option value="testingSet1">Testing Set 1 (Smaller than 1024 KB.)</option>
                    <option value="testingSet2">Testing Set 2 (Larger than 1024 KB.)</option>
                    <option value="testingSet3">Testing Set 3 (Larger and smaller processors mix (1024 KB).)</option>
                    <option value="testingSet4">Testing Set 3 (Sum of processors are smaller than 1024 KB and not time out)</option>
                </select>


                <div className='table-div'>
                    <table>
                        <thead>
                        <tr>
                            <th>Size</th>
                            <th>Duration</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((process, index) => (<tr key={index}>
                                <td>{process.size}</td>
                                <td>{process.duration}</td>
                            </tr>))}
                        </tbody>
                    </table>
                </div>

                <div className="btns">
                    <button className='use' onClick={use}>Use</button>
                    <button className='close' onClick={close}>Close</button>
                </div>

            </div>
        </div>);
}

export default DataSelectionPopup;