// router.jsx
import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import MainLayout from '../layout/MainLayout';
import Home from '../pages/Home/Home.jsx';
import Instructor from '../pages/Instructors/Instructors';
import Classes from '../pages/Classes/Classes';
import Login from '../pages/user/Login.jsx';
import Register from '../pages/user/Register.jsx';
import ClassPage from '../pages/Classes/ClassPage.jsx';
import Dashboard from '../pages/Dashboard/Dashboard.jsx';
import DashboardLayout from '../layout/DashboardLayout.jsx';
import StudentCP from '../pages/Dashboard/Student/StudentCP.jsx';
import EnrolledClasses from '../pages/Dashboard/Student/Enroll/EnrolledClasses.jsx';
import SelectedClass from '../pages/Dashboard/Student/SelectedClass.jsx';
import MyPaymentHistory from '../pages/Dashboard/Student/Payment/History/MyPaymentHistory.jsx';
import AsInstructor from '../pages/Dashboard/Student/Apply/AsInstructor.jsx';
import Payment from '../pages/Dashboard/Student/Payment/Payment.jsx';
import CourseDetails from '../pages/Dashboard/Student/Enroll/CourseDetails.jsx';
import InstructorCp from '../pages/Dashboard/Instructor/InstructorCp.jsx';
import AddClass from '../pages/Dashboard/Instructor/AddClass.jsx';
import MyClasses from '../pages/Dashboard/Instructor/MyClasses.jsx';
import PendingCourse from '../pages/Dashboard/Instructor/PendingCourse.jsx';
import MyApproved from '../pages/Dashboard/Instructor/MyApproved.jsx';
import AdminHome from '../pages/Dashboard/Admin/AdminHome.jsx';
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers.jsx';
import ManageClasses from '../pages/Dashboard/Admin/ManageClasses.jsx';
import ManageApp from '../pages/Dashboard/Admin/ManageApp.jsx';
import UpdateUser from '../pages/Dashboard/Admin/UpdateUser.jsx';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
        {
            path: "/",
            element: <Home />
        },
        {
          path: "/instructors",
          element: <Instructor />
        },
        {
          path: "/classes",
          element: <Classes />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path: `/class/:id`,
          element: <ClassPage />,
          loader: ({params}) => fetch(`https://fithub-r8lw.onrender.com/class/${params.id}`)
        }
    ]
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />
    },

    //USER Routes
    {
      path: "student-cp",
      element: <StudentCP />
    },
    {
      path: "enrolled-class",
      element: <EnrolledClasses />
    },
    {
      path: "my-selected",
      element: <SelectedClass />
    },
    {
      path: "my-payments",
      element: <MyPaymentHistory />
    },
    {
      path: "apply-instructor",
      element: <AsInstructor />
    },
    {
      path: "user/payment",
      element: <Payment />
    },
    {
      path: "course-details",
      element: <CourseDetails />
    },

    //INSTRUCTOR

    {
      path: "instructor-cp",
      element: <InstructorCp />
    },
    {
      path: "add-class",
      element: <AddClass />
    },
    {
      path: "my-classes",
      element: <MyClasses />
    },
    {
      path: "my-pending",
      element: <PendingCourse />
    },
    {
      path: "my-approved",
      element: <MyApproved />
    },

    //ADMIN ROUTES

    {
      path: "admin-home",
      element: <AdminHome />
    },
    {
      path: "manage-users",
      element: <ManageUsers />
    },
    {
      path: "manage-class",
      element: <ManageClasses />
    },
    {
      path: "manage-applications",
      element: <ManageApp />
    },
    {
      path: "update-user/:id",
      element: <UpdateUser />,
      loader: ({params}) => fetch(`https://fithub-r8lw.onrender.com/users/${params.id}`)
    }
  
    ]    
  }
]);
 