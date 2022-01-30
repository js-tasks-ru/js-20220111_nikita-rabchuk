export default class NotificationMessage {
  element;
  timerId;

  static prevNotification;

  constructor(message = "", { duration = 1000, type = "success" } = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;

    this.render();
  }

  getTemplate() {
    return `
        <div class="notification ${this.type}" style="--value:${
      this.duration / 1000
    }s">
            <div class="timer"></div>
            <div class="inner-wrapper">
            <div class="notification-header">Notification</div>
            <div class="notification-body">
                ${this.message}
            </div>
            </div>
        </div>
  `;
  }

  render() {
    const wrap = document.createElement("div");

    wrap.innerHTML = this.getTemplate();

    this.element = wrap.firstElementChild;
  }

  show(parent = document.body) {
    if (NotificationMessage.prevNotification) {
      NotificationMessage.prevNotification.remove();
    }

    parent.append(this.element);

    this.timerId = setTimeout(() => this.remove(), this.duration);

    NotificationMessage.prevNotification = this;
  }

  remove() {
    clearTimeout(this.timerId);

    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
      this.remove();

      this.element = null;

      NotificationMessage.prevNotification = null;
  }
}