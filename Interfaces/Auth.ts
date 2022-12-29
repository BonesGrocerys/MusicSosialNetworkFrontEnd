export interface IPerson {
  id: number;
  login: string;
  firstname?: string;
  lastname?: string;
  middlename?: string;
}

export interface IRegistrationRequest {
  login: string;
  password: string;
  firstname?: string;
  lastname?: string;
  middlename?: string;
}

export interface IAuthRequest {
  login: string;
  password: string;
}

export interface IAuthResponse {
  person: IPerson;
  token: string;
}
