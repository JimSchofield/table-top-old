import TableModel from "./TableModel";
import CanvasUtil from '../Util/CanvasUtil';
import Point from "../Util/Point";

export default class Table {
    private _tableContainer: HTMLDivElement = null;
    private _tableModel: TableModel = null;
    public canvasRef: HTMLCanvasElement = null;
    private _canvas:CanvasUtil = null;
    private _canvasCenter: Point = null;

    constructor(tableModel: TableModel, tableContainer: HTMLDivElement) {
        this._tableModel = tableModel;
        this._tableContainer = tableContainer;

        this._constructCanvas()
    }

    private _constructCanvas():void {
        this.canvasRef = document.createElement('canvas');
        this.canvasRef.id = 'table-canvas';
        this._tableContainer.appendChild(this.canvasRef);
        this.resizeCanvasToParent();
        this._canvas = CanvasUtil.mountOnCanvasElement(this.canvasRef);
    }

    public resizeCanvasToParent() {
        // in CSS, canvas is already 100% width/height.  Need to resize canvas
        this.canvasRef.width = this.canvasRef.offsetWidth;
        this.canvasRef.height = this.canvasRef.offsetHeight;
        this._canvasCenter = new Point(this.canvasRef.width / 2,this.canvasRef.height / 2)
    }

    public zoom(value: number): void {
        // Update model
        this._tableModel.zoom *= value;
        this._tableModel.bgImageDimensions.scale(value);
        
        /*
        *  Change offset so that the map zooms centered on center of canvas...
        *  (offset - center) * scale + center
        * */
        this._tableModel.offset.subtract(this._canvasCenter).scale(value).add(this._canvasCenter);
    }

    public panBy(p: Point): void {
        this._tableModel.offset.add(p);
    }

    public centerTable(): void {
        this._tableModel.offset = Point.subtract(this._canvasCenter,this._tableModel.bgImageDimensions.clone().scale(.5));
    }

    public resetZoom(): void {
        this.zoom(1 / this._tableModel.zoom);
    }

    public render(): void {
        // Clear!
        this._canvas.clear(0,0,this.canvasRef.width,this.canvasRef.height);

        //draw background
        if (!this._tableModel.bgImage) {
            return
        }
     
        const img:HTMLImageElement = this._tableModel.bgImage;
        const offset:Point = this._tableModel.offset;
        const bgImageDimensions: Point = this._tableModel.bgImageDimensions;

        this._canvas.drawImage(img, offset.x, offset.y, bgImageDimensions.x, bgImageDimensions.y);
    }
}