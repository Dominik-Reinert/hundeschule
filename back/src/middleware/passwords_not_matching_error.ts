import { MiddlewareError } from "./middleware_error";

export function isMiddlewareError(
  error: Error | MiddlewareError
): error is MiddlewareError {
  return (error as MiddlewareError).statusCode !== undefined;
}

export class PasswordsNotMatchingError extends Error implements MiddlewareError {
  public readonly statusCode: number = 403;

  constructor(public notification: string = "Passwords do not match!") {
    super(notification);
  }
}
