import { Character } from '@/utils/character';
import { GameMap } from '@/utils/map';

export class Controller {
    player: Character;
    characters: Character[];
    map: GameMap;
    enemyCreateTimer: number = performance.now();
    characterControlByKeydownBoundByThis: (e: KeyboardEvent) => void;
    autoRecoverShovelGaugeTimerId: number | null = null;

    constructor (player: Character, characters: Character[], map: GameMap) {
        this.player = player;
        this.characters = characters;
        this.map = map;
        this.characterControlByKeydownBoundByThis = this.characterControlByKeydown.bind(this);
    }

    autoRecoverShovelGauge(timeout: number) {
        this.autoRecoverShovelGaugeTimerId = window.setInterval(() => {
            this.player.shovelGauge++;
        }, timeout);
    }
    stopAutoRecoverShovelGauge() {
        if (!this.autoRecoverShovelGaugeTimerId) {
            throw new Error('autoRecoverShovelGaugeTimerId is not Exist');
        }

        clearInterval(this.autoRecoverShovelGaugeTimerId)
    }
    setKeydownEvent() {
        window.addEventListener('keydown', this.characterControlByKeydownBoundByThis);
    }
    unsetKeydownEvent() {
        window.addEventListener('keydown', this.characterControlByKeydownBoundByThis);
    }
    movePlayer(direction: Direction) {
        if (direction === 'top') {
            const [y, x] = this.player.position;
            const id = this.map.getArrayMapIdUsingPosition([y - 1, x]);

            if (id > 0) {
                this.player.position[0]--;
            }
        } else if (direction === 'right') {
            const [y, x] = this.player.position;
            const id = this.map.getArrayMapIdUsingPosition([y, x + 1]);
            
            if (id > 0) {
                this.player.position[1]++;
            }
        } else if (direction === 'bottom') {
            const [y, x] = this.player.position;
            const id = this.map.getArrayMapIdUsingPosition([y + 1, x]);

            if (id > 0) {
                this.player.position[0]++;
            }
        } else if (direction === 'left') {
            const [y, x] = this.player.position;
            const id = this.map.getArrayMapIdUsingPosition([y, x - 1]);

            if (id > 0) {
                this.player.position[1]--;
            }
        }
    }
    characterControlByKeydown(e: KeyboardEvent) {
        if (e.key === 'ArrowUp' && this.player.shovelGauge > 0) {
            this.breakWall('top', ()=> {
                this.player.shovelGauge--;
            });
        } else if (e.key === 'ArrowRight' && this.player.shovelGauge > 0) {
            this.breakWall('right', ()=> {
                this.player.shovelGauge--;
            });
        } else if (e.key === 'ArrowDown' && this.player.shovelGauge > 0) {
            this.breakWall('bottom', ()=> {
                this.player.shovelGauge--;
            });
        } else if (e.key === 'ArrowLeft' && this.player.shovelGauge > 0) {
            this.breakWall('left', ()=> {
                this.player.shovelGauge--;
            });
        } else if (e.key === 'w') {
            this.movePlayer('top');
        } else if (e.key === 'd') {
            this.movePlayer('right');
        } else if (e.key === 's') {
            this.movePlayer('bottom');
        } else if (e.key === 'a') {
            this.movePlayer('left');
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
    breakWall(direction: Direction, callback?: () => void) {
        if (direction === 'top') {
            const [y, x] = this.player.position;
            const isTopEdge = y === 0;
            if (isTopEdge) {
                this.shiftAllCharacter('bottom');
                this.map.createEdge('top');
                this.map.array[y][x] = 1;
            } else {
                this.map.array[y - 1][x] = 1;
            }
        } else if (direction === 'left') {
            const [y, x] = this.player.position;
            const isLeftEdge = x === 0;
            if (isLeftEdge) {
                this.shiftAllCharacter('right');
                this.map.createEdge('left');
                this.map.array[y][x] = 1;
            } else {
                this.map.array[y][x - 1] = 1;
            }
        } else if (direction === 'bottom') {
            const [y, x] = this.player.position;
            const isBottomEdge = y === this.map.array.length - 1;
            if (isBottomEdge) {
                this.map.createEdge('bottom');
                this.map.array[y + 1][x] = 1;
            } else {
                this.map.array[y + 1][x] = 1;
            }
        } else if (direction === 'right') {
            const [y, x] = this.player.position;
            const isRightEdge = x === this.map.array[y].length - 1;
            if (isRightEdge) {
                this.map.createEdge('right');
                this.map.array[y][x + 1] = 1;
            } else {
                this.map.array[y][x + 1] = 1;
            }
        }
        if (callback) {
            callback();
        }
    }
    eachEnemy(callback: (enemy: Character, index: number) => void) {
        for (let i = this.characters.length; i--;) {
            const character = this.characters[i];
            const isEnemy = character.type === 'enemy';
            if (isEnemy) {
                callback(character, i);
            }
        }
        
    }
}