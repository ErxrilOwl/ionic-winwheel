import { Injectable } from "@angular/core";

@Injectable()
export class GlobalService {
    public prize: any;
    public wheelSpinning: boolean = false;
    public theWheel: any;

    constructor() {
        window['alertPrize'] = segment => {
            this.prize = segment.text;
            this.wheelSpinning = false;
            this.onCallFunction(); 
        }
    }

    public onCallFunction() {
        setTimeout(() => {
            this.theWheel.stopAnimation(false);
            this.theWheel.rotationAngle = 0;
            this.theWheel.draw();   
        }, 1200);
        alert(this.prize);
    }
}