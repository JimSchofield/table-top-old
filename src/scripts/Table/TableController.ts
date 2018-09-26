import TableModel from "./TableModel";
import Table from "./Table";

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

        //TESTING drawing
        const newImage:HTMLImageElement = new Image();
        newImage.src = 'src/assets/images/nightstone.jpeg';
        newImage.onload = () => {
            this._table.drawAPicture(newImage,0,0,newImage.width,newImage.height);
        }
    }

    private _constructTable(): void {
        // Create table container
        this._tableContainer = document.createElement('div')
        this._tableContainer.id = 'table';
        this._tableContainer.style.width = `${window.innerWidth}px`;
        this._tableContainer.style.height = `${window.innerHeight}px`;
        this._appContainer.appendChild(this._tableContainer);
    }
}