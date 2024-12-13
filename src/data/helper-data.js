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

export const testingSet1 = [
    { size: 670, duration: 297 },
    { size: 312, duration: 225 },
    { size: 423, duration: 122 },
    { size: 1024, duration: 168 },
    { size: 80, duration: 229 }
]
export const testingSet2 = [
    { size: 1287, duration: 127 },
    { size: 1999, duration: 228 },
    { size: 1025, duration: 240 },
    { size: 1792, duration: 263 },
    { size: 1960, duration: 229 }
]
export const testingSet3 = [
    { size: 770, duration: 930 },
    { size: 627, duration: 852 },
    { size: 1000, duration: 419 },
    { size: 1082, duration: 833 },
    { size: 917, duration: 981 }
]
export const testingSet4 = [
    { size: 100, duration: -1 },
    { size: 150, duration: -1 },
    { size: 100, duration: -1 },
    { size: 250, duration: -1 },
    { size: 300, duration: -1 }
]

export const getDataSet = (setName) => {
    if (setName === 'dataSet1') {
        return dataSet1;
    }
    else if (setName === 'dataSet2') {
        return dataSet2;
    }else if (setName === 'testingSet1') {
        return testingSet1;
    }else if (setName === 'testingSet2') {
        return testingSet2;
    }else if (setName === 'testingSet3') {
        return testingSet3;
    }else if (setName === 'testingSet4') {
        return testingSet4;
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