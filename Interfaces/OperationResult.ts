export interface IOperationResult<T> {
    result?: T;
    success: boolean;
    message: string;
    operationCode: OperationCode;
  }
  
export enum OperationCode {
    Ok = 1,
    UnhandledError = 2,
    Error = 3,
    ValidationError = 4,
    EntityWasNotFound = 5,
    AlreadyExists = 6,
    Unauthorized = 7,
    Forbidden = 8,
  }
  