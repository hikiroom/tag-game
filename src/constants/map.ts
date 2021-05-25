export const WALL = 0;
export const HAVE_BEEN_TO = 100;
export const firstArea: ArrayMap = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
export const firstAreaInfo: ArrayMapInfo[] = [
    {
        id: WALL,
        name: 'wall',
        color: '#9d9d9d',
    },
    {
        id: 1,
        name: 'ground',
        color: '#efefef',
    },
];
export const firstAreaSafeId = [1];