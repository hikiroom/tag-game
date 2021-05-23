import Head from 'next/head'
import styles from '@/styles/Game.module.scss'
import Link from 'next/link';
import db from '@/utils/firebase';
import { useState, useEffect, useRef } from 'react';
import { getRandomName, getDistance, cutArrayMap } from '@/utils/common';
import { Map } from '@/utils/map';
import { Player } from '@/utils/player';
import { Enemy } from '@/utils/enemy';
import { firstArea, firstAreaInfo } from '@/constants/map';

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

        const player = new Player(getRandomName(), cellSize, [1, 0]);
        const enemy = new Enemy('👹', cellSize, [1, 2]);
        const map = new Map(firstArea, cellSize, firstAreaInfo);
        const mapRange: MapRange = [Math.trunc(windowInnerHeight / cellSize / 2), 3];
        const pseudoPlayerPosition: Position = [mapRange[0] * cellSize, mapRange[1] * cellSize];
        const pseudoEnemyDistance: Position = getDistance(player.position, enemy.position, mapRange);
        const pseudoEnemyPosition: Position = [pseudoEnemyDistance[0] * cellSize, pseudoEnemyDistance[1] * cellSize];

        map.render(appCtx, cutArrayMap(map.array, player.position, mapRange));
        player.render(appCtx, pseudoPlayerPosition);
        enemy.render(appCtx, pseudoEnemyPosition);

        // @TODO コントローラー作成
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp') {
                const id = map.getArrayMapIdWithPosition([player.position[0] - 1, player.position[1]]);

                if (id > 0) {
                    player.position[0]--;
                }
            } else if (e.key === 'ArrowDown') {
                const id = map.getArrayMapIdWithPosition([player.position[0] + 1, player.position[1]]);

                if (id > 0) {
                    player.position[0]++;
                }
            } else if (e.key === 'ArrowLeft') {
                const id = map.getArrayMapIdWithPosition([player.position[0], player.position[1] - 1]);

                if (id > 0) {
                    player.position[1]--;
                }
            } else if (e.key === 'ArrowRight') {
                const id = map.getArrayMapIdWithPosition([player.position[0], player.position[1] + 1]);

                if (id > 0) {
                    player.position[1]++;
                }
            } else if (e.key === 'w') {
                const [y, x] = player.position;

                if (y === 0) {
                    const newWall = Array(map.array[y].length).fill(0);
                    newWall[x] = 1;

                    map.array.unshift(newWall);

                    player.position[0]++;
                    enemy.position[0]++;
                } else {
                    map.array[y - 1][x] = 1;
                }
            } else if (e.key === 'a') {
                const [y, x] = player.position;

                if (x === 0) {
                    for (let i = map.array.length; i--;) {
                        if (i === player.position[0]) {
                            map.array[i].unshift(1);
                        } else {
                            map.array[i].unshift(0);
                        }
                    }

                    player.position[1]++;
                    enemy.position[1]++;
                } else {
                    map.array[y][x - 1] = 1;
                }
            } else if (e.key === 's') {
                const [y, x] = player.position;

                if (y === map.array.length - 1) {
                    const newWall = Array(map.array[y].length).fill(0);
                    newWall[x] = 1;

                    map.array.push(newWall);
                } else {
                    map.array[y + 1][x] = 1;
                }

            } else if (e.key === 'd') {
                const [y, x] = player.position;

                if (x === map.array[y].length - 1) {
                    for (let i = map.array.length; i--;) {
                        if (i === player.position[0]) {
                            map.array[i].push(1);
                        } else {
                            map.array[i].push(0);
                        }
                    }
                } else {
                    map.array[y][x + 1] = 1;
                }
            }

            const pseudoPlayerPosition: Position = [mapRange[0] * cellSize, mapRange[1] * cellSize];
            const pseudoEnemyDistance: Position = getDistance(player.position, enemy.position, mapRange);
            const pseudoEnemyPosition: Position = [pseudoEnemyDistance[0] * cellSize, pseudoEnemyDistance[1] * cellSize];

            map.render(appCtx, cutArrayMap(map.array, player.position, mapRange));
            player.render(appCtx, pseudoPlayerPosition);
            enemy.render(appCtx, pseudoEnemyPosition);
        });
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