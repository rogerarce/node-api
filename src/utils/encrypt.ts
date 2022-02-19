import { pbkdf2Sync } from 'crypto';

export const encrypt = (user) => {
    return pbkdf2Sync(
        user.password,
        `${user.first_name} ${user.last_name} ${user.password}`,
        10000,
        60,
        'sha512'
    ).toString('hex');
}