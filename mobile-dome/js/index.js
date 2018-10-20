class Tabimg {
    constructor() {
        this.timer = null;
        this.index = 0;
        this.events = [];
    }

    init(opt){
        let _this = this;
        _this.setting={
            wrap : null,
            item : null,
            Btn : null,
            itemBtn : null
        }
        _this.extend(opt,_this.setting);

        _this.play();
        _this.customBtn();
    }

    play() {
        let _this = this;
        _this.timer = setInterval(() => {
            _this.index++;
            _this.moveImg(_this.index);
        }, 4000);
    }

    moveImg(index) {
        let _this = this;
        let iNum = _this.setIndex(index);

        for (var i = 0; i < _this.setting.item.length; i++) {
            _this.setting.item[i].classList.remove('active');
            _this.setting.itemBtn[i].classList.remove('active');
        }
        _this.setting.item[iNum].classList.add('active');
        _this.setting.itemBtn[iNum].classList.add('active');
    }

    customBtn() {
        let _this = this;
        for (var i = 0; i < _this.setting.itemBtn.length; i++) {
            _this.setting.itemBtn[i].dataset.num = i;
            _this.bindEvent(_this.setting.itemBtn[i], 'click', function a(e) {
                clearInterval(_this.timer);
                _this.handleClick.call(_this, e);
            });
        }
    }

    bindEvent(obj, event, fn) {
        obj.addEventListener(event, fn, false);
        this.events.push({
            event,
            obj,
            fn
        })
    }

    removeEvent(obj, event, fn) {
        if (fn) {
            obj.removeEventListener(event, fn);
        } else {
            this.events.forEach(item => {
                item.obj.removeEventListener(item.event, item.fn);
            })
        }
    }

    setIndex(n) {
        let num = n;
        if (num >= this.setting.item.length) {
            num = 0;
        }

        if (num < 0) {
            num = this.setting.item.length - 1;
        }

        this.index = num;
        return num;
    }

    handleClick(e) {
        let ev = e || window.event;

        let iNum = ev.target.dataset.num;

        this.moveImg(iNum);
        this.play();
    }
    
    extend(obj1,obj2){
        for(var i in obj1){
            obj2[i]=obj1[i];
        }
    }
}

let tabImg = new Tabimg();
let elems={
    wrap : document.getElementsByClassName('banner-list')[0],
    item : document.getElementsByClassName('banner-list')[0].getElementsByTagName('li'),
    Btn : document.querySelector('.banner-btn'),
    itemBtn : document.querySelector('.banner-btn').getElementsByTagName('li')
}

tabImg.init(elems);