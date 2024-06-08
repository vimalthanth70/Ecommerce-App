
import {pbkdf2Sync} from 'crypto'
export const hashGenerator = (password:string)=>{
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    const salt = process.env.SALT || ''
    const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return hash
}