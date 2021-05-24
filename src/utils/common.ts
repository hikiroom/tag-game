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

// const bfsResult = bfs(MAP, START_POS, END_POS);
// console.log(bfsResult.routes);
// console.log(getRoutesToGo(bfsResult.routes));