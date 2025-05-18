import { decrypt } from './crypto-utils';

const encryptedCredentials = [
  {
    encUsername: '6dVbq/1xKsfEgiz/G+Bh6g=',
    encPassword: 'f1YacKZFb/JpxnmmV3MveA==',
  },
];

export function validatePartner(username: string, password: string): boolean {
  return encryptedCredentials.some((cred) => {
    return (
      decrypt(cred.encUsername) === username &&
      decrypt(cred.encPassword) === password
    );
  });
}