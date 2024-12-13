import {Memory} from "./memory.js";

const PROCESS_STATUSES = {
    WAITING: 'waiting',
    RUNNING: 'running',
    COMPLETED: 'completed',
    REJECTED: 'rejected',
};

export class Scheduler {
    #memory; // Private property to manage memory
    #queue; // Private property to hold processes in the queue
    #completed; // Private property to store completed processes
    #rejected; // Private property to store rejected processes

    /**
     * Constructor initializes the memory and process queues.
     * Calculates the total memory size from the provided memory blocks.
     * @param {number[]} memory - Array of positive integers representing memory block sizes.
     */
    constructor(memory) {
        this.#memory = new Memory(memory);
        this.#queue = [];
        this.#completed = [];
        this.#rejected = [];

        this.maxMemorySize = memory.reduce((acc, size) => acc + size, 0);
    }

    /**
     * Returns the current state of memory blocks.
     * @returns {Array} Array of memory blocks.
     */
    getMemory() {
        return this.#memory.getMemory();
    }

    /**
     * Returns the total memory size available.
     * @returns {number} Total memory size.
     */
    getTotalMemory() {
        return this.maxMemorySize;
    }

    /**
     * Returns the current queue of processes.
     * @returns {Array} Array of processes in the queue.
     */
    getQueue() {
        return this.#queue;
    }

    /**
     * Returns the list of completed processes.
     * @returns {Array} Array of completed processes.
     */
    getCompleted() {
        return this.#completed;
    }

    /**
     * Returns the list of rejected processes.
     * @returns {Array} Array of rejected processes.
     */
    getRejected() {
        return this.#rejected;
    }

    /**
     * Adds a process or multiple processes to the queue.
     * Processes are sorted in descending order of size for worst-fit allocation.
     * @param {Object|Array} process - Single process object or array of process objects.
     */
    addProcessToQueue(process) {
        if (process.constructor === Array) {
            const newProcesses = process.map((p) => {
                const pid = `P${Math.floor(Math.random() * 1000)}`;
                return {...p, pid, status: PROCESS_STATUSES.WAITING};
            });
            const queue = [...this.#queue, ...newProcesses];
            this.#queue = queue.sort((a, b) => b.size - a.size);

        } else {
            const pid = `P${Math.floor(Math.random() * 1000)}`;
            const newProcess = {...process, pid, status: PROCESS_STATUSES.WAITING};
            const newQueue = [...this.#queue, newProcess];
            this.#queue = newQueue.sort((a, b) => b.size - a.size)
        }
        this.run();
    }

    /**
     * Allocates memory to a process and sets its status to running.
     * If the process has a finite duration, it is deallocated after the duration.
     * @param {Object} process - Process object to allocate memory for.
     * @param {number} index - Index of the memory block to allocate.
     */
    allocateMemory(process, index) {
        this.removeProcessFromQueue(process.pid);
        this.#memory.allocateMemory(process, index);
        process.status = PROCESS_STATUSES.RUNNING;

        if (process.duration === -1) return;

        setTimeout(() => {
            this.deallocateMemory(process.pid);
            process.status = PROCESS_STATUSES.COMPLETED;
            console.log(`Process ${process.pid} completed.`);
            this.#completed.push(process);
        }, process.duration);

    }

    /**
     * Deallocates memory associated with a specific process ID.
     * Triggers the allocation process for other waiting processes.
     * @param {string} pid - Process ID to deallocate.
     */
    deallocateMemory(pid) {
        this.#memory.deallocateMemory(pid);
        this.run();
    }

    /**
     * Removes a process from the queue by its process ID.
     * @param {string} pid - Process ID to remove.
     */
    removeProcessFromQueue(pid) {
        const newQueue = this.#queue.filter((process) => process.pid !== pid);
        this.#queue = newQueue.sort((a, b) => b.size - a.size);
    }

    /**
     * Executes the allocation process for all waiting processes in the queue.
     * Allocates memory if possible, rejects processes that cannot fit in memory.
     */
    run() {
        this.#queue.forEach((process) => {
            if (process.status !== PROCESS_STATUSES.WAITING) return;

            if (process.size > this.maxMemorySize) {
                process.status = PROCESS_STATUSES.REJECTED;
                this.#rejected.push(process);
                this.removeProcessFromQueue(process.pid);
                return;
            }

            const index = this.#memory.findWorstFitBlock(process.size);
            if (index !== -1) {
                this.allocateMemory(process, index);
            }
        });
    }

    /**
     * Resets the scheduler to its initial state with all memory blocks freed.
     */
    resetMemory() {
        this.#memory = new Memory([this.maxMemorySize]);
        this.#queue = [];
        this.#completed = [];
        this.#rejected = [];
    }

    /**
     * Logs the current state of the scheduler, including queues and memory state.
     */
    logSchedulerState() {
        console.log('Queue:', this.#queue);
        console.log('Completed:', this.#completed);
        console.log('Rejected:', this.#rejected);
        console.log('Memory State:');
        this.#memory.logMemoryState();
    }
}







