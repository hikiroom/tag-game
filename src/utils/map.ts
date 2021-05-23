export class Map {
    array: number[][]
    cellSize: number
    info: ArrayMapInfo[]

    constructor(arrayMap: number[][], cellSize: number, info: ArrayMapInfo[]) {
        this.array = arrayMap;
        this.cellSize = cellSize;
        this.info = info;
    }
    getInfo(id: number): ArrayMapInfo {
        const result = this.info.find((item) => item.id === id);

        if (!result) {
            throw new Error(`Do not exist ArrayMapInfo associated with "${id}"`);
        }
        
        return result;
    }
    getArrayMapIdWithPosition(position: Position): number {
        const [y, x] = position;

        if (typeof this.array[y] !== 'undefined' && typeof this.array[y][x] === 'number') {
            const id = this.array[y][x];

            return id;
        } else {
            return -1;
        }
    }
    render(appCtx: CanvasRenderingContext2D , arrayMap: number[][]) {
        for (let y = 0, yLen = arrayMap.length; y < yLen; y++) {
            const horizontalArray = arrayMap[y];
            for (let x = 0, xLen = horizontalArray.length; x < xLen; x++) {
                const id = arrayMap[y][x];
                const info = this.getInfo(id);

                appCtx.fillStyle = info?.color ?? '#ffffff';
                appCtx.strokeStyle = '#ffffff';
                appCtx.fillRect(this.cellSize * x, this.cellSize * y, this.cellSize, this.cellSize);
                appCtx.strokeRect(this.cellSize * x, this.cellSize * y, this.cellSize, this.cellSize);
            }
        }

    }
}