import {useState} from "react";
import Initialize from "./components/Initialize.jsx";
import TopSection from "./components/TopSection.jsx";
import LiveStatus from "./components/LiveStatus.jsx";


function App() {
    const [scheduler, setScheduler] = useState(null);


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

        </div>
    );
}

export default App;