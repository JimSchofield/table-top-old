import Point from '../Util/Point'

export default class TableModel {
    private _offset: Point = Point.fromArray([0,0]);
    private _bgImage: HTMLImageElement = null;
    private _zoomLevel: number = 1;
    private _bgImageDimensions: Point = null;

    public set offset(val: Point) {
        this.offset = val;
    }

    public get offset(): Point {
        return this._offset;
    }

    public set bgImage(img: HTMLImageElement) {
        this._bgImage = img;
        this._bgImageDimensions = Point.fromArray([img.width, img.height]);
    }

    public get bgImage(): HTMLImageElement {
        return this._bgImage;
    }

    public set zoom(val: number) {
        this._zoomLevel = val;
    }

    public get zoom(): number {
        return this._zoomLevel;
    }

    public get bgScaledImageDimensions(): Point {
        return this._bgImageDimensions.scale(this._zoomLevel);
    }

}