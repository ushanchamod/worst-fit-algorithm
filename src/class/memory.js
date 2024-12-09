export class Memory {
    #memory;

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

    getMemory() {
        return this.#memory;
    }

    findWorstFitBlock(size) {
        let worstFitIndex = -1;
        let maxBlockSize = -1;

        this.#memory.forEach((block, index) => {
            if (block.isFree && block.size >= size && block.size > maxBlockSize) {
                maxBlockSize = block.size;
                worstFitIndex = index;
            }
        });

        return worstFitIndex;
    }

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

    deallocateMemory(pid) {
        // Mark the block associated with the given PID as free
        this.#memory.forEach((block) => {
            if (block.pid === pid) {
                block.isFree = true;
                block.pid = null;
            }
        });

        // Merge contiguous free blocks
        for (let i = 0; i < this.#memory.length - 1; i++) { // Ensure i + 1 is within bounds
            if (this.#memory[i].isFree && this.#memory[i + 1].isFree) {
                // Merge the sizes of the two contiguous free blocks
                this.#memory[i].size += this.#memory[i + 1].size;

                // Remove the next block (index i + 1)
                this.#memory.splice(i + 1, 1);

                // Decrement i to recheck the current block after merging
                i--;
            }
        }

        return pid;
    }

    logMemoryState() {
        console.table(this.#memory.map((block, index) => ({
            Block: index,
            Size: block.size,
            Status: block.isFree ? 'Free' : `Occupied by ${block.pid}`,
        })));
    }

}