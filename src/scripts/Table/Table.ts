import TableModel from "./TableModel";
import CanvasUtil from '../Util/CanvasUtil';
import Point from "../Util/Point";

export default class Table {
    private _tableContainer: HTMLDivElement = null;
    private _tableModel: TableModel = null;
    private _canvasRef: HTMLCanvasElement = null;
    private _canvas:CanvasUtil = null;

    constructor(tableModel: TableModel, tableContainer: HTMLDivElement) {
        this._tableModel = tableModel;
        this._tableContainer = tableContainer;

        this._constructCanvas()
    }

    private _constructCanvas():void {
        this._canvasRef = document.createElement('canvas');
        this._canvasRef.id = 'table-canvas';
        this._tableContainer.appendChild(this._canvasRef);
        this.resizeCanvasToParent();
        this._canvas = CanvasUtil.mountOnCanvasElement(this._canvasRef);
    }

    public resizeCanvasToParent() {
        // in CSS, canvas is already 100% width/height.  Need to resize canvas
        this._canvasRef.width = this._canvasRef.offsetWidth;
        this._canvasRef.height = this._canvasRef.offsetHeight;
    }

    public zoom(value: number): void {
        this._tableModel.zoom *= value;
    }

    public render(): void {
        // Clear!
        this._canvas.clear(0,0,this._canvasRef.width,this._canvasRef.height);

        //draw background
        if (this._tableModel.bgImage) {
            const img:HTMLImageElement = this._tableModel.bgImage;
            const offset:Point = this._tableModel.offset;
            const bgImageDimensions: Point = this._tableModel.bgScaledImageDimensions;
            this._canvas.drawImage(img, offset.x, offset.y, bgImageDimensions.x, bgImageDimensions.y);
        }
    }
}