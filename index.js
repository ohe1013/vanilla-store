import { App } from "./App.js";
import Publisher from "./src/store/publish.js";
import Subscriber from "./src/store/subscriber.js";
function fn1() {
  // 즉 state 라는건 observable한 값이라는것이다.
  // 변화가 관찰되면 등록된 함수가 실행
  const state = new Publisher({ a: 10, b: 20 });

  const addCal = new Subscriber(() => console.log(`a+b=${state.a + state.b}`));
  const mulltiCal = new Subscriber(() =>
    console.log(`a*b=${state.a * state.b}`)
  );

  addCal.subscribe(state);
  mulltiCal.subscribe(state);

  state.notify();

  state.setState({ a: 100, b: 200 });
}

// oberver로 관리
function fn2() {
  const state = {
    a: 10,
    b: 20,
  };

  const stateKeys = Object.keys(state);
  const observer = () => console.log(`a+b = ${state.a + state.b}`);
  for (const key of stateKeys) {
    let _value = state[key];
    Object.defineProperty(state, key, {
      get() {
        return _value;
      },
      set(value) {
        _value = value;
        observer();
      },
    });
  }

  console.log(`state.a = ${state.a}, state.b = ${state.b}`);
  state.a = 100;
  state.b = 200;
}

//여러개 obersver로관리
//더하기랑 빼기가 구독된 상태라고 생각하면된다.
//관찰할 함수들을 넣어놓고 변화에 따라 관찰된 결과를 함수로실행함
function fn3() {
  let currentObserver = null;
  const state = {
    a: 10,
    b: 20,
  };

  const stateKeys = Object.keys(state);
  for (const key of stateKeys) {
    let _value = state[key];
    const observers = new Set();
    Object.defineProperty(state, key, {
      get() {
        if (currentObserver) observers.add(currentObserver);
        return _value;
      },
      set(value) {
        _value = value;
        observers.forEach((observer) => observer());
      },
    });
  }
  const addCal = () => {
    currentObserver = addCal;
    console.log(`a +b = ${state.a + state.b}`);
  };

  const subCal = () => {
    currentObserver = subCal;
    console.log(`a- b = ${state.a - state.b}`);
  };
  addCal();
  state.a = 100;
  subCal();

  state.b = 200;
  state.a = 1;
  state.b = 2;
}
// fn1();
// fn3();

//함수화
function fn4() {
  let currentObserver = null;
  const observe = (fn) => {
    currentObserver = fn;
    fn();
    currentObserver = null;
  };
  const observable = (obj) => {
    Object.keys(obj).forEach((key) => {
      let _value = obj[key];
      const observers = new Set();
      console.log();
      Object.defineProperty(obj, key, {
        get() {
          if (currentObserver) observers.add(currentObserver);
          return _value;
        },
        set(value) {
          _value = value;
          observers.forEach((fn) => fn());
        },
      });
    });
    return obj;
  };
  const state = observable({
    a: 10,
    b: 20,
  });

  const $app = document.querySelector("#app");

  const render = () => {
    $app.innerHTML = `
      <p>a + b = ${state.a + state.b}</p>
      <input id="stateA" value="${state.a}" />
      <input id="stateB" value="${state.b}" />
    `;

    $app.querySelector("#stateA").addEventListener("change", ({ target }) => {
      state.a = Number(target.value);
    });

    $app.querySelector("#stateB").addEventListener("change", ({ target }) => {
      state.b = Number(target.value);
    });
  };

  observe(render);
}
// fn4();s
new App(document.querySelector("#app"));
