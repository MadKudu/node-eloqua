import { AxiosError, AxiosResponse } from 'axios';

export default class EloquaError extends Error {
  status: any;
  data: any;

  constructor(err: AxiosError) {
    const { response }: { response?: AxiosResponse } = err;
    const { status, statusText, data } = response || {};
    const message = statusText || err.message;
    super(message);
    this.status = status;
    this.data = data;
  }
}
