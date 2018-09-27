import Point from '../Util/Point';
import render from "../Render/render";
import TableModel from "./TableModel";
import Table from "./Table";


export default class TableController {
    private _appContainer: HTMLDivElement = null;
    private _tableContainer: HTMLDivElement = null;
    private _tableModel: TableModel = null;
    private _table: Table = null;

    private _onkeyDownHandler: (event: KeyboardEvent) => void = this._onKeyDown.bind(this);
    private _onResizeHandler: (event: Event) => void = this._onResize.bind(this);
    private _onWheelHandler: (event: WheelEvent) => void = this._onWheel.bind(this);

    constructor(appContainer: HTMLDivElement) {
        // set container and create table div
        this._appContainer = appContainer;
        this._constructTable();

        // populate table parts
        this._tableModel = new TableModel();
        this._table = new Table(this._tableModel, this._tableContainer);

        this._attachHandlers();

        // TODO: controlled by App or Server?
        this.setBackground("src/assets/images/nightstone.jpeg");

        // Add table to render queue
        render.add(this._table);
    }

    private _constructTable(): void {
        // Create table container
        this._tableContainer = document.createElement("div");
        this._tableContainer.id = "table";
        this._tableContainer.style.width = `100%`;
        this._tableContainer.style.height = `100%`;
        this._appContainer.appendChild(this._tableContainer);
    }

    public setBackground(url: string): void {
        let image: HTMLImageElement = new Image();
        image.src = url;
        image.onload = () => {
            this._tableModel.bgImage = image;
            
            // center table by default
            this._table.centerTable();
        };
    }

    private _attachHandlers(): void {
        window.addEventListener('keydown', this._onkeyDownHandler);
        window.addEventListener('resize', this._onResizeHandler);
        window.addEventListener('wheel', this._onWheelHandler);
    }

    private _onKeyDown(event: KeyboardEvent): void {
        switch (event.key) {
            case "c":
                this._table.centerTable();
                break;
            case "=":
                this._table.zoom(1.25);
                break;
            case "-":
                this._table.zoom(0.8);
                break;
            case "Up":
            case "ArrowUp":
                this._table.panBy(new Point(0,50));
                break;
            case "Down":
            case "ArrowDown":
                this._table.panBy(new Point(0,-50));
                break;
            case "Left":
            case "ArrowLeft":
                this._table.panBy(new Point(50,0));
                break;
            case "Right":
            case "ArrowRight":
                this._table.panBy(new Point(-50,0));
                break;
            default:
                break;
        }
    }

    private _onWheel(event: WheelEvent): void {
        if (event.wheelDeltaY > 10) {
            this._table.zoom(.95);
        } else if (event.wheelDeltaY < -10) {
            this._table.zoom(1 / .95);
        }
    }

    private _onResize(): void {
        this._table.resizeCanvasToParent();
    }
}
