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
        '👹', '🤡', '👺', '👁', '🌚', '🎭',
    ];
    const randomIndex = Math.trunc(Math.random() * nameList.length);

    return nameList[randomIndex];
};
/**
 * basePositionからtargetPositionまでの距離を返す
 */
export const getDistance = (basePosition: Position, targetPosition: Position): Position => {
    const [basePositionY, basePositionX] = basePosition;
    const [targetPositionY, targetPositionX] = targetPosition;

    const distanceY = targetPositionY - basePositionY;
    const distanceX = targetPositionX - basePositionX;

    return [distanceY, distanceX];
};
/**
 * 引数で渡された時間がランキングにランクインしているか判定する
 */
export const isRankIn = (ranking: Ranking[], time: number) => {
    if (ranking.length === 0) {
        return true;
    }

    console.log(time, ranking);
    return ranking.some((rankingObj: Ranking) => time >= rankingObj.time);
};