export default class ColumnChart {
  element;
  chartHeight = 50;
  children = {};

  constructor({
    data = [],
    label = "",
    value = 0,
    link = "",
    formatHeading = (val) => val,
  } = {}) {
    this.data = data;
    this.label = label;
    this.value = formatHeading(value);
    this.link = link;

    this.init();
  }

  init() {
    this.render();
    this.initEventListeners();
  }

  initEventListeners() {}

  getTemplate() {
    return `
      <div class="column-chart column-chart_loading" style="--chart-height: ${
        this.chartHeight
      }">
        <div class="column-chart__title">
          Total ${this.label}
          ${this.getLink()}
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">
            ${this.value}
          </div>
          <div data-element="body" class="column-chart__chart">
            ${this.getColumns()}
          </div>
        </div>
      </div>
        `;
  }

  render() {
    const element = document.createElement("div");

    element.innerHTML = this.getTemplate();

    this.element = element.firstElementChild;

    if (this.data.length) {
      this.element.classList.remove("column-chart_loading");
    }

    this.children = this.getChildren();
  }

  getChildren() {
    const elements = this.element.querySelectorAll("[data-element]");
    const children = {};

    elements.forEach((el) => {
      const elName = el.getAttribute("data-element");

      children[elName] = el;
    });

    return children;
  }

  getColumns() {
    const maxValue = Math.max(...this.data);
    const scaleValue = this.chartHeight / maxValue;

    return this.data
      .map((item) => {
        const percent = ((item / maxValue) * 100).toFixed(0);

        return `<div style="--value: ${Math.floor(
          item * scaleValue
        )}" data-tooltip="${percent}%"></div>`;
      })
      .join("");
  }

  update(newData) {
    this.data = newData;

    this.children.body.innerHTML = this.getColumns();
  }

  getLink() {
    return this.link
      ? `<a class="column-chart__link" href="${this.link}">View all</a>`
      : "";
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
    this.children = {};
  }
}
