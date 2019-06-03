export class Particle {

    constructor(canvasId, options) {
        this._canvas = document.getElementById(canvasId);
        this._ctx = this._canvas.getContext('2d');
        this._options = this._initOptions(options ? options : {});
        this._isRun = false;
        this._animId = 0;
        this._init();
    }

    _init() {

    }

    _defaultOptions() {
        return {};
    }

    _initOptions(options) {
        let result = {};
        let defaultOptions = this._defaultOptions();
        for (let val in defaultOptions) {
            result[val] = options[val] || defaultOptions[val];
        }
        return result;
    }

    _reload() {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._draw();
        this._animId = requestAnimationFrame(() => this._reload());
    }

    _draw() { }

    start() {
        if (this._isRun) {
            return;
        }
        this._isRun == true;
        this._reload();
    }

    stop() {
        if (!this._isRun) {
            return;
        }
        this._isRun = false;
        cancelAnimationFrame(this._animId);
    }

    clear() {
        this.stop();
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }
}