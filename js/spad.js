class Pad {
    constructor(container, size = 400) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = size;
        this.canvas.height = size
        this.canvas.style = `
        background-color:white;
        `;
        this.undoBtn = document.createElement("button");
        container.appendChild(this.canvas)
        this.undoBtn.innerText = "Undo"
        this.undoBtn.setAttribute("id","undo");
        container.appendChild(this.undoBtn)
        this.input = document.querySelector("[input]")
        this.submit = document.querySelector("[button]")

        this.ctx = this.canvas.getContext("2d")

        this.isDrawing = false;
        this.paths = []

        this.#redraw()

        this.color = "Blue"
        this.addListeners()
    }

    addListeners() {
        this.undoBtn.addEventListener("click", () => {
            console.log(this.paths.length)
            if (this.paths.length>0) {
                this.paths.pop()
                this.undoBtn.disabled = false
                this.#redraw()
            } else if (this.paths.length <= 1) {
                alert("Notin to Undo")
                this.undoBtn.disabled = true
            }
        })

        // Mouse click to start drawin
        this.canvas.onmousedown = (e) => {
            const mouse = this.#mouseLocate(e)
            this.isDrawing = true
            this.paths.push( [mouse] )
        }

        // Mouse move to this.isDrawing, only wjen isDrawin is on
        this.canvas.onmousemove = (e) => {
            if (!this.isDrawing) return
            const mouse = this.#mouseLocate(e)
            const lastP = this.paths[this.paths.length-1]
            lastP.push(mouse)
            this.#redraw()
        }

        // Mouse Up to set is drawin to false
        this.canvas.onmouseup = () => {
            this.isDrawing = false
        }
        
        //Listeners for mobile devices
        this.canvas.ontouchstart = (e) => {
            const loc = e.touches[0]
            this.canvas.onmousedown(loc)
        }
        this.canvas.ontouchmove = (e) => {
            const loc = e.touches[0]
            this.canvas.onmousemove(loc)
        }
        this.canvas.ontouchend = (e) => {
            const loc = e.touches[0]
            this.canvas.onmouseup(loc)
        }

        // Undo Button Functionality
        this.undoBtn.onclick = () => {
            this.paths.pop()
            this.#redraw()
        }





        // Set Draw Colour
        this.submit.onclick = (e) => {
            if (!this.input.value) alert()
            this.color = this.input.value
            this.input.value=""
        }
    }

    #redraw() {
        this.ctx.clearRect(0,
            0,
            this.canvas.width,
            this.canvas.height)

            draw.paths(this.ctx,this.paths, this.color)
            if (this.paths.length>0) {
                this.undoBtn.disabled = false
            } else {
                this.undoBtn.disabled = true
            }
            // this.paths.length>0 ? this.undoBtn.disabled = false : this.undoBtn.disabled = false
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