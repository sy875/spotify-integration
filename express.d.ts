declare namespace Express {
    export interface Request {
        user: any;
        session:any
    }
    export interface Response {
        user: any;
    }
  }