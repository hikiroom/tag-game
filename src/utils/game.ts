import { getRandomUserName, getRandomEnemyName, getDistance } from '@/utils/common';
import { Map } from '@/utils/map';
import { Character, Controller } from '@/utils/character';
import { firstArea, firstAreaInfo, firstAreaSafeId } from '@/constants/map';

export const gameInitializer = (app: HTMLCanvasElement): InitOutput => {
    const appCtx = app.getContext('2d');
    if (!appCtx) {
        throw new Error('do not ready appCtx.');
    }

    const windowInnerHeight = window.innerHeight;
    const cellSize = Math.ceil(windowInnerHeight / 13);
    app.height = windowInnerHeight;
    app.width = cellSize * 7;

    const mapRange: MapRange = [6, 3];
    const map = new Map(firstArea, cellSize, firstAreaInfo, mapRange);
    const player = new Character(getRandomUserName(), cellSize, [1, 0], 'player');
    const enemy = new Character(getRandomEnemyName(), cellSize, [2, 2], 'enemy');
    const gameController = new Controller(player, [player, enemy], map);

    return {
        appCtx,
        gameController,
    }
};
type GameRendererProps = {
    init: () => void;
    willRender: (timestamp: number, gameRendererState: GameRendererState) => void;
    render: (timestamp: number, gameRendererState: GameRendererState) => void;
    didRender: (timestamp: number, gameRendererState: GameRendererState) => void;
}
type GameRendererState = {
    renderStartTime: number,
    isRenderCycleRunning: boolean,
}
export const gameRenderer = ({
        init,
        willRender,
        render,
        didRender,
    }: GameRendererProps) => {
    const gameRendererState: GameRendererState = {
        renderStartTime: performance.now(),
        isRenderCycleRunning: true,
    };

    const renderCycle = (timestamp: number) => {
        willRender(timestamp, gameRendererState);
        render(timestamp, gameRendererState);
        didRender(timestamp, gameRendererState);

        if (gameRendererState.isRenderCycleRunning) {
            window.requestAnimationFrame(renderCycle);
        }
    };

    init();
    renderCycle(0);
};

