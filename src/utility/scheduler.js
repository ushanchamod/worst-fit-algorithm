import {Memory} from "./memory.js";

export class Scheduler {
    constructor(memory) {
        this.queue = [];
        this.completed = [];
        this.rejected = [];
        this.memory = new Memory(memory);
        this.maxMemorySize = memory.reduce((acc, size) => acc + size, 0);
    }

    addProcessToQueue(process) {
        const pid = `P${new Date().getTime()}`;
        const newProcess = {...process, pid, status: 'waiting'};
        this.queue.push(newProcess);
        this.run()


    }

    deallocateMemory(processId) {
        const newMemory = this.memory.getMemory().map((block) => {
            if (block.pid === processId) {
                return {
                    size: block.size,
                    isFree: true,
                    pid: null,
                };
            }
            return block;
        });

        for (let i = 0; i < newMemory.length - 1; i++) {
            if (newMemory[i].isFree && newMemory[i + 1].isFree) {
                newMemory[i].size += newMemory[i + 1].size;
                newMemory.splice(i + 1, 1);
                i--; // Recheck for newly merged blocks
            }
        }

        this.memory.setMemory(newMemory);
        this.run();

    }

    allocateMemory(process, index) {

        this.removeProcessFromQueue(process.pid);

        const updatedMemory = [...this.memory.getMemory()];
        const block = updatedMemory[index];

        if (block.size > process.size) {

            updatedMemory.splice(index, 1,

                {size: process.size, isFree: false, pid: process.pid},
                {size: block.size - process.size, isFree: true, pid: null}
            );

            this.memory.setMemory(updatedMemory)

        } else {
            block.isFree = false;
            block.pid = process.pid;
        }
        process.status = 'running';

        setTimeout(() => {
            this.deallocateMemory(process.pid);
            this.completed.push(process);
        }, process.duration);

        return true;
    }

    getQueue() {
        return this.queue;
    }

    getMemory() {
        return this.memory.getMemory();
    }

    getCompleted() {
        return this.completed;
    }

    getRejected() {
        return this.rejected;
    }

    getTotalMemory(){
        return this.maxMemorySize;
    }


    removeProcessFromQueue(pid) {
        this.queue = this.queue.filter((process) => process.pid !== pid);
    }

    run() {
        this.queue.forEach((process) => {
            if (process.status === 'running') return;
            if (process.size > this.maxMemorySize) {
                process.status = 'rejected';
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
}