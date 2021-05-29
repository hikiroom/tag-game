export class Character {
    name: string;
    size: number;
    position: Position;
    shovelGauge = 100;
    type: CharacterType;
    timer: number = performance.now();

    constructor(name: string, size: number, position: Position, type: CharacterType) {
        this.name = name;
        this.size = size;
        this.position = position;
        this.type = type;
    }

    render(appCtx: CanvasRenderingContext2D, position: Position = this.position) {
        appCtx.font = `${this.size}px serif`;
        appCtx.textBaseline = 'top';
        appCtx.fillText(this.name, position[1], position[0]);
    }
}