var streams = [];
var symbolSize = 30;
var x = 0;

function setup() {
    createCanvas(3000, 1500);
    background(0);
    textSize(symbolSize);

    for (let a = 0; a < width / symbolSize; a++) {
        streams.push(new Stream());
        streams[a].generateSymbols(x, random(height));
        x += symbolSize;
    }
}

function draw() {
    background(0, 140);
    streams.forEach(function(stream) {
        stream.render();
    });
}

function Symbol(x, y, speed, first) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.first = first;
    this.value;
    this.switchInterwal = round(random(2, 20));

    this.setToRandomSymbol = function() {
        if (frameCount % this.switchInterwal == 0) {
            this.value = String.fromCharCode(0x30A0 + round(random(0, 96)));
        }
    }

    this.render = function() {
        fill(0, 255, 70);
        text(this.value, this.x, this.y);
        this.rain();
        this.setToRandomSymbol();
    }

    this.rain = function() {
        this.y = (this.y >= height) ? 0 : this.y += this.speed;
    }
}

function Stream() {
    this.symbols = [];
    this.totalSymbols = round(random(5, 30));
    this.speed = random(5, 10);

    this.generateSymbols = function(x, y) {
        let first = round(random(0, 3)) == 1;
        for (let a = 0; a <= this.totalSymbols; a++) {
            let symbol = new Symbol(x, y, this.speed, first);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            y -= symbolSize;
            first = false;
        }
    }

    this.render = function () {
        for (let a = 0; a < this.symbols.length; a ++) {
            if (this.symbols[a].first) {
                fill(220, 255, 220);
            }
            else {
                fill(0, 255 - a * 5, 70 - a * 3);
            }
            text(this.symbols[a].value, this.symbols[a].x, this.symbols[a].y);
            this.symbols[a].rain();
            this.symbols[a].setToRandomSymbol();
        };
    }
}