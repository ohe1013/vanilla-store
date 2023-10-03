import { observable, observe } from "../store/index.js";

export class Component {
  state;
  props;
  $el;
  constructor($el, props) {
    this.$el = $el;
    this.props = props;
    this.setup();
  }
  setup() {
    this.state = observable(this.initstate());
    observe(() => {
      this.render();
      this.setEvent();
      this.mounted();
    });
  }
  initstate() {
    return {};
  }
  template() {
    return "";
  }
  render() {
    this.$el.innerHTML = this.template();
  }
  setEvent() {}
  mounted() {}
}
