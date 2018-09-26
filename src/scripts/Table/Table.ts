import TableModel from "./TableModel";
import CanvasUtil from '../Util/CanvasUtil';

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

    public drawAPicture(img: HTMLImageElement,x:number, y:number, width: number, height: number): void {
        this._canvas.drawImage(img,x,y,width,height);
    }
}