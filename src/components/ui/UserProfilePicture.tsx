// // components/UserProfilePicture.tsx
// import React, { useState } from "react";
// import { User } from "@clerk/clerk-react";
// import { UploadCloud } from "lucide-react";
// import { updateUserProfilePicture } from "@/components/ui/UserProfilePicture";

// interface UserProfilePictureProps {
//   user: User;
// }

// const UserProfilePicture: React.FC<UserProfilePictureProps> = ({ user }) => {
//   const [profilePicture, setProfilePicture] = useState<File | null>(null);

//   const handleProfilePictureChange = async (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     if (event.target.files && event.target.files.length > 0) {
//       const file = event.target.files[0];
//       setProfilePicture(file);
//       await updateUserProfilePicture(user.id, file);
//     }
//   };

//   return (
//     <div className="relative">
//       <img
//         src={
//           profilePicture
//             ? URL.createObjectURL(profilePicture)
//             : user.profileImageUrl || "/default-profile.png"
//         }
//         alt="Profile Picture"
//         className="w-16 h-16 rounded-full object-cover"
//       />
//       <label
//         htmlFor="profile-picture"
//         className="absolute bottom-0 right-0 cursor-pointer"
//       >
//         <div className="bg-gray-800 text-white p-2 rounded-full">
//           <UploadCloud className="w-5 h-5" />
//         </div>
//       </label>
//       <input
//         id="profile-picture"
//         type="file"
//         accept="image/*"
//         className="hidden"
//         onChange={handleProfilePictureChange}
//       />
//     </div>
//   );
// };

// export default UserProfilePicture;
