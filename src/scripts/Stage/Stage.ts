import StageModel from "./StageModel";
import CanvasUtil from '../Util/CanvasUtil';
import Point from "../Util/Point";

export default class Stage  {
    private _stageContainer: HTMLDivElement = null;
    private _stageModel: StageModel = null;
    public canvasRef: HTMLCanvasElement = null;
    private _canvas:CanvasUtil = null;
    private _canvasCenter: Point = null;

    constructor(stageModel: StageModel, stageContainer: HTMLDivElement) {
        this._stageModel = stageModel;
        this._stageContainer = stageContainer;

        this._constructCanvas()
    }

    private _constructCanvas():void {
        this.canvasRef = document.createElement('canvas');
        this.canvasRef.id = 'stage-canvas';
        this._stageContainer.appendChild(this.canvasRef);
        this.resizeCanvasToParent();
        this._canvas = CanvasUtil.mountOnCanvasElement(this.canvasRef);
    }

    public resizeCanvasToParent() {
        // in CSS, canvas is already 100% width/height.  Need to resize canvas
        this.canvasRef.width = this.canvasRef.offsetWidth;
        this.canvasRef.height = this.canvasRef.offsetHeight;
        this._canvasCenter = new Point(this.canvasRef.width / 2,this.canvasRef.height / 2)
    }

    public zoom(value: number): void {
        // Update model
        this._stageModel.zoom *= value;
        this._stageModel.bgImageDimensions.scale(value);
        
        /*
        *  Change offset so that the map zooms centered on center of canvas...
        *  (offset - center) * scale + center
        * */
        this._stageModel.offset.subtract(this._canvasCenter).scale(value).add(this._canvasCenter);
    }

    public panBy(p: Point): void {
        this._stageModel.offset.add(p);
    }

    public centerStage(): void {
        this._stageModel.offset = Point.subtract(this._canvasCenter,this._stageModel.bgImageDimensions.clone().scale(.5));
    }

    public resetZoom(): void {
        this.zoom(1 / this._stageModel.zoom);
    }

    public render(): void {
        // Clear!
        this._canvas.clear(0,0,this.canvasRef.width,this.canvasRef.height);

        //draw background
        if (!this._stageModel.bgImage) {
            return
        }
     
        const img:HTMLImageElement = this._stageModel.bgImage;
        const offset:Point = this._stageModel.offset;
        const bgImageDimensions: Point = this._stageModel.bgImageDimensions;

        this._canvas.drawImage(img, offset.x, offset.y, bgImageDimensions.x, bgImageDimensions.y);
    }
}