export default class Tooltip {
  static instance;

  element;
  width;
  height;
  screenWidth = document.documentElement.clientWidth;
  screenHeight = document.documentElement.clientHeight;

  onPointerOver = (event) => {
    const element = event.target.closest("[data-tooltip]");

    if (element) {
      this.render(element.dataset.tooltip);
      document.addEventListener("pointermove", this.onPointerMove);
    }
  };

  onPointerMove = (event) => {
    this.moveTooltip(event);
  };

  onPointerOut = () => {
    this.remove();
    document.removeEventListener("pointermove", this.onPointerMove);
  };

  constructor() {
    if (Tooltip.instance) {
      return Tooltip.instance;
    }

    Tooltip.instance = this;
  }

  initialize() {
    this.initEventListeners();
  }

  initEventListeners() {
    document.addEventListener("pointerover", this.onPointerOver);
    document.addEventListener("pointerout", this.onPointerOut);
  }

  render(html) {
    this.element = document.createElement("div");
    this.element.className = "tooltip";
    this.element.innerHTML = html;

    document.body.append(this.element);
  }

  moveTooltip(event) {
    const shift = 10;
    const left = event.clientX + shift;
    const top = event.clientY + shift;

    this.handleTooltipPos(left, top);

  }

  handleTooltipPos(left, top) {
    const tooltipWidth = this.element.offsetWidth;
    const tooltipHeight = this.element.offsetHeight;

    if (tooltipWidth + left > this.screenWidth) {
      this.element.classList.add('right-border');
    } else {
      this.element.classList.remove('right-border');
    }

    if (tooltipHeight + top > this.screenHeight) {
      this.element.classList.add('top-border');
    } else {
      this.element.classList.remove('top-border');
    }

    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    document.removeEventListener("pointerover", this.onPointerOver);
    document.removeEventListener("pointerout", this.onPointerOut);
    document.removeEventListener("pointermove", this.onPointerMove);
    this.remove();
    this.element = null;
  }
}

// export default Tooltip;
