export const dataSet1 = [
    ...Array.from({length: 20}, () => ({
        size: Math.floor(Math.random() * 1500) + 1,
        duration: Math.floor(Math.random() * 200) + 100
    }))
]

export const dataSet2 = [
    ...Array.from({length: 10}, () => ({
        size: Math.floor(Math.random() * 100) + 1,
        duration: Math.floor(Math.random() * 5000) + 200
    }))
]

export const getDataSet = (setName) => {
    if (setName === 'dataSet1') {
        return dataSet1;
    }
    else if (setName === 'dataSet2') {
        return dataSet2;
    }
}

export const loadDataSet = (scheduler, setName) => {
    if (!scheduler) return;

    if (setName === 'dataSet1') {
        scheduler.addProcessToQueue(dataSet1);
    }
    else if (setName === 'dataSet2') {
        scheduler.addProcessToQueue(dataSet2);
    }
};