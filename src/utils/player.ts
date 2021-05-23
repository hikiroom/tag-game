export class Player {
    name: string;
    size: number;
    position: Position;

    constructor(name: string, size: number, position: Position) {
        this.name = name;
        this.size = size;
        this.position = position;
    }

    render(appCtx: CanvasRenderingContext2D, position: Position = this.position) {
        appCtx.font = `${this.size}px serif`;
        appCtx.textBaseline = 'top';
        appCtx.fillText(this.name, position[1], position[0]);
    }
}