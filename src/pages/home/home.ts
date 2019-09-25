import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { GlobalService } from '../../services/global.service';

declare var Winwheel: any;

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage implements OnInit{
	public hiddenVal: any;
	public height: any = 300;
	public width: any = 300;
	public wheelPower = 1;
	
	constructor(
		public navCtrl: NavController,
		public globalService: GlobalService
	) {
		// this.height = this.platform.height();
		// this.width = this.platform.width();
	}
	
	ngOnInit() {
		this.globalService.theWheel = new Winwheel({
			'numSegments'  : 8,         // Number of segments
			'outerRadius'  : 170,       // The size of the wheel.
			'responsive'   : true,
			'centerX'      : 180,       // Used to position on the background correctly.
			'centerY'      : 180,
			'textFontSize' : 20,        // Font size.
			'segments'     :            // Definition of all the segments.
			[
			   {'fillStyle' : '#eae56f', 'text' : 'Prize 1'},
			   {'fillStyle' : '#89f26e', 'text' : 'Prize 2'},
			   {'fillStyle' : '#7de6ef', 'text' : 'Prize 3'},
			   {'fillStyle' : '#e7706f', 'text' : 'Prize 4'},
			   {'fillStyle' : '#eae56f', 'text' : 'Prize 5'},
			   {'fillStyle' : '#89f26e', 'text' : 'Prize 6'},
			   {'fillStyle' : '#7de6ef', 'text' : 'Prize 7'},
			   {'fillStyle' : '#e7706f', 'text' : 'Prize 8'}
			],
			'animation' :               // Definition of the animation
			{
				'type'     : 'spinToStop',
				'duration' : 5,
				'spins'    : 8,
				'callbackFinished' : window['alertPrize']
			}
		});

		setInterval(() => {
			this.hiddenVal = new Date().toISOString();
		}, 5000);
	}

	public onSpin() {
		// Ensure that spinning can't be clicked again while already running.
		if (this.globalService.wheelSpinning == false) {
			// Based on the power level selected adjust the number of spins for the wheel, the more times is has
			// to rotate with the duration of the animation the quicker the wheel spins.
			if (this.wheelPower == 1) {
				this.globalService.theWheel.animation.spins = 3;
			} else if (this.wheelPower == 2) {
				this.globalService.theWheel.animation.spins = 8;
			} else if (this.wheelPower == 3) {
				this.globalService.theWheel.animation.spins = 15;
			}
			// Begin the spin animation by calling startAnimation on the wheel object.
			this.globalService.theWheel.startAnimation();
			// Set to true so that power can't be changed and spin button re-enabled during
			// the current animation. The user will have to reset before spinning again.
			this.globalService.wheelSpinning = true;
		}
	}
}
