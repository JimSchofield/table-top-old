import TableModel from "./TableModel";
import CanvasUtil from '../Util/CanvasUtil';

export default class Table {
    private _tableContainer: HTMLDivElement = null;
    private _tableModel: TableModel = null;
    private _canvasRef: HTMLCanvasElement = null;
    private canvas:CanvasUtil = null;

    constructor(tableModel: TableModel, tableContainer: HTMLDivElement) {
        this._tableModel = tableModel;
        this._tableContainer = tableContainer;

        this._constructCanvas()
    }

    private _constructCanvas():void {
        this._canvasRef = document.createElement('canvas');
        this._canvasRef.id = 'table-canvas';
        this._tableContainer.appendChild(this._canvasRef);
    }
}