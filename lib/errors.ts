export default class EloquaError extends Error {
  status: any;
  data: any;

  constructor (err: any) {
    const { response = {} } = err;
    const { status, statusText, data } = response;
    const message = statusText || err.message;
    super(message);
    this.status = status;
    this.data = data;
  }
}
