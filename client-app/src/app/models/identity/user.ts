export interface User {
    id: string;
    userName: string;
    email: string;
    token: string;
  }
  
  export interface UserLoginValues {
    email: string;
    password: string;
  }
  export interface UserRegisterValues {
    userName: string;
    email: string;
    password: string;
  }
  