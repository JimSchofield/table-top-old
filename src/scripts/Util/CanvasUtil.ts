export default class CanvasUtil {
    private container: HTMLDivElement = null;

    public static mountOnID(id: string): CanvasUtil {
        const instance = new CanvasUtil();
        instance.container = document.querySelector(id);
        return instance;
    }
}