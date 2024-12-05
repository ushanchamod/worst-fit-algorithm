export class Memory {

    constructor(memory) {
        this.memory = memory;
        this.memory = this.memory.map((block) => {
            return {
                size: block,
                isFree: true,
                pid: null,
            };
        });
    }

    findWorstFitBlock(size) {
        let worstFitIndex = -1;
        let maxBlockSize = -1;

        this.memory.forEach((block, index) => {
            if (block.isFree && block.size >= size && block.size > maxBlockSize) {
                maxBlockSize = block.size;
                worstFitIndex = index;
            }
        });

        return worstFitIndex;
    }

    getMemory() {
        if (!this.memory) {
            throw new Error('Memory not initialized');
        }
        return this.memory;
    }

    setMemory(memory) {
        this.memory = memory;
    }

}