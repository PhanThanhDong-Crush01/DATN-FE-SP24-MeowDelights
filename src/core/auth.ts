import instance from "./api"

export const signin = (user:any)=>{
    return instance.post('/auth/signin',user);
}
export const signup = (user:any)=>{
    return instance.post('/auth/signup',user);
}