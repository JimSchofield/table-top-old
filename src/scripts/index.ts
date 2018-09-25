import "../styles/index.scss";

import EventController from './Events/EventController';
import TableController from "./Table/TableController";

class App {
    private _container: HTMLDivElement = null;
    private _eventController: EventController = null;
    private _tableController: TableController = null;

    constructor() {

        // create app container
        this._container = document.createElement('div');
        this._container.id = 'App';
        document.body.appendChild(this._container);

        // kick off children
        this._eventController = new EventController();
        this._tableController = new TableController(this._container);
    }
}

new App();
