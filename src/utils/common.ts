/**
 * 適当なユーザー文字列を返す
 */
export const getRandomName = (): string => {
    const nameList = [
        '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙', '🥲', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '🥸', '😎', '🤓', '🧐', '😕', '😟', '🙁', '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '😈', '👿', '💀',
    ];
    const randomIndex = Math.trunc(Math.random() * nameList.length);

    return nameList[randomIndex];
};

/**
 * basePosからtargetPosまでの距離を返す
 */
export const getDistance = (basePos: Position, targetPos: Position, range: MapRange = [0, 0]): Position => {
    const [basePosY, basePosX] = basePos;
    const [targetPosY, targetPosX] = targetPos;
    const [rangeY, rangeX] = range;

    const distanceY = targetPosY - basePosY + rangeY;
    const distanceX = targetPosX - basePosX + rangeX;

    return [distanceY, distanceX];
};

/**
 * arrayMapを部分的に切り取る
 */
export const cutArrayMap = (arrayMap: ArrayMap, basePos: Position, range: MapRange) => {
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
};

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
//     const [topPosY, topPosX] = getPositionByDirection(currentPos, 'top');
//     const [bottomPosY, bottomPosX] = getPositionByDirection(currentPos, 'bottom');
//     const [leftPosY, leftPosX] = getPositionByDirection(currentPos, 'left');
//     const [rightPosY, rightPosX] = getPositionByDirection(currentPos, 'right');
//     const [targetPosY, targetPosX] = targetPos;

//     if (
//         topPosY === targetPosY && topPosX === targetPosX || 
//         bottomPosY === targetPosY && bottomPosX === targetPosX || 
//         leftPosY === targetPosY && leftPosX === targetPosX || 
//         rightPosY === targetPosY && rightPosX === targetPosX
//     ) {
//         return true;
//     }

//     return false;
// };
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
// const bfs = (arrayMap: ArrayMap, startPos: Position, [endY, endX]: Position) => {
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
//     const mapClone = JSON.parse(JSON.stringify(arrayMap));

//     return search({
//         position: startPos,
//         distance: 0,
//     });
// };

// const bfsResult = bfs(MAP, START_POS, END_POS);
// console.log(bfsResult.routes);
// console.log(getRoutesToGo(bfsResult.routes));