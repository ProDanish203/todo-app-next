// import { getServerSession } from "next-auth";
// import { authOptions } from "./auth.config";

// export const getSession = async () => {
//   return await getServerSession(authOptions);
// };

// // Example usage in a route handler
// export async function getCurrentUser() {
//   const session = await getSession();

//   if (!session?.user?.id) {
//     return null;
//   }

//   const user = await db.user.findUnique({
//     where: { id: session.user.id },
//     select: {
//       id: true,
//       name: true,
//       email: true,
//       image: true,
//       emailVerified: true,
//     },
//   });

//   return user;
// }
