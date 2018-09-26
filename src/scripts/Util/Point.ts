export default class Point {
    private _x: number = null;
    private _y: number = null;

    public static fromArray(arr: [number,number]): Point {
        const instance = new Point();
        instance._x = arr[0];
        instance._y = arr[1];
        return instance;
    }

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }
}