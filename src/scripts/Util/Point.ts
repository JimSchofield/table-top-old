export default class Point {
    private _x: number = null;
    private _y: number = null;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    public static fromArray(arr: [number,number]): Point {
        const instance = new Point(arr[0], arr[1]);
        return instance;
    }

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }

    public scale(k: number): this{
        this._x *= k;
        this._y *= k;

        return this;
    }

    public add(p: Point): this{
        this._x += p.x;
        this._y += p.y;

        return this;
    }

    public subtract(p: Point): this{
        this._x -= p.x;
        this._y -= p.y;

        return this;
    }

    public clone(): Point {
        return new Point(this._x, this._y);
    }

    // Static! Return new instances!

    public static add(p1: Point, p2: Point): Point {
        return new Point(p1.x + p2.x, p1.y + p2.y);
    }
    
    public static subtract(p1: Point, p2: Point): Point {
        return new Point(p1.x - p2.x, p1.y - p2.y);
    }

    public static scale(p1: Point, k: number): Point {
        return new Point(p1.x * k, p1.y * k);
    }
}