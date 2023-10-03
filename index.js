import Publisher from "./src/store/publish.js";
import Subscriber from "./src/store/subscriber.js";

const state = new Publisher({ a: 10, b: 20 });

const addCal = new Subscriber(() => console.log(`a+b=${state.a + state.b}`));
const mulltiCal = new Subscriber(() => console.log(`a*b=${state.a * state.b}`));

addCal.subscribe(state);
mulltiCal.subscribe(state);

state.notify();

state.setState({ a: 100, b: 200 });
