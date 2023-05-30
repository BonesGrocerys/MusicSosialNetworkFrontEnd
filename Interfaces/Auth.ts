export interface IPerson {
  id: number;
  login: string;
  firstname?: string;
  lastname?: string;
  middlename?: string;
  Name: string;
}

export interface IRegistrationRequest {
  login: string;
  password: string;
  name?: string;
}

export interface IAuthRequest {
  login: string;
  password: string;
}

export interface IAuthResponse {
  person: IPerson;
  token: string;
}
