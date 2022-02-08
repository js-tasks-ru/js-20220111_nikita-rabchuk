export default class SortableTable {
  subElements = {};
  element;

  constructor(
    headerConfig = [],
    {
      data = [],
      sorted = {
        id: headerConfig.find((item) => item.sortable).id,
        order: "asc",
      },
    } = {}
  ) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.sorted = sorted;

    this.init();
  }

  init() {
    this.render();
    this.initEventListeners();
    console.log(this);
  }

  render() {
    const { id, order } = this.sorted;
    const element = document.createElement("div");
    const sortedData = this.sortData(id, order);

    element.innerHTML = this.getTemplate(sortedData);

    this.element = element.firstElementChild;
    this.subElements = this.getChildren();
  }

  getTemplate(data) {
    return `
      <div class="sortable-table">
        ${this.getTableHeader()}
        ${this.getTableBody(data)}
      </div>
    `;
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

  initEventListeners() {
    this.subElements.header.addEventListener("pointerdown", this.onSortClick);
  }

  getTableHeader() {
    return `
      <div data-element="header" class="sortable-table__header sortable-table__row">
        ${this.headerConfig.map((item) => this.getHeaderColumn(item)).join("")}
      </div>
    `;
  }

  getHeaderColumn({ id, title, sortable }) {
    const order = this.sorted.id === id ? this.sorted.order : "asc";
    return `
          <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" data-order="${order}">
            <span>${title}</span>
            ${this.getHeaderSortingArrow(id)}
          </div>
        `;
  }

  getHeaderSortingArrow(id) {
    const isOrderExist = this.sorted.id === id ? this.sorted.order : false;

    return isOrderExist
      ? `<span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
        </span>`
      : "";
  }

  getTableBody() {
    return `
      <div data-element="body" class="sortable-table__body">
        ${this.getBodyRows(this.data)}
      </div>`;
  }

  getBodyRows(data) {
    return data
      .map((item) => {
        return `
            <a href="/products/${item.id}" class="sortable-table__row">
              ${this.getBodyRow(item)}
            </a>`;
      })
      .join("");
  }

  getBodyRow(item) {
    const cells = this.headerConfig.map(({ id, template }) => {
      return {
        id,
        template,
      };
    });

    return cells
      .map(({ id, template }) => {
        return template
          ? template(item[id])
          : `<div class="sortable-table__cell">${item[id]}</div>`;
      })
      .join("");
  }

  sortData(field, order) {
    const arr = [...this.data];
    const column = this.headerConfig.find((item) => item.id === field);
    const { sortType } = column;
    const directions = {
      asc: 1,
      desc: -1,
    };
    const direction = directions[order];

    return arr.sort((a, b) => {
      switch (sortType) {
        case "number":
          return direction * (a[field] - b[field]);
        case "string":
          return direction * a[field].localeCompare(b[field], ["ru", "en"]);
        default:
          return direction * (a[field] - b[field]);
      }
    });
  }

  onSortClick = (event) => {
    const column = event.target.closest('[data-sortable="true"]');

    if (!column) return false;

    const toggleOrder = (order) => {
      const orders = {
        asc: "desc",
        desc: "asc",
      };

      return orders[order];
    };

    const { id, order } = column.dataset;
    const newOrder = toggleOrder(order);
    const sortedData = this.sortData(id, newOrder);
    const arrow = column.querySelector(".sortable-table__sort-arrow");

    column.dataset.order = newOrder;

    if (!arrow) {
      column.append(this.subElements.arrow);
    }

    this.subElements.body.innerHTML = this.getBodyRows(sortedData);
  };

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();

    this.element = null;
    this.subElements = {};
  }
}
