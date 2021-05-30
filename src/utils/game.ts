import { getRandomUserName, getRandomEnemyName } from '@/utils/common';
import { GameMap } from '@/utils/map';
import { Controller } from '@/utils/controller';
import { Character } from '@/utils/character';
import { firstArea, firstAreaInfo } from '@/constants/map';

/**
 * ゲームの初期化処理
 */
export const gameInitializer = (app: HTMLCanvasElement): InitOutput => {
    const appCtx = app.getContext('2d');
    if (!appCtx) {
        throw new Error('do not ready appCtx.');
    }

    const dpr = window.devicePixelRatio;
    const windowInnerHeight = window.innerHeight * dpr;
    const cellSize = Math.ceil(windowInnerHeight / 13);
    app.height = windowInnerHeight;
    app.width = cellSize * 7;

    const mapRange: MapRange = [6, 3];
    const map = new GameMap(firstArea, cellSize, firstAreaInfo, mapRange);
    const player = new Character(getRandomUserName(), cellSize, [0, 0], 'player');
    const enemy = new Character(getRandomEnemyName(), cellSize, [2, 3], 'enemy');
    const gameController = new Controller(player, [player, enemy], map);

    return {
        appCtx,
        gameController,
    }
};
/**
 * ゲームのレンダリングに必要な一連の処理
 */
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

