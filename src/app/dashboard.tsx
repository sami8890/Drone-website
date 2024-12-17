// // pages/dashboard.tsx
// import React from 'react';
// import { auth } from '@clerk/nextjs/server';
// import { redirect } from 'next/navigation';
// import UserDashboard from '@/components/ui/UserDashboard';


// const Dashboard: React.FC = () => {
//     const [authenticated, setAuthenticated] = React.useState(false);

//     React.useEffect(() => {
//         auth().then((authResult) => {
//             const { userId } = authResult;
//             if (userId) {
//                 setAuthenticated(true);
//             } else {
//                 redirect('/');
//             }
//         });
//     }, []);

//     if (!authenticated) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <UserDashboard />
//         </div>
//     );
// };


// export default Dashboard;