import { Store } from "../core/Store.js";
import { observable } from "./index.js";

// export const store = {
//   state: observable({
//     a: 10,
//     b: 20,
//   }),
//   setState(newState) {
//     for (const [key, value] of Object.entries(newState)) {
//       if (!this.state[key]) continue;
//       this.state[key] = value;
//     }
//   },
// };
export const store = new Store({
  state: {
    a: 10,
    b: 20,
  },
  mutations: {
    SET_A(state, paylod) {
      state.a = paylod;
    },
    SET_B(state, paylod) {
      state.b = paylod;
    },
  },
});
