class Render {

    private renderQueue: { render: () => void }[] = [];

    public init(): void {
        this.loop();
    }

    private loop(): void {
        for (let i = 0; i < this.renderQueue.length; i ++) {
            const viewToRender = this.renderQueue[i];
            viewToRender.render();
        }

        requestAnimationFrame(this.loop.bind(this));
    }

    public add(viewToRender: { render: () => void}): void {
        this.renderQueue.push(viewToRender);
    }
}

export default new Render();