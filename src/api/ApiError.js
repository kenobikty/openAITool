export default class ApiError extends Error {
  statusCode;
  message;
  name;
  body;
  debugId;

  constructor(message, statusCode = 400, body = undefined) {
    super(message);
    if (arguments.length === 1 && typeof message === 'number') {
      statusCode = message;
      message = this.constructor.name;
    }
    this.message = message;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    }
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.body = body;
  }

  static wrap(err) {
    if (err instanceof ApiError) {
      return err;
    } else if (err instanceof Error) {
      // wrap generic error
      const out = new ApiError(err.message, null);
      out.stack = err.stack;
      out.name = err.name;
      Object.assign(out, err);
      return out;
    } else if (err.statusText) {
      // wrap axios error
      const out = new ApiError((err.data && err.data.message) || err.statusText, err.status);
      if (typeof Error.captureStackTrace === 'function') {
        Error.captureStackTrace(out, ApiError.wrap);
      }
      out.response = err;
      if (typeof err.data === 'string') {
        out.body = err.data;
      } else if (typeof err.data === 'object') {
        Object.assign(out, err.data);
      }
      return out;
    } else {
      // fallback to plain object/string
      const msg = (err && (err.message || err.msg)) || err;
      const out = new ApiError(msg, null);
      if (typeof Error.captureStackTrace === 'function') {
        Error.captureStackTrace(out, ApiError.wrap);
      }
      if (err && typeof err === 'object') {
        Object.assign(out, err);
      }
      return out;
    }
  }

  get formattedMessage() {
    return this.debugId ? `(${this.debugId.substr(0, 5)}) ${this.message}` : this.message;
  }
}
