import TableModel from "./TableModel";
import Table from "./Table";
import render from '../Render/render';

export default class TableController {
    private _appContainer:HTMLDivElement = null;
    private _tableContainer: HTMLDivElement = null;
    private _tableModel: TableModel = null;
    private _table: Table = null;

    constructor(appContainer: HTMLDivElement) {
        // set container and create table div
        this._appContainer = appContainer;
        this._constructTable();

        // populate table parts
        this._tableModel = new TableModel();
        this._table = new Table(this._tableModel, this._tableContainer);

        // TO BE CHANGED INTO REGISTERING RENDER
        this.setBackground('src/assets/images/nightstone.jpeg');

        // Add table to render queue
        render.add(this._table);
    }

    private _constructTable(): void {
        // Create table container
        this._tableContainer = document.createElement('div')
        this._tableContainer.id = 'table';
        this._tableContainer.style.width = `${window.innerWidth}px`;
        this._tableContainer.style.height = `${window.innerHeight}px`;
        this._appContainer.appendChild(this._tableContainer);
    }

    public setBackground(url: string): void {
        let image: HTMLImageElement = new Image();
        image.src = url;
        image.onload = () => {
            this._tableModel.bgImage = image;
        }
    }
}