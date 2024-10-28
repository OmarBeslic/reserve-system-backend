import crypto from "crypto";

const SECRET = "tajnistring"
export const random = () => crypto.randomBytes(128).toString("base64");
export const hashPassword =(salt:string,password:string):string=>{
  return crypto.createHmac("sha256",[salt,password].join("/")).update(SECRET).digest("hex");
}
export const minLengthMessage = (min: number) => `min_length_${min}`;
export const maxLengthMessage = (max: number) => `max_length_${max}`;
