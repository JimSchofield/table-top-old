import Point from "../Util/Point";
import Render from "../Render/render";
import StageModel from "./StageModel";
import Stage from "./Stage";

export default class StageController {
    private _appContainer: HTMLDivElement = null;
    private _stageContainer: HTMLDivElement = null;
    private _stageModel: StageModel = null;
    private _stage: Stage = null;
    private _lastMousePos: Point = null;
    private _currentMouse: Point = null;
    private _isDragging: boolean = false;

    private _onkeyDownHandler: ( event: KeyboardEvent ) => void = this._onKeyDown.bind(this);
    private _onkeyUpHandler: ( event: KeyboardEvent ) => void = this._onKeyUp.bind(this);
    private _onResizeHandler: (event: Event) => void = this._onResize.bind( this );
    private _onWheelHandler: (event: WheelEvent) => void = this._onWheel.bind( this );
    private _onWheelDownStartPanningHandler: ( event: MouseEvent ) => void = this._onWheelDownStartPanning.bind(this);
    private _onMouseMovePanHandler: ( event: MouseEvent ) => void = this._onMouseMovePan.bind(this);
    private _onSpaceBarDownClickHandler: (event: MouseEvent) => void = this._onSpaceBarDownClick.bind(this);

    constructor(appContainer: HTMLDivElement) {
        // set container and create stage div
        this._appContainer = appContainer;
        this._constructStage();

        // populate stage parts
        this._stageModel = new StageModel();
        this._stage = new Stage(this._stageModel, this._stageContainer);

        this._attachHandlers();

        // TODO: controlled by App or Server?
        this.setBackground("src/assets/images/nightstone.jpeg");

        // Add stage to render queue
        Render.add(this._stage);
    }

    private _constructStage(): void {
        // Create stage container
        this._stageContainer = document.createElement("div");
        this._stageContainer.id = "stage";
        this._stageContainer.style.width = `100%`;
        this._stageContainer.style.height = `100%`;
        this._appContainer.appendChild(this._stageContainer);
    }

    public setBackground(url: string): void {
        let image: HTMLImageElement = new Image();
        image.src = url;
        image.onload = () => {
            this._stageModel.bgImage = image;

            // center stage by default
            this._stage.centerStage();
        };
    }

    private _attachHandlers(): void {
        window.addEventListener("keydown", this._onkeyDownHandler);
        window.addEventListener("keyup", this._onkeyUpHandler);
        window.addEventListener("resize", this._onResizeHandler);
        window.addEventListener("wheel", this._onWheelHandler);
        this._stage.canvasRef.addEventListener( "mousedown", this._onWheelDownStartPanningHandler );
    }

    private _onKeyDown(event: KeyboardEvent): void {
        switch (event.key) {
            case "c":
                this._stage.centerStage();
                break;
            case "=":
                this._stage.zoom(1.25);
                break;
            case "-":
                this._stage.zoom(0.8);
                break;
            case "0":
                this._stage.resetZoom();
                break;
            case "Up":
            case "ArrowUp":
                this._stage.panBy(new Point(0, 50));
                break;
            case "Down":
            case "ArrowDown":
                this._stage.panBy(new Point(0, -50));
                break;
            case "Left":
            case "ArrowLeft":
                this._stage.panBy(new Point(50, 0));
                break;
            case "Right":
            case "ArrowRight":
                this._stage.panBy(new Point(-50, 0));
                break;
            case " ":
                if (this._isDragging) {
                    return;
                }
                this._onSpaceBarDownStartPanning();
                break;
            default:
                break;
        }
    }

    private _onKeyUp(event: KeyboardEvent): void {
        switch(event.key) {
            case ' ':
                this._onSpaceBarUpStopPanning();
                break;
            default:
                break;
        }
    }

    private _onWheel(event: WheelEvent): void {
        if (event.wheelDeltaY > 10) {
            this._stage.zoom(0.9);
        } else if (event.wheelDeltaY < -10) {
            this._stage.zoom(1 / 0.9);
        }
    }

    private _onWheelDownStartPanning(event: MouseEvent): void {
        if (event.button === 1) {
            document.body.style.cursor = "move";
            this._lastMousePos = Point.fromMouseEvent(event);
            window.addEventListener("mousemove", this._onMouseMovePanHandler);
        }
    }

    private _onMouseMovePan(event: MouseEvent): void {
        console.log('onMouseMovePan');
        if (event.buttons == 0) {
            /*
            * Occasionally this event is not triggered and the pan listener is not
            * removed.  This results in a jump to the mouse click on the next pan
            * attempt.  Seems to be browser bug
            */
            window.removeEventListener( "mousemove", this._onMouseMovePanHandler );
            console.log('exit panning');
            document.body.style.cursor = "default";
        } else {
            document.body.style.cursor = "move";          
            const client = Point.fromMouseEvent(event);
            const delta = Point.subtract(client, this._lastMousePos);
            this._stageModel.offset.add(delta);
            this._lastMousePos = client;
        }
    }

    private _onSpaceBarDownStartPanning(): void {
        // Attached a listener to wait for click, and then attach move pan handler
        this._isDragging = true;
        document.body.style.cursor = "move";
        window.addEventListener("mousedown", this._onSpaceBarDownClickHandler);
    }

    private _onSpaceBarDownClick(event: MouseEvent): void {
        this._lastMousePos = Point.fromMouseEvent(event);
        window.addEventListener("mousemove", this._onMouseMovePanHandler);
    }

    private _onSpaceBarUpStopPanning(): void {
        this._isDragging = false;
        window.removeEventListener('mousedown', this._onSpaceBarDownClickHandler);
    }

    private _onResize(): void {
        this._stage.resizeCanvasToParent();
    }
}
