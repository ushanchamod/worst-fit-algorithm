export class Memory {
    #memory; // Private property to store the memory blocks and their state

    /**
     * Constructor initializes the memory blocks with given sizes.
     * Each block is initialized as free and unoccupied.
     * Throws an error if the input is not an array of positive integers.
     * @param {number[]} memory - Array of positive integers representing memory block sizes.
     */
    constructor(memory) {
        if (!Array.isArray(memory) || memory.some((block) => block <= 0)) {
            throw new Error('Memory must be an array of positive integers.');
        }
        this.#memory = memory.map((block) => ({
            size: block,
            isFree: true,
            pid: null,
        }));
    }

    /**
     * Returns the current state of memory blocks.
     * @returns {Array} Array of memory blocks with their size, free status, and process ID.
     */
    getMemory() {
        return this.#memory;
    }

    /**
     * Finds the index of the worst-fit memory block for a given process size.
     * Worst-fit means the largest available block that can accommodate the process.
     * @param {number} size - The size of the process to allocate.
     * @returns {number} Index of the worst-fit block, or -1 if no suitable block is found.
     */
    findWorstFitBlock(size) {
        let worstFitIndex = -1;
        let maxBlockSize = -1;

        this.#memory.forEach((block, index) => {
            // Check if the block is free and can accommodate the process size
            if (block.isFree && block.size >= size && block.size > maxBlockSize) {
                maxBlockSize = block.size;
                worstFitIndex = index;
            }
        });

        return worstFitIndex;
    }

    /**
     * Allocates memory to a process in a specific block.
     * If the block is larger than the process size, it splits the block into two.
     * Throws an error if the block is already occupied or too small for the process.
     * @param {Object} process - Object containing process size and ID.
     * @param {number} index - Index of the block to allocate.
     */
    allocateMemory(process, index) {
        const block = this.#memory[index];

        if (!block.isFree || block.size < process.size) {
            throw new Error('Invalid allocation attempt.');
        }

        if (block.size > process.size) {
            this.#memory.splice(index, 1,
                {size: process.size, isFree: false, pid: process.pid},
                {size: block.size - process.size, isFree: true, pid: null}
            );
        } else {
            block.isFree = false;
            block.pid = process.pid;
        }

    }

    /**
     * Deallocates memory associated with a specific process ID.
     * Marks the block as free and merges contiguous free blocks.
     * @param {string} pid - Process ID to deallocate.
     * @returns {string} The process ID that was deallocated.
     */
    deallocateMemory(pid) {

        this.#memory.forEach((block) => {
            if (block.pid === pid) {
                block.isFree = true;
                block.pid = null;
            }
        });

        for (let i = 0; i < this.#memory.length - 1; i++) {
            if (this.#memory[i].isFree && this.#memory[i + 1].isFree) {
                this.#memory[i].size += this.#memory[i + 1].size;
                this.#memory.splice(i + 1, 1);
                i--;
            }
        }

        return pid;
    }

    /**
     * Logs the current state of memory blocks in a tabular format.
     * Displays each block's index, size, and status (free or occupied by a process ID).
     */
    logMemoryState() {
        console.table(this.#memory.map((block, index) => ({
            Block: index,
            Size: block.size,
            Status: block.isFree ? 'Free' : `Occupied by ${block.pid}`,
        })));
    }

}