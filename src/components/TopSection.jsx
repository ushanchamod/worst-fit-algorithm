
function TopSection({ scheduler, setScheduler }) {
    const totalMemorySize = scheduler.getMemory().reduce((acc, block) => acc + block.size, 0);
    return (
        <div id='top-section'>
            <h1 className="title">Worst Fit Algorithm <em style={{fontSize: 15}} >(Reg No: 321420285)</em> </h1>
            <div className="right">
                <p>Total Memory Size : {totalMemorySize} kb</p>

                <button onClick={() => setScheduler(null)}>Re-scheduler</button>
            </div>
        </div>
    );
}

export default TopSection;