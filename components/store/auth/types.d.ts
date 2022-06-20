export interface Ichecklogin {
    type: string,
    payload:{
        email: string,
        password: string,
        history: any,
        errorState: any,
        setSubmitting: any
    }
}
export interface IuserVerify {
    type: string,
    payload:{
        status:boolean,
        errorCon?:boolean,
        token?:string
    }
}
export interface IotpVerify {
    type: string,
    payload:{
        value:string,
        history:any,
        setError?:any
    }
}
export interface IforgotPasswordRequest {
    type: string,
    payload:{
        email:string,
    }
}
export interface IverifyResetCode {
    type: string,
    payload:{
        code:string,
    }
}
export interface IresetPassword {
    type: string,
    payload:{
        code:string,
        password:string,
        setError:any,
        setSubmitting:any
    }
}