/* AlloyTouch v0.2.5
 * By AlloyTeam http://www.alloyteam.com/
 * Github: https://github.com/AlloyTeam/AlloyTouch
 * MIT Licensed.
 */

;(function () {
    'use strict';

    if (!Date.now)
        Date.now = function () { return new Date().getTime(); };

    var vendors = ['webkit', 'moz'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        var vp = vendors[i];
        window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = (window[vp + 'CancelAnimationFrame']
                                   || window[vp + 'CancelRequestAnimationFrame']);
    }
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
        || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var lastTime = 0;
        window.requestAnimationFrame = function (callback) {
            var now = Date.now();
            var nextTime = Math.max(lastTime + 16, now);
            return setTimeout(function () { callback(lastTime = nextTime); },
                              nextTime - now);
        };
        window.cancelAnimationFrame = clearTimeout;
    }
}());

(function () {

    function bind(element, type, callback) {
        element.addEventListener(type, callback, false);
    }

    function ease(x) {
        return Math.sqrt(1 - Math.pow(x - 1, 2));
    }
 function easeInCubic (x) {
        return x * x * x;
    }
    function reverseEase(y) {
        return 1 - Math.sqrt(1 - y * y);
    }

    function preventDefaultTest(el, exceptions) {
        for (var i in exceptions) {
            if (exceptions[i].test(el[i])) {
                return true;
            }
        }
        return false;
    }

    var AlloyTouch = function (option) {

        this.element = typeof option.touch === "string" ? document.querySelector(option.touch) : option.touch;
        //this.target = this._getValue(option.target, this.element);
        //this.vertical = this._getValue(option.vertical, true);
        this.property = option.property;
        this.tickID = 0;
        //////
      /*  this.testID=1;
        var v=10;
        var th=this
        var testTick = function () {

                    var dt = new Date() - th.begintTime;
                    console.log(test.rotateZ)
                    if (dt >= 3000) {

                       test.rotateZ=2000
                        
                        return;
                    }

                    test.rotateZ = th.dvt * easeInCubic(dt / 3000) + th.startXt;
                   
                    this.testID = requestAnimationFrame(testTick);
                    //cancelAnimationFrame必须在 tickID = requestAnimationFrame(toTick);的后面
                   
                };
               
                    th.dvt = 2000 - 0;
                th.startXt=0
                    th.begintTime=new Date()
                     testTick();*/
                  
               
                //////
        this.initialValue = this._getValue(option.initialValue, 0);
        this.curValue={
            x:this.initialValue,
            y:this.initialValue
        };
        //this.target[this.property] = this.initialValue;
        this.fixed = this._getValue(option.fixed, false);
        this.sensitivity = this._getValue(option.sensitivity, 1);
        this.moveFactor = this._getValue(option.moveFactor, 1);
        this.factor = this._getValue(option.factor, 1);
        this.outFactor = this._getValue(option.outFactor, 0.3);
        this.hMin = option.hMin;
        this.hMax = option.hMax;
        this.vMin = option.vMin;
        this.vMax = option.vMax;
        this.deceleration = 0.0006;
        this.maxRegion = this._getValue(option.maxRegion, 600);
        this.springMaxRegion = this._getValue(option.springMaxRegion, 60);
        this.maxSpeed = option.maxSpeed;
        this.hasMaxSpeed = !(this.maxSpeed === void 0);
        this.lockDirection = this._getValue(option.lockDirection, true);

        var noop = function () { };
        this.change = option.change || noop;
        this.touchEnd = option.touchEnd || noop;
        this.touchStart = option.touchStart || noop;
        this.touchMove = option.touchMove || noop;
        this.touchCancel = option.touchCancel || noop;
        this.reboundEnd = option.reboundEnd || noop;
        this.animationEnd = option.animationEnd || noop;
        this.correctionEnd = option.correctionEnd || noop;
        this.tap = option.tap || noop;
        this.pressMove = option.pressMove || noop;

        this.preventDefault = this._getValue(option.preventDefault, true);
        this.preventDefaultException = { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ };
        this.hasHMin = !(this.hMin === void 0);
        this.hasHMax = !(this.hMax === void 0);
        this.hasVMin = !(this.vMin === void 0);
        this.hasVMax = !(this.vMax === void 0);
        if (this.hasHMin && this.hasHMax && this.hMin > this.hMax) {
            throw "the hMin value can't be greater than the hMax value."
        }
        if (this.hasVMin && this.hasVMax && this.vMin > this.vMax) {
            throw "the vMin value can't be greater than the vMax value."
        }
        this.isTouchStart = false;
        this.step = option.step;
        this.inertia = this._getValue(option.inertia, true);

        this._calculateIndex();

        this.eventTarget = window;
        if(option.bindSelf){
            this.eventTarget = this.element;
        }

        this._moveHandler = this._move.bind(this);
        bind(this.element, "touchstart", this._start.bind(this));
        bind(this.eventTarget, "touchend", this._end.bind(this));
        bind(this.eventTarget, "touchcancel", this._cancel.bind(this));
        this.eventTarget.addEventListener("touchmove", this._moveHandler, { passive: false, capture: false });
        this.x1 = this.x2 = this.y1 = this.y2 = null;
    };

    AlloyTouch.prototype = {
        _getValue: function (obj, defaultValue) {
            return obj === void 0 ? defaultValue : obj;
        },
        stop:function(){
            cancelAnimationFrame(this.tickID);
            this._calculateIndex();
        },
        _start: function (evt) {
            this.isTouchStart = true;
           // this.touchStart.call(this, evt, this.target[this.property]);
            cancelAnimationFrame(this.tickID);
            this._calculateIndex();
            this.startTime = new Date().getTime();
            this.x1 = this.preX = evt.touches[0].pageX;
            this.y1 = this.preY = evt.touches[0].pageY;
            //this.start = this.vertical ? this.preY : this.preX;
            this.start={
                x:this.preX,
                y:this.preY
            }
            this.touchStart.call(this, evt, this.curValue)
            this._firstTouchMove = true;
            this._preventMove = false;
            console.log(this.curValue)

        },
        _move: function (evt) {
            if (this.isTouchStart) {
                var len = evt.touches.length,
                    currentX = evt.touches[0].pageX,
                    currentY = evt.touches[0].pageY;

                if (this._firstTouchMove && this.lockDirection) {
                    var dDis = Math.abs(currentX - this.x1) - Math.abs(currentY - this.y1);
                    if (dDis > 0 ) {
                        //横向运动
                        this._hMove=true;//add
                        this._vMove=false;//add
                        this.step=400
                       
                        //this.start=this.start.x;
                        //this._preventMove = true;
                    } else if (dDis < 0 ) {
                        //纵向运动
                        this._vMove=true;//add
                         this._hMove=false;//add
                        this.step=1

                        //this.start=this.start.y;
                        //this._preventMove = true;
                    }
                    this._firstTouchMove = false;
                }
                if(this._hMove){
                   
                    var d =  (currentX - this.preX) * this.sensitivity;
                    var f = this.moveFactor;
                    if (this.hasHMax && this.curValue.x > this.hMax && d > 0) {
                        f = this.outFactor;
                    } else if (this.hasHMin && this.curValue.x < this.hMin && d < 0) {
                        f = this.outFactor;

                    }
                    d *= f;
                    this.preX = currentX;
                    this.preY = currentY;
                    if (!this.fixed) {
                        this.curValue.x += d;
                    }
                    this.change.call(this, this.curValue);
                    var timestamp = new Date().getTime();
                    if (timestamp - this.startTime > 300) {
                        this.startTime = timestamp;
                        this.start = {
                                x:this.preX,
                                y:this.preY
                            };
                    }
                    this.touchMove.call(this, evt, this.curValue);
                    console.log(this.curValue)
                    test.translateX=this.curValue.x
                }
                if(this._vMove){
                    
                        var d =  (currentY - this.preY) * this.sensitivity;
                    var f = this.moveFactor;
                    if (this.hasVMax && this.curValue.y > this.vMax && d > 0) {
                        f = this.outFactor;
                    } else if (this.hasVMin && this.curValue.y < this.vMin && d < 0) {
                        f = this.outFactor;
                    }
                    d *= f;
                    this.preX = currentX;
                    this.preY = currentY;
                    if (!this.fixed) {
                        this.curValue.y += d;
                    }
                    this.change.call(this, this.curValue);
                    var timestamp = new Date().getTime();
                    if (timestamp - this.startTime > 300) {
                        this.startTime = timestamp;
                        this.start = {
                                x:this.preX,
                                y:this.preY
                            };
                    }
                    this.touchMove.call(this, evt, this.curValue);
                    console.log(this.curValue)
                    test.translateY=this.curValue.y
                }
                /*if(!this._preventMove) {
                    var d = (this.vertical ? currentY - this.preY : currentX - this.preX) * this.sensitivity;
                    var f = this.moveFactor;
                    if (this.hasMax && this.target[this.property] > this.max && d > 0) {
                        f = this.outFactor;
                    } else if (this.hasMin && this.target[this.property] < this.min && d < 0) {
                        f = this.outFactor;
                    }
                    d *= f;
                    this.preX = currentX;
                    this.preY = currentY;
                    if (!this.fixed) {
                        this.target[this.property] += d;
                    }
                    this.change.call(this, this.target[this.property]);
                    var timestamp = new Date().getTime();
                    if (timestamp - this.startTime > 300) {
                        this.startTime = timestamp;
                        this.start = this.vertical ? this.preY : this.preX;
                    }
                    this.touchMove.call(this, evt, this.target[this.property]);
                }*/

                if (this.preventDefault && !preventDefaultTest(evt.target, this.preventDefaultException)) {
                    evt.preventDefault();
                }

                if (len === 1) {
                    if (this.x2 !== null) {
                        evt.deltaX = currentX - this.x2;
                        evt.deltaY = currentY - this.y2;

                    } else {
                        evt.deltaX = 0;
                        evt.deltaY = 0;
                    }
                    this.pressMove.call(this, evt, this.curValue);
                }
                this.x2 = currentX;
                this.y2 = currentY;
            }
        },
        _cancel: function (evt) {
            var current = this.curValue
            this.touchCancel.call(this, evt, current);
            this._end(evt);

        },
        to: function (v, time, user_ease) {
            this._to(v, this._getValue(time, 600), user_ease || ease, this.change, function (value) {
                this._calculateIndex();
                this.reboundEnd.call(this, value);
                this.animationEnd.call(this, value);
            }.bind(this));

        },
        _calculateIndex: function () {
            if (this.hasHMax && this.hasHMin) {
                this.currentPage = Math.round((this.hMax - this.curValue.x) / this.step);
            }
        },
        _endH:function(evt,current,triggerTap){
            var self = this;
           
            console.log('e')
            console.log(triggerTap)
                if (this.hasHMax && current.x > this.hMax) {
                    console.log('d1')
                    this._to(this.hMax, 200, ease, this.change, function (value) {
                        this.reboundEnd.call(this, value);
                        this.animationEnd.call(this, value);
                    }.bind(this));
                } else if (this.hasHMin && current.x < this.hMin) {
                console.log('d2')
                    this._to(this.hMin, 200, ease, this.change, function (value) {
                        this.reboundEnd.call(this, value);
                        this.animationEnd.call(this, value);
                    }.bind(this));
                } else if (this.inertia && !triggerTap ) {
                    console.log('d')
                    var dt = new Date().getTime() - this.startTime;
                    if (dt < 300) {
                        var distance = ( evt.changedTouches[0].pageX - this.start.x) * this.sensitivity,
                            speed = Math.abs(distance) / dt,
                            speed2 = this.factor * speed;
                        if(this.hasMaxSpeed&&speed2>this.maxSpeed) {
                            speed2 = this.maxSpeed;
                        }
                        var destination = current.x + (speed2 * speed2) / (2 * this.deceleration) * (distance < 0 ? -1 : 1);

                        var tRatio = 1;
                        if (destination < this.hMin ) {
                            if (destination < this.hMin - this.maxRegion) {
                                tRatio = reverseEase((current.x - this.hMin + this.springMaxRegion) / (current.x - destination));
                                destination = this.hMin - this.springMaxRegion;
                            } else {
                                tRatio = reverseEase((current.x - this.hMin + this.springMaxRegion * (this.hMin - destination) / this.maxRegion) / (current.x - destination));
                                destination = this.hMin - this.springMaxRegion * (this.hMin - destination) / this.maxRegion;
                            }
                        } else if (destination > this.hMax) {
                            if (destination > this.hMax + this.maxRegion) {
                                tRatio = reverseEase((this.hMax + this.springMaxRegion - current.x) / (destination - current.x));
                                destination = this.hMax + this.springMaxRegion;
                            } else {
                                tRatio = reverseEase((this.hMax + this.springMaxRegion * ( destination-this.hMax) / this.maxRegion - current.x) / (destination - current.x));
                                destination = this.hMax + this.springMaxRegion * (destination - this.hMax) / this.maxRegion;

                            }
                        }
                        var duration = Math.round(speed / self.deceleration) * tRatio;
                      console.log(destination+'destination')
                        self._to(Math.round(destination), duration, ease, self.change, function (value) {

                            if (self.hasHMax && value.x > self.hMax) {

                                cancelAnimationFrame(self.tickID);
                                self._to(self.hMax, 600, ease, self.change, self.animationEnd);

                            } else if (self.hasHMin && value.x < self.hMin) {

                                cancelAnimationFrame(self.tickID);
                                self._to(self.hMin, 600, ease, self.change, self.animationEnd);

                            } else {
                                if(self.step) {
                                    self._correction()
                                }else{
                                    self.animationEnd.call(self, value);
                                }
                            }

                            self.change.call(this, value);
                        });


                    } else {
                        self._correction();
                    }
                } else {
                    self._correction();
                }
        },
        _endV:function(evt,current,triggerTap){

            var self = this;
             if (this.hasVMax && current.y > this.vMax) {
                    this._to(this.vMax, 200, ease, this.change, function (value) {
                        console.log('v1')
                        this.reboundEnd.call(this, value);
                        this.animationEnd.call(this, value);
                    }.bind(this));
                } else if (this.hasVMin && current.y < this.vMin) {
                    console.log('v2')
                    this._to(this.vMin, 200, ease, this.change, function (value) {
                        this.reboundEnd.call(this, value);
                        this.animationEnd.call(this, value);
                    }.bind(this));
                } else if (this.inertia && !triggerTap ) {
                     console.log('v3')
                    var dt = new Date().getTime() - this.startTime;
                    if (dt < 300) {
                        var distance = ( evt.changedTouches[0].pageY - this.start.y) * this.sensitivity,
                            speed = Math.abs(distance) / dt,
                            speed2 = this.factor * speed;
                        if(this.hasMaxSpeed&&speed2>this.maxSpeed) {
                            speed2 = this.maxSpeed;
                        }
                        var destination = current.y + (speed2 * speed2) / (2 * this.deceleration) * (distance < 0 ? -1 : 1);
                         
                        var tRatio = 1;
                        if (destination < this.vMin ) {
                            if (destination < this.vMin - this.maxRegion) {
                                tRatio = reverseEase((current.y - this.vMin + this.springMaxRegion) / (current.y - destination));
                                destination = this.vMin - this.springMaxRegion;
                            } else {
                                tRatio = reverseEase((current.y - this.vMin + this.springMaxRegion * (this.vMin - destination) / this.maxRegion) / (current.y - destination));
                                destination = this.vMin - this.springMaxRegion * (this.vMin - destination) / this.maxRegion;
                            }
                        } else if (destination > this.vMax) {
                            if (destination > this.vMax + this.maxRegion) {
                                tRatio = reverseEase((this.vMax + this.springMaxRegion - current.y) / (destination - current.y));
                                destination = this.vMax + this.springMaxRegion;
                            } else {
                                tRatio = reverseEase((this.vMax + this.springMaxRegion * ( destination-this.vMax) / this.maxRegion - current.y) / (destination - current.y));
                                destination = this.vMax + this.springMaxRegion * (destination - this.vMax) / this.maxRegion;

                            }
                        }
                        var duration = Math.round(speed / self.deceleration) * tRatio;
                         console.log(destination+'destination')
                        self._to(Math.round(destination), duration, ease, self.change, function (value) {

                            if (self.hasVMax && value.y > self.vMax) {

                                cancelAnimationFrame(self.tickID);
                                self._to(self.vMax, 600, ease, self.change, self.animationEnd);

                            } else if (self.hasVMin && value.y < self.vMin) {

                                cancelAnimationFrame(self.tickID);
                                self._to(self.vMin, 600, ease, self.change, self.animationEnd);

                            } else {
                                if(self.step) {
                                    self._correction()
                                }else{
                                    self.animationEnd.call(self, value);
                                }
                            }

                            self.change.call(this, value);
                        });


                    } else {
                        self._correction();
                    }
                } else {
                    self._correction();
                }
        },
        _end: function (evt) {

            if (this.isTouchStart) {
                this.isTouchStart = false;
                var self = this,
                    current = this.curValue,
                    triggerTap = (Math.abs(evt.changedTouches[0].pageX - this.x1) < 30 && Math.abs(evt.changedTouches[0].pageY - this.y1) < 30);
                if (triggerTap) {
                    this.tap.call(this, evt, current);
                }
                if (this.touchEnd.call(this, evt, current, this.currentPage) === false) return;
                if(this._hMove){
                    this._endH.call(this,evt,current,triggerTap)
                }
                if(this._vMove){
                    this._endV.call(this,evt,current,triggerTap)
                }

                
                // if (this.preventDefault && !preventDefaultTest(evt.target, this.preventDefaultException)) {
                //     evt.preventDefault();
                // }

            }
            this.x1 = this.x2 = this.y1 = this.y2 = null;

        },
        _to: function (value, time, ease, onChange, onEnd) {

            if (this.fixed) return;
           // var el = this.target,
                //property = this.property;
            var current = this.curValue
            if(this._hMove){

                var dv = value - current.x;
                var startX=current.x
                var beginTime = new Date();
                var self = this;
                var toTick = function () {

                    var dt = new Date() - beginTime;
                    if (dt >= time) {

                        current.x = value;
                        onChange && onChange.call(self, current);
                        onEnd && onEnd.call(self, current);
                        return;
                    }

                    current.x = dv * ease(dt / time) + startX;
                    test.translateX=current.x
                    console.log(current)
                    self.tickID = requestAnimationFrame(toTick);
                    //cancelAnimationFrame必须在 tickID = requestAnimationFrame(toTick);的后面
                    onChange && onChange.call(self, current); 
                };
                toTick();
            }
            if(this._vMove){
                console.log(value+'value')
                var dv = value - current.y;
                var startY=current.y
                var beginTime = new Date();
                var self = this;
                var toTick = function () {

                    var dt = new Date() - beginTime;
                    if (dt >= time) {
                        current.y = value;
                        onChange && onChange.call(self, current);
                        onEnd && onEnd.call(self, current);
                        return;
                    }
                    current.y = dv * ease(dt / time) + startY;
                     test.translateY=current.y
                    console.log(current)
                    self.tickID = requestAnimationFrame(toTick);
                    //cancelAnimationFrame必须在 tickID = requestAnimationFrame(toTick);的后面
                    onChange && onChange.call(self, current); 
                };
                toTick();
            }
            
        },
        _correction: function () {
            if (this.step === void 0) return;
            //var el = this.target,
                //property = this.property;
            var value1 = this.curValue;
            if(this._hMove){
                value=value1.x
            }
            if(this._vMove){
                value=value1.y
            }
            var rpt = Math.floor(Math.abs(value / this.step));
            var dy = value % this.step;
            if (Math.abs(dy) > this.step / 2) {
                this._to((value < 0 ? -1 : 1) * (rpt + 1) * this.step, 400, ease, this.change, function (value) {
                    this._calculateIndex();
                    console.log(this.currentPage+'curpage')
                    this.correctionEnd.call(this, value1);
                    this.animationEnd.call(this, value1);
                }.bind(this));
            } else {
                this._to((value < 0 ? -1 : 1) * rpt * this.step, 400, ease, this.change, function (value) {
                    this._calculateIndex();
                    console.log(this.currentPage+'curpage')
                    this.correctionEnd.call(this, value1);
                    this.animationEnd.call(this, value1);
                }.bind(this));
            }
        }
    };

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = AlloyTouch;
    } else {
        window.AlloyTouch = AlloyTouch;
    }

})();