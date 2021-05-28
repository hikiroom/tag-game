import styles from '@/styles/Game.module.scss'
import Head from 'next/head'
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

import db from '@/utils/firebase';
import { firstAreaSafeId } from '@/constants/map';
import { Map } from '@/utils/map';
import { Character } from '@/utils/character';
import { gameInitializer, gameRenderer } from '@/utils/game';
import { getRandomEnemyName, getDistance } from '@/utils/common';

const Game = () => {
    const app = useRef<HTMLCanvasElement>(null);
    const [viewShovelGauge, setViewShovelGauge] = useState(0);
    const [viewTimer, setViewTimer] = useState(0);
    const [resetCounter, setResetCounter] = useState(0);
    const [gameOverFlag, setGameOverFlag] = useState(false);
    const [gameStartFlag, setGameStartFlag] = useState(false);
    const [gameMessageFlag, setGameMessageFlag] = useState(false);

    useEffect(() => {
        if (app.current) {
            const {
                appCtx,
                gameController,
            } = gameInitializer(app.current);
            const { player, map } = gameController;

            setGameStartFlag(true);
            setGameOverFlag(false);
            gameRenderer({
                init() {
                    gameController.setKeydownEvent();
                    gameController.autoRecoverShovelGauge(3000);
                },
                willRender(timestamp) {
                    // 敵移動
                    gameController.eachEnemy((enemy: Character, i: number) => {
                        const maxMoveSpeed = 200;
                        const moveTime = i < 8 ? 1000 - (i  * 100) : maxMoveSpeed;
                        if (timestamp - enemy.timer >= moveTime) {
                            const { routes } = Map.getAllRoutes(map.array, enemy.position, player.position, firstAreaSafeId);
                            if (routes.length > 1) {
                                enemy.position = Map.getRoutesToGo(routes)[1].position;
                            }
                            enemy.timer = performance.now();
                        }
                    });

                    // 敵増殖
                    const createEnemyTime = 30000;
                    if (timestamp - gameController.enemyCreateTimer >= createEnemyTime) {
                        const y = Math.trunc((map.array.length - 1) / 2);
                        const x = map.array[y].findIndex((item: number, ) => item === 1) ?? 0;
                        const enemyName = getRandomEnemyName();
                        const enemy = new Character(enemyName, map.cellSize, [y, x], 'enemy');
                        gameController.characters.push(enemy);
                        gameController.enemyCreateTimer = performance.now();
                        setGameMessageFlag(true);
                    }
                },
                render() {
                    map.render(appCtx, map.cutArrayMap(player.position));

                    const [mapRangeY, mapRangeX] = map.range;
                    const pseudoPlayerPosition: Position = [mapRangeY * map.cellSize, mapRangeX * map.cellSize];
                    player.render(appCtx, pseudoPlayerPosition);

                    gameController.eachEnemy((enemy: Character) => {
                        const distanceBetweenPlayerAndEnemy = getDistance(player.position, enemy.position);
                        const pseudoDistanceBetweenPlayerAndEnemy: Position = [distanceBetweenPlayerAndEnemy[0] + mapRangeY, distanceBetweenPlayerAndEnemy[1] + mapRangeX];
                        const pseudoEnemyPosition: Position = [pseudoDistanceBetweenPlayerAndEnemy[0] * map.cellSize, pseudoDistanceBetweenPlayerAndEnemy[1] * map.cellSize];
                        enemy.render(appCtx, pseudoEnemyPosition);
                    });
                },
                didRender(timestamp, gameRendererState) {
                    const nowTime = Math.trunc((timestamp - gameRendererState.renderStartTime) / 1000);
                    setViewTimer(nowTime);
                    setViewShovelGauge(player.shovelGauge);
                    gameController.eachEnemy((enemy: Character) => {
                        const isHit = player.position[0] === enemy.position[0] && player.position[1] === enemy.position[1];
                        if (isHit) {
                            gameRendererState.isRenderCycleRunning = false;

                            gameController.unsetKeydownEvent();
                            gameController.stopAutoRecoverShovelGauge();

                            setGameOverFlag(true);
                            // db.collection('ranking').add({name: player.name, time});
                        }
                    });
                },
            });
        }
    }, [resetCounter]);

    return (
        <>
            <Head>
                <title>ゲーム画面 | 壁を掘って鬼から逃げろ！</title>
            </Head>
            <p onAnimationEnd={() => {setGameStartFlag(false)}} className={styles.gameStartMessage + (gameStartFlag ? ` ${styles['is-active']}` : '')}>鬼から逃げろ！！🏃</p>
            <p onAnimationEnd={() => {setGameMessageFlag(false)}} className={styles.gameMessage + (gameMessageFlag ? ` ${styles['is-active']}` : '')}>鬼が現れたぞ気をつけろ！😱</p>
            <div className={styles.gameOverBox + (gameOverFlag ? ` ${styles['is-active']}` : '')}>
                <p className={styles.gameOverText}>GAME OVER</p>
                <p>あなたは{viewTimer}秒間、鬼から逃げました！</p>
                <div className={styles.btnBox}>
                    <button type="button" onClick={() => {setResetCounter((oldCounter) => oldCounter + 1)}} className={styles.retryBtn}>リトライ</button>
                    <Link href="/">
                        <a className={styles.backBtn}>トップページに戻る</a>
                    </Link>
                </div>
            </div>
            <p className={styles.shovelGauge}>⛏<span>×{viewShovelGauge}</span></p>
            <p className={styles.timer}>⏱<span>{viewTimer}</span></p>
            <div className={styles.container}>
                <canvas ref={app} className={styles.app}></canvas>
            </div>
        </>
    );
}

export default Game;