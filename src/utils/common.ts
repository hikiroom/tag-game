/**
 * 適当なユーザー名を返す
 */
export const getRandomUserName = (): string => {
    const nameList = [
        '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙', '🥲', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '🥸', '😎', '🤓', '🧐', '😕', '😟', '🙁', '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '😈', '👿', '💀',
    ];
    const randomIndex = Math.trunc(Math.random() * nameList.length);

    return nameList[randomIndex];
};
/**
 * 適当な敵名を返す
 */
export const getRandomEnemyName = (): string => {
    const nameList = [
        '👹', '🤡', '👺', '👁', '🌚',
    ];
    const randomIndex = Math.trunc(Math.random() * nameList.length);

    return nameList[randomIndex];
};

/**
 * basePosからtargetPosまでの距離を返す
 */
export const getDistance = (basePos: Position, targetPos: Position): Position => {
    const [basePosY, basePosX] = basePos;
    const [targetPosY, targetPosX] = targetPos;

    const distanceY = targetPosY - basePosY;
    const distanceX = targetPosX - basePosX;

    return [distanceY, distanceX];
};

// const bfsResult = bfs(MAP, START_POS, END_POS);
// console.log(bfsResult.routes);
// console.log(getRoutesToGo(bfsResult.routes));