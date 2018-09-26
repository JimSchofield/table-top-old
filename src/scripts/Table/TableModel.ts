import Point from '../Util/Point'

export default class TableModel {
    private _offset: Point = Point.fromArray([0,0]);
    private _bgImage: HTMLImageElement = null;

    public set offset(val: Point) {
        this.offset = val;
    }

    public get offset(): Point {
        return this._offset;
    }

    public set bgImage(img: HTMLImageElement) {
        this._bgImage = img;
    }

    public get bgImage(): HTMLImageElement {
        return this._bgImage;
    }
}