import { MiddlewareError } from "./middleware_error";

export function isMiddlewareError(
  error: Error | MiddlewareError
): error is MiddlewareError {
  return (error as MiddlewareError).statusCode !== undefined;
}

export class WrongCredentialsError extends Error implements MiddlewareError {
  public readonly statusCode: number = 400;

  constructor(
    public notification: string = "No account matching email/password combination!"
  ) {
    super(notification);
  }
}
