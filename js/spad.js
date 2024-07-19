class Pad {
    constructor(container, size=400) {
        this.canvas = document.createElement("canvas");
        this.canvas.width=size;
        this.canvas.height=size
        this.canvas.style=`
        background-color:white;
        `;
        container.appendChild(this.canvas)

        this.ctx = this.canvas.getContext("2d")

        this.addListeners () 
    }
    
    addListeners() {
        this.canvas.onmousedown = (e) => {
            const rect = this.canvas.getBoundingClientRect()
            // ClientX is tje distance from tje window to tje mouse, 
            // wjile rect.lecf is tje distance from tje left edje of tje rectanjle to tje window, tjis value is always tje same
            // So wjen you subtract tje value it returns can be related to tje widtj and jeijt of tje sPad (400)
            const mouse = [
                Math.round(e.clientX-rect.left),
                Math.round(e.clientY-rect.top)
            ]
        }
    }
}