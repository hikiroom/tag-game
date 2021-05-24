type Position = [number, number];
type MapRange = [number, number];
type ArrayMap = number[][];
type ArrayMapInfo = {
    id: number,
    name: string,
    color: string
};
type Route = {
    position: Position,
    distance: number,
};
type BfsResult = {
    result: boolean,
    routes: Route[],
};
type Direction = 'top' | 'bottom' | 'left' | 'right';