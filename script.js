var items = []
        , point = document.querySelector('svg').createSVGPoint();

    function getCoordinates(e, svg) {
        point.x = e.clientX;
        point.y = e.clientY;
        return point.matrixTransform(svg.getScreenCTM().inverse());
    }

    function changeColor(e) {
        document.body.className = e.currentTarget.className;
    }

    function Item(config) {
        Object.keys(config).forEach(function (item) {
            this[item] = config[item];
        }, this);
        this.el.addEventListener('mousemove', this.mouseMoveHandler.bind(this));
        this.el.addEventListener('touchmove', this.touchMoveHandler.bind(this));
    }

    Item.prototype = {
        update: function update(c) {
            this.clip.setAttribute('cx', c.x);
            this.clip.setAttribute('cy', c.y);
        },
        mouseMoveHandler: function mouseMoveHandler(e) {
            this.update(getCoordinates(e, this.svg));
        },
        touchMoveHandler: function touchMoveHandler(e) {
            e.preventDefault();
            var touch = e.targetTouches[0];
            if (touch) return this.update(getCoordinates(touch, this.svg));
        }
    };

    [].slice.call(document.querySelectorAll('.item'), 0).forEach(function (item, index) {
        items.push(new Item({
            el: item,
            svg: item.querySelector('svg'),
            clip: document.querySelector('#clip-'+index+' circle'),
        }));
    });

    [].slice.call(document.querySelectorAll('button'), 0).forEach(function (button) {
        button.addEventListener('click', changeColor);
    });




// ES6 Class
class TypeWriter {
  constructor(txtElement, words, wait = 300) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if(this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 80;

    if(this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is complete
    if(!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if(this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 50;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}


// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}




