import TableModel from "./TableModel";
import Table from "./Table";
import render from "../Render/render";

export default class TableController {
    private _appContainer: HTMLDivElement = null;
    private _tableContainer: HTMLDivElement = null;
    private _tableModel: TableModel = null;
    private _table: Table = null;

    private _onkeyPressHandler: (event: KeyboardEvent) => void = this._onKeyPress.bind(this);
    private _onResizeHandler: (event: Event) => void = this._onResize.bind(this);

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
        };
    }

    private _attachHandlers(): void {
        window.addEventListener('keypress', this._onkeyPressHandler);
        window.addEventListener('resize', this._onResizeHandler);
    }

    private _onKeyPress(event: KeyboardEvent): void {
        switch (event.key) {
            case "=":
                console.log("zooming in!");
                this._table.zoom(1.25);
                console.log(this._tableModel);

                break;
            case "-":
                console.log("zooming out!");
                this._table.zoom(0.8);
                console.log(this._tableModel);

                break;
            default:
                break;
        }
    }

    private _onResize(): void {
        this._table.resizeCanvasToParent();
    }
}
