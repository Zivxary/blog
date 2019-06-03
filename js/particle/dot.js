import { Particle } from './particle.js';

export class DotParticle extends Particle {

    _defaultOptions() {
        let options = super._defaultOptions();
        options['count'] = 100;
        options['speed'] = 1;
        options['dist'] = 75;
        return options;
    }

    _init() {
        let dots = [];
        for (let i = 0; i < this._options.count; i++) {
            dots.push(this._initDot());
        }
        this._dots = dots;
    }

    _initDot() {
        let dot = {};
        let speed = this._options.speed
        dot.X = Math.random() * this._canvas.width;
        dot.Y = Math.random() * this._canvas.height;
        dot.moveX = (Math.random() - 0.5) * 2 * speed;
        dot.moveY = Math.sqrt(speed * speed - dot.moveX * dot.moveX) * (Math.random() >= 0.5 ? 1 : -1);
        return dot;
    }

    _draw() {
        for (let i = 0; i < this._dots.length; i++) {
            let dot = this._dots[i];
            this._ctx.beginPath();
            this._ctx.arc(dot.X, dot.Y, 3, 0, Math.PI * 2, true);
            this._ctx.fill();
            dot.X = dot.X - dot.moveX;
            dot.Y = dot.Y - dot.moveY;
            if (dot.X < 0
                || this._canvas.width < dot.X
                || dot.Y < 0
                || this._canvas.height < dot.Y
            ) {
                this._dots[i] = this._resetDot(dot);
            }
        }
        for (let i = 0; i < this._dots.length; i++) {
            let dot1 = this._dots[i];
            for (let j = i + 1; j < this._dots.length; j++) {
                let dot2 = this._dots[j];
                let dX = dot1.X - dot2.X;
                let dY = dot1.Y - dot2.Y;
                let dist = Math.sqrt(dX * dX + dY * dY);
                if (dist < this._options.dist) {
                    this._ctx.moveTo(dot1.X, dot1.Y);
                    this._ctx.lineTo(dot2.X, dot2.Y);
                    this._ctx.stroke();
                }
            }
        }
    }

    _resetDot(dot) {
        let speed = this._options.speed;
        let random = Math.random();
        if (random >= 0.5) {
            if (random >= 0.75) {
                dot.X = Math.random() * this._canvas.width;
                dot.Y = 0;
                dot.moveX = (Math.random() - 0.5) * 2 * speed;
                dot.moveY = -Math.sqrt(speed * speed - dot.moveX * dot.moveX);
            } else {
                dot.X = Math.random() * this._canvas.width;
                dot.Y = this._canvas.height;
                dot.moveX = (Math.random() - 0.5) * 2 * speed;
                dot.moveY = Math.sqrt(speed * speed - dot.moveX * dot.moveX);
            }
        } else {
            if (random >= 0.25) {
                dot.X = 0;
                dot.Y = Math.random() * this._canvas.height;
                dot.moveY = (Math.random() - 0.5) * 2 * speed;
                dot.moveX = -Math.sqrt(speed * speed - dot.moveY * dot.moveY);
            } else {
                dot.X = this._canvas.width;
                dot.Y = Math.random() * this._canvas.height;
                dot.moveY = (Math.random() - 0.5) * 2 * speed;
                dot.moveX = Math.sqrt(speed * speed - dot.moveY * dot.moveY);
            }
        }
        return dot;
    }
}
