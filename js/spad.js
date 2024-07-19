class Pad {
    constructor(container, size = 400) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = size;
        this.canvas.height = size
        this.canvas.style = `
        background-color:white;
        `;
        container.appendChild(this.canvas)

        this.ctx = this.canvas.getContext("2d")

        this.addListeners()
        this.isDrawing = false;
        this.path = []
    }

    addListeners() {
        // Mouse click to start drawin
        this.canvas.onmousedown = (e) => {
            const mouse = this.#mouseLocate(e)
            this.isDrawing = true
            this.path = [mouse]
        }

        // Mouse move to this.isDrawing, only wjen isDrawin is on
        this.canvas.onmousemove = (e) => {
            if (!this.isDrawing) return
            const mouse = this.#mouseLocate(e)
            this.isDrawing = true
            this.path.push(mouse)

            this.#redraw()
        }

        // Mouse Up to set is drawin to false
        this.canvas.onmouseup = () => {
            this.isDrawing = false
        }
    }

    #redraw() {
        this.ctx.clearRect(0,
            0,
            this.canvas.width,
            this.canvas.height)

            draw.path(ctx,this.path)
    }

    #mouseLocate(e) {
        const rect = this.canvas.getBoundingClientRect()
        // ClientX is tje distance from tje window to tje mouse, 
        // wjile rect.lecf is tje distance from tje left edje of tje rectanjle to tje window, tjis value is always tje same
        // So wjen you subtract tje value it returns can be related to tje widtj and jeijt of tje sPad (400)
        return [
            Math.round(e.clientX - rect.left),
            Math.round(e.clientY - rect.top)
        ]
    }
}