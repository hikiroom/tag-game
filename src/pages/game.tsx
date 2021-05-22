import Head from 'next/head'
import styles from '@/styles/Game.module.scss'
import Link from 'next/link';
import db from '@/lib/firebase';
import { useState, useEffect, useRef } from 'react';

const Game = () => {
    const app = useRef<HTMLCanvasElement>(null);

    // @TODO コード整理
    useEffect(() => {
        if (!app.current) {
            throw new Error('do not ready app.');
        }

        const appCtx = app.current.getContext('2d');

        class Map {
            constructor(arrayMap, cellSize) {
                this.array = arrayMap;
                this.cellSize = cellSize;
                this.info = [
                    {
                        id: 0,
                        name: 'wall',
                        color: '#9d9d9d',
                    },
                    {
                        id: 1,
                        name: 'ground',
                        color: '#efefef',
                    },
                ];
            }
            getInfo(id) {
                return this.info.find((item) => item.id === id);
            }
            render(appCtx, mapArray) {
                for (let y = 0, yLen = mapArray.length; y < yLen; y++) {
                    const horizontalArray = mapArray[y];
                    for (let x = 0, xLen = horizontalArray.length; x < xLen; x++) {
                        const id = mapArray[y][x];
                        const info = this.getInfo(id);
        
                        appCtx.fillStyle = info?.color ?? '#ffffff';
                        appCtx.strokeStyle = '#ffffff';
                        appCtx.fillRect(this.cellSize * x, this.cellSize * y, this.cellSize, this.cellSize);
                        appCtx.strokeRect(this.cellSize * x, this.cellSize * y, this.cellSize, this.cellSize);
                    }
                }
        
            }
        }
        class Camera {
            static cut(arrayMap, basePos, range) {
                const [basePosY, basePosX] = basePos;
                const [rangeY, rangeX] = range;
                const result = new Array(rangeY * 2 + 1).fill(null).map((item, i) => {
                    return Array(rangeX * 2 + 1).fill(0);
                });
        
                for (let y = basePosY - rangeY, i = 0; y <= basePosY + rangeY; y++, i++) {
                    if (y < 0 || y >= arrayMap.length) {
                        continue;
                    }
                    for (let x = basePosX - rangeX, j = 0; x <= basePosX + rangeX; x++, j++) {
                        if (x < 0 || x >= arrayMap[y].length) {
                            continue;
                        }
        
                        result[i][j] = arrayMap[y][x];
                    }
                }
        
                return result;
            }
            static getDistance(basePos, targetPos, range) {
                const [basePosY, basePosX] = basePos;
                const [targetPosY, targetPosX] = targetPos;
                const [rangeY, rangeX] = range;
        
                const distanceY = targetPosY - basePosY + rangeY;
                const distanceX = targetPosX - basePosX + rangeX;
        
                return [distanceY, distanceX];
            }
        }
        
        const arrayMap = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
            [1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];

        app.current.height = window.innerHeight;
        const cellSize = Math.ceil(app.current.height / 13);
        app.current.width = cellSize * 7;
        const map = new Map(arrayMap, cellSize);
        const currentPos = [1, 1];
        const enemyPos = [1, 2];
        const range = [Math.trunc(app.current.height / map.cellSize / 2), 3];
        
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp') {
                currentPos[0]--;
            } else if (e.key === 'ArrowDown') {
                currentPos[0]++;
            } else if (e.key === 'ArrowLeft') {
                currentPos[1]--;
            } else if (e.key === 'ArrowRight') {
                currentPos[1]++;
            } else if (e.key === 'a') {
                /**
                 * 目的が0だったら1にspliceする
                 * 配列の端だったときの処理
                 */
                // map.array[currentPos[0]].unshift(1);
                for (let i = map.array.length; i--;) {
                    if (i === currentPos[0]) {
                        map.array[i].unshift(1);
                    } else {
                        map.array[i].unshift(0);
                    }
                    // map.array[currentPos[0]].push(1);
                }
                currentPos[1]++;
                enemyPos[1]++;
            } else if (e.key === 'd') {
            }
         
            const arrayMap = Camera.cut(map.array, currentPos, range);
            map.render(appCtx, arrayMap);
        
            appCtx.font = `${cellSize}px serif`;
            appCtx.textBaseline = `top`;
            appCtx.fillText('😀', range[1] * cellSize, range[0] * cellSize);
        
            const [y, x] = Camera.getDistance(currentPos, enemyPos, range);
            appCtx.fillText('👹', x * cellSize, y * cellSize);
        });
        map.render(appCtx, Camera.cut(map.array, currentPos, range));
        
        appCtx.font = `${cellSize}px serif`;
        appCtx.textBaseline = `top`;
        appCtx.fillText('😀', range[1] * cellSize, range[0] * cellSize);
        
        const [y, x] = Camera.getDistance(currentPos, [1, 2], range);
        appCtx.fillText('👹', x * cellSize, y * cellSize);
        
    });

    
    // const START_POS = [1, 1];
    // const END_POS = [3, 3];
    // const WALL_ELEMENT = 0;
    // const HAVE_BEEN_TO_ELEMENT = 2;
    
    // const getRoutesToGo = (routes) => {
    //     const move = (currentIdx, acc = []) => {
    //         const currentRoute = routes[currentIdx];
    //         acc.unshift(currentRoute);
    
    //         for (let i = currentIdx; i--;) {
    //             const nextRoutes = routes[i];
    //             if (isAdjacent(currentRoute.position, nextRoutes.position)) {
    //                 return move(i, acc);
    //             }
    //         }
    
    //         return acc;
    //     };
    
    //     return move(routes.length - 1);
    // };
    // const isAdjacent = (currentPos, targetPos) => {
    //         const [topPosY, topPosX] = getPositionByDirection(currentPos, 'top');
    //         const [bottomPosY, bottomPosX] = getPositionByDirection(currentPos, 'bottom');
    //         const [leftPosY, leftPosX] = getPositionByDirection(currentPos, 'left');
    //         const [rightPosY, rightPosX] = getPositionByDirection(currentPos, 'right');
    //         const [targetPosY, targetPosX] = targetPos;
    
    //         if (
    //             topPosY === targetPosY && topPosX === targetPosX || 
    //             bottomPosY === targetPosY && bottomPosX === targetPosX || 
    //             leftPosY === targetPosY && leftPosX === targetPosX || 
    //             rightPosY === targetPosY && rightPosX === targetPosX
    //         ) {
    //             return true;
    //         }
    
    //         return false;
    //     };
    // const getPositionByDirection = (currentPos, direction) => {
    //     const [currentPosY, currentPosX] = currentPos;
    
    //     switch (direction) {
    //         case 'top':
    //             return [currentPosY - 1, currentPosX];
    //         case 'bottom':
    //             return [currentPosY + 1, currentPosX];
    //         case 'left':
    //             return [currentPosY, currentPosX - 1];
    //         case 'right':
    //             return [currentPosY, currentPosX + 1];
    //         default:
    //             throw new Error('you throw "direction" is wrong');
    //     }
    // };
    // const isTraversable = (map, position) => {
    //     const [targetPosY, targetPosX] = position;
    //     const existElement = typeof map[targetPosY] !== 'undefined'　&& typeof map[targetPosY][targetPosX] === 'number';
    //     if (existElement) {
    //         const element = map[targetPosY][targetPosX];
    //         if (element !== WALL_ELEMENT && element !== HAVE_BEEN_TO_ELEMENT) {
    //             return true;
    //         }
    //     }
    
    //     return false;
    // };
    // const bfs = (map, startPos, [endY, endX]) => {
    //     const search = (positionWithDistance, queue = [], routes = []) => {
    //         const [currentPosY, currentPosX] = positionWithDistance.position;
    //         const distance = positionWithDistance.distance;
    
    //         routes.push({position: [currentPosY, currentPosX], distance});
    
    //         const isEnd = currentPosY === endY && currentPosX === endX;
    //         if (isEnd) {
    //             return {
    //                 result: true,
    //                 routes,
    //             };
    //         }
    
    //         mapClone[currentPosY][currentPosX] = HAVE_BEEN_TO_ELEMENT;
    
    //         const topElementPos = getPositionByDirection([currentPosY, currentPosX], 'top');
    //         if (isTraversable(mapClone, topElementPos)) {
    //             const topPos = {position: topElementPos, distance: distance + 1};
    //             queue.push(topPos);
    //         }
    //         const bottomElementPos = getPositionByDirection([currentPosY, currentPosX], 'bottom');
    //         if (isTraversable(mapClone, bottomElementPos)) {
    //             const bottomPos = {position: bottomElementPos, distance: distance + 1};
    //             queue.push(bottomPos);
    //         }
    //         const leftElementPos = getPositionByDirection([currentPosY, currentPosX], 'left');
    //         if (isTraversable(mapClone, leftElementPos)) {
    //             const leftPos = {position: leftElementPos, distance: distance + 1};
    //             queue.push(leftPos);
    //         }
    //         const rightElementPos = getPositionByDirection([currentPosY, currentPosX], 'right');
    //         if (isTraversable(mapClone, rightElementPos)) {
    //             const rightPos = {position: rightElementPos, distance: distance + 1};
    //             queue.push(rightPos);
    //         }
    
    //         if (queue.length === 0) {
    //             return {
    //                 result: false,
    //                 routes,
    //             };
    //         } else {
    //             const nextPos = queue[0];
    //             const remainQueue = queue.slice(1, queue.length);
    
    //             return search(nextPos, remainQueue, routes);
    //         }
    //     };
    //     const mapClone = JSON.parse(JSON.stringify(map));
    
    //     return search({
    //         position: startPos,
    //         distance: 0,
    //     });
    // };
    
    // const bfsResult = bfs(MAP, START_POS, END_POS);
    // console.log(bfsResult.routes);
    // console.log(getRoutesToGo(bfsResult.routes));

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