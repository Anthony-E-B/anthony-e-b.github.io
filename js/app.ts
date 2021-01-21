class Pile {
  contenu: Array<any>;

  constructor() {
    this.contenu = []
  }

  empiler(element: any) {
    this.contenu.unshift(element);
  }

  depiler() {
    return this.contenu.shift();
  }

  get length(): number {
    return this.contenu.length;
  }
}

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const body:HTMLBodyElement = $('body');
const html:HTMLHtmlElement = $('html');

class Notif {
  element:HTMLElement;

  constructor(message:string) {
    let element:HTMLElement = document.createElement('div');
    element.innerHTML = message;
    
      let croix:HTMLElement = document.createElement('div');
      croix.classList.add('croix');
      croix.onclick = function(e) {
        (this as HTMLElement).parentElement.classList.add('quit');
        setTimeout(() => {
          (this as HTMLElement).parentElement.remove();
        }, 200);
      }
    
    element.insertAdjacentElement('beforeend', croix);
    element.id = `${Math.round(Math.random() * 10000)}`;
    element.classList.add('notif');

    this.element = element;
    body.insertAdjacentElement('beforeend', element);
  }
}


function timeout(time: number) {
  return new Promise((res, rej): void => {
    setTimeout(() => {
      res(true);
    }, time);
  });
}

const loader = {
  element: document.getElementById('loader'),
  to: function (pourcentage: number) {
    this.element.innerHTML = `${pourcentage = Math.max(0, Math.min(100, pourcentage))}%`;
  },
  end: function() {
    this.element.classList.add('end');
  }
};

(async function boot() {
  let allElements = $$('body *:not(#loader)');
  allElements.forEach((snap:HTMLElement) => {
    snap.style.visibility = "none"
  });
  await (document as any).fonts.ready.then(() => {
    loader.element.classList.add('fontready');
    $('header#mainheader').classList.add('fontReady');
  });
  loader.to(100);
  allElements.forEach((snap:HTMLElement) => {
    snap.style.visibility = "";
  });
  loader.end();
})();

// Curseur

let cursor = new class {
  element: HTMLElement;
  supportedTags: Array<string>;
  supportedClass: Array<string>;
  supportedId: Array<string>;

  constructor() {
    this.element = document.getElementById('cursor');
    this.supportedTags = ["A"];
    this.supportedClass = ["croix"];
    this.supportedId = [];

    window.addEventListener('mousemove', (e) => {
      this.element.style.left = e.pageX + 2 + "px";
      this.element.style.top = e.pageY + 2 + "px";
      if (this.supportedTags.includes((e.target as HTMLElement).tagName) 
      || this.supportedClass.some(r=> (e.target as HTMLElement).classList.contains(r)) 
      || this.supportedId.includes((e.target as HTMLElement).id)) {
        this.element.classList.add('pointer');
      } else {
        this.element.classList.remove('pointer');
      }
    });
  }

  hide() {
    this.element.classList.add('out');
  }
  
  show() {
    this.element.classList.remove('out');
  }
}

html.addEventListener('mouseleave', () => {
  cursor.hide()
});
html.addEventListener('mouseenter', () => {
  cursor.show()
});



// Header

function headerSize() {
  $$('#mainheader .row').forEach((snap:HTMLElement) => {
    snap.style.fontSize = `${Math.min(window.innerWidth * 0.12, 90)}px`
    let firstElSize:any = snap.querySelector('span').offsetWidth;
    snap.style.left = `-${firstElSize - 0.2*firstElSize}px`;
  });
}

headerSize();

window.addEventListener('resize', headerSize);

if (window.matchMedia('(hover: none)').matches) {
  new Notif('Vous aurez une meilleure expérience <b>sur ordinateur</b>.')
} else if (window.innerWidth < 1300) {
  new Notif('Vous aurez une meilleure expérience <b>sur grand écran</b>')
}



// Hobbies

function hobbiesScroll() {
  if (window.scrollY > document.getElementById("mainheader").offsetHeight / 4) {
    body.classList.add('scroll');
  } else {
    body.classList.remove('scroll');
  }
}

window.addEventListener('scroll', hobbiesScroll);


// Traitement des images

$$('img').forEach(async (img:HTMLImageElement) => { 
  img.setAttribute('draggable','false'); // images non traînables
  await checkImageLoad(img);
  img.classList.add('loaded');
});

function checkImageLoad(img:HTMLImageElement) {
  return new Promise((res,rej) => {
    if (img.complete) res(true);
    img.addEventListener('load', () => {
      res(true);
    });
    img.onerror = rej;
  });
}

// Hobbies

interface Array<T> {
  max(): Array<T>;
  min(): Array<T>;
}
Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

Array.prototype.min = function() {
  return Math.min.apply(null, this);
};

const hobbiesContainer = document.getElementById('hobbies');

function resizeHobbiesTexts() {
  let heightsList:Array<number> = [];
  hobbiesContainer.querySelectorAll('.texts p').forEach((paragraph:HTMLDivElement) => {
    heightsList.push(paragraph.offsetHeight);
  });
  (hobbiesContainer.querySelector('.texts') as HTMLDivElement).style.height = heightsList.max() + "px";
}

window.addEventListener("resize",resizeHobbiesTexts);

resizeHobbiesTexts();

window.addEventListener("resize", bodyMainClass);

bodyMainClass()

function bodyMainClass() {
  if (window.innerWidth < 700) {
    body.classList.add('main');
  } else {
    body.classList.remove('main');
  }
  window.scrollTo(0,window.scrollY)
}

hobbiesContainer.querySelectorAll('.titles ul li').forEach((li:HTMLLIElement) => {
  li.addEventListener('mouseover', hobbiesChange);
});

function hobbiesChange(e:Event) {
  if ((e.target as HTMLLIElement).classList.contains('active')) return false;
  hobbiesContainer.querySelectorAll('.active').forEach(element => element.classList.remove('active'));
  
  hobbiesContainer.querySelectorAll("." + (e.target as HTMLLIElement).classList.value).forEach((snap) => {
    snap.classList.add('active');
  });
};


// Mutation observer for mobile alert

var alertBox = document.getElementById('alert');
function insertAlert() {
  if (body.querySelector('#alert')) return;
  body.insertAdjacentElement('beforeend', alertBox);
}

const observer = new MutationObserver(insertAlert);

observer.observe(body, {childList: true});