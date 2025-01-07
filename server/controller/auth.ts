import * as jose from "jose";

type User = {
    username: string;
    password: string;
};

const accounts: User[] = [
    {username: "jose", password: "123"},
    {username: "joao", password: "321"},
];

// export const login = async (event: any) => {
//     try {
//         const body = await readBody(event);
//
//         const user = accounts.find(
//             (account) => account.username === body.username && account.password === body.password
//         );
//
//         if (user) {
//             const apiSecret: string = "dionysus";
//
//             const secret = new TextEncoder().encode(apiSecret);
//             const alg = "HS256";
//
//             return await new jose.SignJWT({"urn:example:claim": true})
//                 .setProtectedHeader({alg})
//                 .setExpirationTime("5m")
//                 .sign(secret)
//                 .then((jwt) => ({Authorization: jwt}));
//         }
//
//         return ""
//     } catch (err) {
//         console.error(err);
//         throw createError({
//             statusCode: 500,
//             statusMessage: 'Something went wrong'
//         });
//     }
// };

// export const verifySession = async (event: any) => {
//     try {
//         const body = await readBody(event);
//
//         if (!body.adminAuth) {
//             throw new Error('Missing "adminAuth" token in request body');
//         }
//
//         const token = body.adminAuth;
//
//         const secret = new TextEncoder().encode("dionysus");
//
//         const decoded = await jose.decode(token, secret);
//
//         const now = Math.floor(Date.now() / 1000);
//         if (decoded.exp < now) {
//             throw new Error('Token expired');
//         }
//
//         return true;
//     } catch (err) {
//         return false;
//     }
// };