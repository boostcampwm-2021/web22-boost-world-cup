export default class ApiResult<T> {
  private data: T;
  private error: string;

  constructor(data: T, error: string) {
    this.data = data;
    this.error = error;
  }

  public static succeed<U>(data: U): ApiResult<U> {
    return new ApiResult<U>(data, null);
  }

  public static failed<U>(message: string): ApiResult<U> {
    return new ApiResult<U>(null, message);
  }
}
