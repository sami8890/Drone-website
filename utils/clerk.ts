// // utils/clerk.ts
// import { clerkClient } from '@clerk/nextjs/server';

// export const updateUserProfilePicture = async (userId: string, file: File) => {
//     const uploadedImage = await (await clerkClient()).users.updateUser(userId, {
//         profileImageUrl: uploadedImage.url,
//     });

//     return uploadedImage;
// };