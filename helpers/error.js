module.exports = {
  ExtendableError: class ExtendableError extends Error {
      constructor(message) {
        super();
        this.message = message;
        this.stack = (new Error()).stack;
        this.name = this.constructor.name;
    }
  },
  IdFormatError: class IdFormatError extends Error {
      constructor(message) {
        super();
        this.message = message;
        this.stack = (new Error()).stack;
        this.name = this.constructor.name;
    }
  },
  NotFoundError: class NotFoundError extends Error {
      constructor(message) {
        super();
        this.message = message;
        this.stack = (new Error()).stack;
        this.name = this.constructor.name;
    }
  }
};
