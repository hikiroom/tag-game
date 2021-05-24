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
        const enemy = new Character('👹', cellSize, [1, 2]);
        const enemy2 = new Character('🤡', cellSize, [8, 9]);
        const map = new Map(firstArea, cellSize, firstAreaInfo);
        const mapRange: MapRange = [Math.trunc(windowInnerHeight / cellSize / 2), 3];
        const playerController = new Controller(player, [player, enemy, enemy2], map);
        
        playerController.setControlEvent();

        
        // @TODO TIMER追加, 掘る動作追加, ピッケル数表示追加, 衝突判定追加
        let a = performance.now();
        let c = performance.now();
        const render = () => {
            
            let b = performance.now();
            if (b - a > 300) {
                const { routes } = Map.getAllRoutes(map.array, enemy.position, player.position, firstAreaSafeId);
                if (routes.length > 1) {
                    enemy.position = Map.getRoutesToGo(routes)[1].position;
                }

                a = performance.now();
            }
            if (b - c > 400) {
                const { routes } = Map.getAllRoutes(map.array, enemy2.position, player.position, firstAreaSafeId);
                if (routes.length > 1) {
                    enemy2.position = Map.getRoutesToGo(routes)[1].position;
                }

                c = performance.now();
            }

            const pseudoPlayerPosition: Position = [mapRange[0] * cellSize, mapRange[1] * cellSize];
            const pseudoEnemyDistance: Position = getDistance(player.position, enemy.position, mapRange);
            const pseudoEnemyPosition: Position = [pseudoEnemyDistance[0] * cellSize, pseudoEnemyDistance[1] * cellSize];
            const pseudoEnemyDistance2: Position = getDistance(player.position, enemy2.position, mapRange);
            const pseudoEnemyPosition2: Position = [pseudoEnemyDistance2[0] * cellSize, pseudoEnemyDistance2[1] * cellSize];
            map.render(appCtx, Map.cutArrayMap(map.array, player.position, mapRange));
            player.render(appCtx, pseudoPlayerPosition);
            enemy.render(appCtx, pseudoEnemyPosition);
            enemy2.render(appCtx, pseudoEnemyPosition2);

            requestAnimationFrame(render);
        };

        render();
    }, []);

    return (
        <>
            <Head>
                <title>ゲーム画面 | 壁を掘って鬼から逃げろ！</title>
            </Head>
            <div className={styles.container}>
                <canvas ref={app} className={styles.app}></canvas>
            </div>
        </>
    );
}

export default Game;