var canvas = document.createElement("canvas")
        var context = canvas.getContext("2d")
        document.body.appendChild(canvas)

        var dpr = window.devicePixelRatio || 1 // falling back to 1
        canvas.style.width = window.innerWidth + "px"
        canvas.style.height = window.innerHeight + "px"
        canvas.setAttribute("width", Math.floor(window.innerWidth * dpr))
        canvas.setAttribute("height", Math.floor(window.innerHeight * dpr))

        context.scale(dpr, dpr)
        context.lineWidth = 1
        context.lineJoin = context.lineCap = "round"


        var up = 0
        var down = 1

        var pen = { x: -1, y: -1, state: up }


        function start(event) {
            pen.state = down
            pen.x = event.x
            pen.y = event.y
        }

        function move(event) {
            if (pen.state == down) {
                if (Math.abs(pen.x - event.x) > 0 || Math.abs(pen.y - event.y) > 0) {
                    context.beginPath();
                    context.moveTo(pen.x, pen.y);
                    context.lineTo(event.x, event.y);
                    context.closePath();
                    context.stroke();

                    pen.x = event.x
                    pen.y = event.y
                }
            }
        }

        function end(event) {
            if (pen.state == down) {
                if (event.x != 0 || event.y != 0) {
                    context.beginPath();
                    context.moveTo(pen.x, pen.y);
                    context.lineTo(event.x, event.y);
                    context.closePath();
                    context.stroke();

                    pen.x = event.x
                    pen.y = event.y
                }
                context.stroke()
                pen.state = up
            }
        }

        canvas.addEventListener("pointerdown", start)

        canvas.addEventListener("pointermove", move)

        canvas.addEventListener("pointerup", end)
        canvas.addEventListener("pointerenter", end)
        canvas.addEventListener("pointercancel", end)
        canvas.addEventListener("pointerout", end)
        canvas.addEventListener("pointerleave", end)