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
        this._resizeCanvasToParent();
        this._canvas = CanvasUtil.mountOnCanvasElement(this._canvasRef);
    }

    private _resizeCanvasToParent() {
        // in CSS, canvas is already 100% width/height.  Need to resize canvas
        this._canvasRef.width = this._canvasRef.offsetWidth;
        this._canvasRef.height = this._canvasRef.offsetHeight;
    }

    public render(): void {
        //draw background
        if (this._tableModel.bgImage) {
            const img:HTMLImageElement = this._tableModel.bgImage;
            const offset:Point = this._tableModel.offset;
            this._canvas.drawImage(img, offset.x, offset.y, img.width, img.height);
        }
    }
}