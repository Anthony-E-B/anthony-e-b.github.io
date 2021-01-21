var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var Pile = (function () {
    function Pile() {
        this.contenu = [];
    }
    Pile.prototype.empiler = function (element) {
        this.contenu.unshift(element);
    };
    Pile.prototype.depiler = function () {
        return this.contenu.shift();
    };
    Object.defineProperty(Pile.prototype, "length", {
        get: function () {
            return this.contenu.length;
        },
        enumerable: false,
        configurable: true
    });
    return Pile;
}());
var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
var body = $('body');
var html = $('html');
var Notif = (function () {
    function Notif(message) {
        var element = document.createElement('div');
        element.innerHTML = message;
        var croix = document.createElement('div');
        croix.classList.add('croix');
        croix.onclick = function (e) {
            var _this = this;
            this.parentElement.classList.add('quit');
            setTimeout(function () {
                _this.parentElement.remove();
            }, 200);
        };
        element.insertAdjacentElement('beforeend', croix);
        element.id = "" + Math.round(Math.random() * 10000);
        element.classList.add('notif');
        this.element = element;
        body.insertAdjacentElement('beforeend', element);
    }
    return Notif;
}());
function timeout(time) {
    return new Promise(function (res, rej) {
        setTimeout(function () {
            res(true);
        }, time);
    });
}
var loader = {
    element: document.getElementById('loader'),
    to: function (pourcentage) {
        this.element.innerHTML = (pourcentage = Math.max(0, Math.min(100, pourcentage))) + "%";
    },
    end: function () {
        this.element.classList.add('end');
    }
};
(function boot() {
    return __awaiter(this, void 0, void 0, function () {
        var allElements;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    allElements = $$('body *:not(#loader)');
                    allElements.forEach(function (snap) {
                        snap.style.visibility = "none";
                    });
                    return [4, document.fonts.ready.then(function () {
                            loader.element.classList.add('fontready');
                            $('header#mainheader').classList.add('fontReady');
                        })];
                case 1:
                    _a.sent();
                    loader.to(100);
                    allElements.forEach(function (snap) {
                        snap.style.visibility = "";
                    });
                    loader.end();
                    return [2];
            }
        });
    });
})();
var cursor = new (function () {
    function class_1() {
        var _this = this;
        this.element = document.getElementById('cursor');
        this.supportedTags = ["A"];
        this.supportedClass = ["croix"];
        this.supportedId = [];
        window.addEventListener('mousemove', function (e) {
            _this.element.style.left = e.pageX + 2 + "px";
            _this.element.style.top = e.pageY + 2 + "px";
            if (_this.supportedTags.includes(e.target.tagName)
                || _this.supportedClass.some(function (r) { return e.target.classList.contains(r); })
                || _this.supportedId.includes(e.target.id)) {
                _this.element.classList.add('pointer');
            }
            else {
                _this.element.classList.remove('pointer');
            }
        });
    }
    class_1.prototype.hide = function () {
        this.element.classList.add('out');
    };
    class_1.prototype.show = function () {
        this.element.classList.remove('out');
    };
    return class_1;
}());
html.addEventListener('mouseleave', function () {
    cursor.hide();
});
html.addEventListener('mouseenter', function () {
    cursor.show();
});
function headerSize() {
    $$('#mainheader .row').forEach(function (snap) {
        snap.style.fontSize = Math.min(window.innerWidth * 0.12, 90) + "px";
        var firstElSize = snap.querySelector('span').offsetWidth;
        snap.style.left = "-" + (firstElSize - 0.2 * firstElSize) + "px";
    });
}
headerSize();
window.addEventListener('resize', headerSize);
if (window.matchMedia('(hover: none)').matches) {
    new Notif('Vous aurez une meilleure expérience <b>sur ordinateur</b>.');
}
else if (window.innerWidth < 1300) {
    new Notif('Vous aurez une meilleure expérience <b>sur grand écran</b>');
}
function hobbiesScroll() {
    if (window.scrollY > document.getElementById("mainheader").offsetHeight / 4) {
        body.classList.add('scroll');
    }
    else {
        body.classList.remove('scroll');
    }
}
window.addEventListener('scroll', hobbiesScroll);
$$('img').forEach(function (img) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                img.setAttribute('draggable', 'false');
                return [4, checkImageLoad(img)];
            case 1:
                _a.sent();
                img.classList.add('loaded');
                return [2];
        }
    });
}); });
function checkImageLoad(img) {
    return new Promise(function (res, rej) {
        if (img.complete)
            res(true);
        img.addEventListener('load', function () {
            res(true);
        });
        img.onerror = rej;
    });
}
Array.prototype.max = function () {
    return Math.max.apply(null, this);
};
Array.prototype.min = function () {
    return Math.min.apply(null, this);
};
var hobbiesContainer = document.getElementById('hobbies');
function resizeHobbiesTexts() {
    var heightsList = [];
    hobbiesContainer.querySelectorAll('.texts p').forEach(function (paragraph) {
        heightsList.push(paragraph.offsetHeight);
    });
    hobbiesContainer.querySelector('.texts').style.height = heightsList.max() + "px";
}
window.addEventListener("resize", resizeHobbiesTexts);
resizeHobbiesTexts();
window.addEventListener("resize", bodyMainClass);
bodyMainClass();
function bodyMainClass() {
    if (window.innerWidth < 700) {
        body.classList.add('main');
    }
    else {
        body.classList.remove('main');
    }
    window.scrollTo(0, window.scrollY);
}
hobbiesContainer.querySelectorAll('.titles ul li').forEach(function (li) {
    li.addEventListener('mouseover', hobbiesChange);
});
function hobbiesChange(e) {
    if (e.target.classList.contains('active'))
        return false;
    hobbiesContainer.querySelectorAll('.active').forEach(function (element) { return element.classList.remove('active'); });
    hobbiesContainer.querySelectorAll("." + e.target.classList.value).forEach(function (snap) {
        snap.classList.add('active');
    });
}
;
var alertBox = document.getElementById('alert');
function insertAlert() {
    if (body.querySelector('#alert'))
        return;
    body.insertAdjacentElement('beforeend', alertBox);
}
var observer = new MutationObserver(insertAlert);
observer.observe(body, { childList: true });
