export default class SortableTable {
  subElements = {};
  element;

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;

    this.render();
  }

  render() {
    const element = document.createElement("div");

    element.innerHTML = this.getTemplate();

    this.element = element.firstElementChild;
    this.subElements = this.getChildren();
  }

  getTemplate() {
    return `
      <div class="sortable-table">
        ${this.getTableHeader()}
        ${this.getTableBody()}
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

  getTableHeader() {
    return `
      <div data-element="header" class="sortable-table__header sortable-table__row">
        ${this.headerConfig.map((item) => this.getHeaderColumns(item)).join("")}
      </div>
    `;
  }

  getHeaderColumns({ id, title, sortable }) {
    return `
    <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}">
      <span>${title}</span>
    </div>
  `;
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

  sort(field, order) {
    const sortedData = this.sortData(field, order);
    const allColumns = this.element.querySelectorAll(
      ".sortable-table__cell[data-id]"
    );
    const currentColumn = this.element.querySelector(
      `.sortable-table__cell[data-id="${field}"]`
    );

    allColumns.forEach((column) => {
      column.dataset.order = "";
    });

    currentColumn.dataset.order = order;

    this.subElements.body.innerHTML = this.getBodyRows(sortedData);
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