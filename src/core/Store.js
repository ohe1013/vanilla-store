import { observable } from "../store/index.js";

export class Store {
  #state;
  #mutations;
  #actions;
  state = {};
  constructor({ state, mutations, actions }) {
    this.#state = observable(state);
    this.#mutations = mutations;
    this.#actions = actions;

    Object.keys(state).forEach((key) => {
      Object.defineProperty(this.state, key, { get: () => this.#state[key] });
    });
  }
  commit(action, paylod) {
    this.#mutations[action](this.#state, paylod);
  }
  dispatch(action, paylod) {
    return this.#actions[action](
      {
        state: this.#state,
        commit: this.commit.bind(this),
        dispatch: this.dispatch.bind(this),
      },
      paylod
    );
  }
}
