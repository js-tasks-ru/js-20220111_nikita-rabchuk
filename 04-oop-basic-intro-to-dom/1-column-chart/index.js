export default class ColumnChart {
  element;
  chartHegiht = 50;

  constructor({
    data = [],
    label = "",
    value = 0,
    link = "",
    formatHeading = (val) => val,
  } = {}) {
    this.data = data;
    this.label = label;
    this.value = value;
    this.formatHeading = formatHeading;
    this.link = link;
    this.render();
  }

  getTemplate() {
    return `
      <div class="column-chart" style="--chart-height: 50">
      <div class="column-chart__title">
        Total ${this.label}
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">
            ${this.formatHeading(this.value)}
        </div>
        <div data-element="body" class="column-chart__chart">
          <div style="--value: 12" data-tooltip="25%"></div>
        </div>
      </div>
    </div>
        `;
  }

  render() {
    const element = document.createElement("div");

    element.innerHTML = this.getTemplate();

    this.element = element.firstElementChild;
  }
}
