import { Map } from '@/utils/map';

export class Character {
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

export class Controller {
    targetCharacter: Character;
    characters: Character[];
    map: Map;
    characterControlEvent: (e: KeyboardEvent) => void;

    constructor (targetCharacter: Character, characters: Character[], map: Map) {
        this.targetCharacter = targetCharacter;
        this.characters = characters;
        this.map = map;
        this.characterControlEvent = this.characterControl.bind(this);
    }

    setControlEvent() {
        window.addEventListener('keydown', this.characterControlEvent);
    }
    unsetControlEvent() {
        window.removeEventListener('keydown', this.characterControlEvent);
    }
    moveTargetCharacter(direction: Direction) {
        if (direction === 'top') {
            const [y, x] = this.targetCharacter.position;
            const id = this.map.getArrayMapIdUsingPosition([y - 1, x]);

            if (id > 0) {
                this.targetCharacter.position[0]--;
            }
        } else if (direction === 'right') {
            const [y, x] = this.targetCharacter.position;
            const id = this.map.getArrayMapIdUsingPosition([y, x + 1]);
            
            if (id > 0) {
                this.targetCharacter.position[1]++;
            }
        } else if (direction === 'bottom') {
            const [y, x] = this.targetCharacter.position;
            const id = this.map.getArrayMapIdUsingPosition([y + 1, x]);

            if (id > 0) {
                this.targetCharacter.position[0]++;
            }
        } else if (direction === 'left') {
            const [y, x] = this.targetCharacter.position;
            const id = this.map.getArrayMapIdUsingPosition([y, x - 1]);

            if (id > 0) {
                this.targetCharacter.position[1]--;
            }
        }
    }
    characterControl(e: KeyboardEvent) {
        if (e.key === 'ArrowUp') {
            this.moveTargetCharacter('top');
        } else if (e.key === 'ArrowRight') {
            this.moveTargetCharacter('right');
        } else if (e.key === 'ArrowDown') {
            this.moveTargetCharacter('bottom');
        } else if (e.key === 'ArrowLeft') {
            this.moveTargetCharacter('left');
        } else if (e.key === 'w') {
            this.breakWall('top');
        } else if (e.key === 'd') {
            this.breakWall('right');
        } else if (e.key === 's') {
            this.breakWall('bottom');
        } else if (e.key === 'a') {
            this.breakWall('left');
        }
    }
    shiftAllCharacter(direction: Direction) {
        for (let charactersLen = this.characters.length; charactersLen--;) {
            const character = this.characters[charactersLen];

            switch (direction) {
                case 'top':
                    character.position[0]--;
                    break;
                case 'bottom':
                    character.position[0]++;
                    break;
                case 'right':
                    character.position[1]++;
                    break;
                case 'left':
                    character.position[1]--;
                    break;
                default:
                    throw new Error('direction is wrong.');
            }
        }
    }
    breakWall(direction: Direction) {
        if (direction === 'top') {
            const [y, x] = this.targetCharacter.position;
            const isTopEdge = y === 0;
            if (isTopEdge) {
                this.shiftAllCharacter('bottom');
                this.map.createEdge('top');
                this.map.array[y][x] = 1;
            } else {
                this.map.array[y - 1][x] = 1;
            }
        } else if (direction === 'left') {
            const [y, x] = this.targetCharacter.position;
            const isLeftEdge = x === 0;
            if (isLeftEdge) {
                this.shiftAllCharacter('right');
                this.map.createEdge('left');
                this.map.array[y][x] = 1;
            } else {
                this.map.array[y][x - 1] = 1;
            }
        } else if (direction === 'bottom') {
            const [y, x] = this.targetCharacter.position;
            const isBottomEdge = y === this.map.array.length - 1;
            if (isBottomEdge) {
                this.map.createEdge('bottom');
                this.map.array[y + 1][x] = 1;
            } else {
                this.map.array[y + 1][x] = 1;
            }
        } else if (direction === 'right') {
            const [y, x] = this.targetCharacter.position;
            const isRightEdge = x === this.map.array[y].length - 1;
            if (isRightEdge) {
                this.map.createEdge('right');
                this.map.array[y][x + 1] = 1;
            } else {
                this.map.array[y][x + 1] = 1;
            }
        }
    }
    tracking(trackingTarget: Character) {
        
    }
}