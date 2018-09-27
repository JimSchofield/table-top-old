import "../styles/index.scss";

import EventController from "./Events/EventController";
import TableController from "./Table/TableController";
import render from "./Render/render";

class App {
    private _container: HTMLDivElement = null;
    private _eventController: EventController = null;
    private _tableController: TableController = null;

    constructor() {
        // engage!
        this.createAppContainer()
            .createChildren()
            .init();
    }

    private createAppContainer(): this {
        this._container = document.createElement("div");
        this._container.id = "App";
        this._container.style.cssText = `
            width: 100%;
            height: 100vh;        
        `
        document.body.appendChild(this._container);

        return this;
    }

    private createChildren(): this {
        this._eventController = new EventController();
        this._tableController = new TableController(this._container);

        return this;
    }

    private init(): this {
        render.init();

        return this;
    }
}

console.clear();

new App();
