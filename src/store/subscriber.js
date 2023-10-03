class Subscriber {
  #fn;

  constructor(fn) {
    this.#fn = fn;
  }

  subscribe(publisher) {
    publisher.registerSubScribe(this.#fn);
  }
}

export default Subscriber;
