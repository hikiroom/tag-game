import Head from 'next/head'
import styles from '@/styles/Game.module.scss'
import Link from 'next/link';
import db from '@/utils/firebase';
import { useState, useEffect, useRef } from 'react';
import { getRandomName, getDistance } from '@/utils/common';
import { Map } from '@/utils/map';
import { Character, Controller } from '@/utils/character';
import { firstArea, firstAreaInfo, firstAreaSafeId } from '@/constants/map';

const Game = () => {
    const app = useRef<HTMLCanvasElement>(null);
    const [timer, setTimer] = useState(0);
    const [shovelGauge, setShovelGauge] = useState(0);

    useEffect(() => {
        if (!app.current) {
            throw new Error('do not ready app.');
        }

        const appCtx = app.current.getContext('2d');
        if (!appCtx) {
            throw new Error('do not ready appCtx.');
        }

        const windowInnerHeight = window.innerHeight;
        const cellSize = Math.ceil(windowInnerHeight / 13);
        app.current.height = windowInnerHeight;
        app.current.width = cellSize * 7;

        const player = new Character(getRandomName(), cellSize, [1, 0]);
        const enemy = new Character('👹', cellSize, [1, 9]);
        const map = new Map(firstArea, cellSize, firstAreaInfo);
        const mapRange: MapRange = [Math.trunc(windowInnerHeight / cellSize / 2), 3];
        const playerController = new Controller(player, [player, enemy], map);

        playerController.setKeydownEvent();
        playerController.autoRecoverTargetCharactersShovelGauge(3000);

        let enemyMoveTimer = performance.now();
        let enemySpeed = 1000;
        let renderFrame: number | null = null;
        const render = () => {
            setTimer(Math.trunc(performance.now() / 1000));
            setShovelGauge(player.shovelGauge);

            const nowTime = performance.now();
            if (nowTime - enemyMoveTimer > enemySpeed) {
                const { routes } = Map.getAllRoutes(map.array, enemy.position, player.position, firstAreaSafeId);
                if (routes.length > 0) {
                    enemy.position = Map.getRoutesToGo(routes)[1].position;
                }

                enemyMoveTimer = nowTime;
            }

            map.render(appCtx, Map.cutArrayMap(map.array, player.position, mapRange));

            const pseudoPlayerPosition: Position = [mapRange[0] * cellSize, mapRange[1] * cellSize];
            player.render(appCtx, pseudoPlayerPosition);

            const pseudoEnemyDistance: Position = getDistance(player.position, enemy.position, mapRange);
            const pseudoEnemyPosition: Position = [pseudoEnemyDistance[0] * cellSize, pseudoEnemyDistance[1] * cellSize];
            enemy.render(appCtx, pseudoEnemyPosition);

            const [py, px] = player.position;
            const [ey, ex] = enemy.position;
            const isHit = py === ey && px === ex;
            if (isHit) {
                if (typeof renderFrame === 'number') {
                    window.cancelAnimationFrame(renderFrame);

                    return;
                }
            }

            renderFrame = window.requestAnimationFrame(render);
        };

        render();
    }, []);

    return (
        <>
            <Head>
                <title>ゲーム画面 | 壁を掘って鬼から逃げろ！</title>
            </Head>
            <p className={styles.shovelGauge}>⛏<span>x{shovelGauge}</span></p>
            <p className={styles.timer}>TIME:<span>{timer}</span></p>
            <div className={styles.container}>
                <canvas ref={app} className={styles.app}></canvas>
            </div>
        </>
    );
}

export default Game;