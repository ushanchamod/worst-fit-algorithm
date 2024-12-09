export const dataSet1 = [
    {
        size: 100,
        duration: 200
    },
    {
        size: 200,
        duration: 300
    },
    {
        size: 300,
        duration: 400
    },
    {
        size: 400,
        duration: 500
    },
    {
        size: 500,
        duration: 600
    },
    {
        size: 600,
        duration: 700
    },
    {
        size: 700,
        duration: 800
    },
    {
        size: 800,
        duration: 900
    },
    {
        size: 900,
        duration: 1000
    },
    {
        size: 1000,
        duration: 1100
    }
]

export const loadDataSet = (scheduler, setName) => {
    if(!scheduler) return;

    if(setName === 'dataSet1') {
        for(const p of dataSet1) {
            scheduler.addProcessToQueue(p);
        }
    }
};