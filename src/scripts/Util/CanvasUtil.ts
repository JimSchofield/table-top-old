export default class CanvasUtil {
    private _canvasRef: HTMLCanvasElement = null;
    private _context: CanvasRenderingContext2D = null;

    public static mountOnCanvasElement(canvasRef: HTMLCanvasElement): CanvasUtil {
        const instance = new CanvasUtil();
        instance._canvasRef = canvasRef;
        instance._context = canvasRef.getContext('2d');
        return instance;
    }

    public drawImage(img: HTMLImageElement, x: number, y: number, width: number, height: number): void {
        this._context.drawImage(img,x,y,width,height);
    }
}