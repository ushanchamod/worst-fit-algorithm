import {Memory} from "./memory.js";

const PROCESS_STATUSES = {
    WAITING: 'waiting',
    RUNNING: 'running',
    COMPLETED: 'completed',
    REJECTED: 'rejected',
};

export class Scheduler {
    constructor(memory) {
        this.memory = new Memory(memory);
        this.queue = [];
        this.completed = [];
        this.rejected = [];

        this.maxMemorySize = memory.reduce((acc, size) => acc + size, 0);
    }

    getMemory() {
        return this.memory.getMemory();
    }

    getTotalMemory() {
        return this.maxMemorySize;
    }

    getQueue() {
        return this.queue;
    }

    getCompleted() {
        return this.completed;
    }

    getRejected() {
        return this.rejected;
    }

    addProcessToQueue(process) {
        const pid = `P${Math.floor(Math.random() * 1000)}`;
        const newProcess = {...process, pid, status: PROCESS_STATUSES.WAITING};
        this.queue.push(newProcess);
        this.run();
    }

    allocateMemory(process, index) {
        this.removeProcessFromQueue(process.pid);
        this.memory.allocateMemory(process, index);
        process.status = PROCESS_STATUSES.RUNNING;

        if(process.duration === -1) return;

        setTimeout(() => {
            this.deallocateMemory(process.pid);
            process.status = PROCESS_STATUSES.COMPLETED;
            console.log(`Process ${process.pid} completed.`);
            this.completed.push(process);
        }, process.duration);

    }

    deallocateMemory(pid) {
        this.memory.deallocateMemory(pid);
        this.run();
    }

    removeProcessFromQueue(pid) {
        this.queue = this.queue.filter((process) => process.pid !== pid);
    }

    run() {
        this.queue.forEach((process) => {
            if (process.status !== PROCESS_STATUSES.WAITING) return;

            if (process.size > this.maxMemorySize) {
                process.status = PROCESS_STATUSES.REJECTED;
                this.rejected.push(process);
                this.removeProcessFromQueue(process.pid);
                return;
            }

            const index = this.memory.findWorstFitBlock(process.size);
            if (index !== -1) {
                this.allocateMemory(process, index);
            }
        });
    }

    logSchedulerState() {
        console.log('Queue:', this.queue);
        console.log('Completed:', this.completed);
        console.log('Rejected:', this.rejected);
        console.log('Memory State:');
        this.memory.logMemoryState();
    }
}