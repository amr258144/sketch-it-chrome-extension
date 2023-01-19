console.log('Chrome Extension go? content script');

chrome.runtime.onMessage.addListener(gotMessage);

var s = function(sketch) {
    let previousState;

    let stateIndex = 0;
    let state = [];

    sketch.setup = function() {
        document.body.style.userSelect = 'none';
        let h = document.body.clientHeight;
        let c = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        c.position(0, 0);
        c.style('pointer-events', 'none');
        sketch.clear();
        saveState();
    }

    sketch.draw = function() {
        sketch.stroke(0);
        sketch.strokeWeight(4);
        if(sketch.mouseIsPressed) {
            sketch.line(sketch.mouseX, sketch.mouseY, sketch.pmouseX, sketch.pmouseY);
        }
    }

    sketch.keyPressed = function(e) {
        if(e.ctrlKey && e.keyCode === 90) {
            undoToPreviousState();
        }
    }

    sketch.mousePressed = function() {
        saveState();
    }

    function undoToPreviousState() {
        if (!state || !state.length || stateIndex === 0) {
            return;
        }

        stateIndex--;

        sketch.clear();
        sketch.image(state[stateIndex], 0, 0);
    }

    function saveState() {
        stateIndex++;

        sketch.loadPixels();
        state.push(sketch.get())
    }
};

function gotMessage(msg, sender, sendResponse) {
    if(msg.text === 'stop') {
        p5RemoveHack();
        return;
    }

    var myp5 = new p5(s);
}

function p5RemoveHack() {
    if (window.p5 && p5.instance) {
        p5.instance.remove();
        p5.instance = window.setup = window.draw = null;
    } else {
        const canv = document.querySelector('canvas');
        console.log(canv);
        canv && canv.remove();
    }
}

