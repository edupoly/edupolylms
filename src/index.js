import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/store'
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddTechnology from './feature/admin/AddTechnology.jsx';
import AdminDashboard from './feature/admin/AdminDashboard.jsx';
import AddConcept from './feature/admin/AddConcept.jsx';
import Edittechnology from './feature/admin/Edittechnology.jsx';
import AddContent from './feature/admin/AddContent.jsx';
import Topicdetails from './feature/admin/Topicdetails.jsx';

import UserDashboard from './feature/user/UserDashboard.jsx';
import Technology from './feature/user/Technology.jsx';
import Technologydetails from './feature/user/Technologydetails.jsx';
import TopicDetails from './feature/user/TopicDetails.jsx';
import AdminTechnology from './feature/admin/AdminTechnology.jsx';
import AddTopicc from './feature/admin/AddTopicc.jsx';
import EditContent from './feature/admin/EditContent.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
          {
            path: "/admin",
            element: <AdminDashboard></AdminDashboard>,
            children: [
              {
                path: "/admin",
                element: <AdminTechnology></AdminTechnology>
              },  
              {
                path: "/admin/addtechnology",
                element: <AddTechnology></AddTechnology>
              },  
              {
                path: "/admin/addconcept/:tid",
                element: <AddConcept></AddConcept>,
                children: [
                  {
                    path: "/admin/addconcept/:tid/edittechnology",
                    element: <Edittechnology></Edittechnology>
                  },
                  {
                    path: "/admin/addconcept/:tid/addtopic/:cid",
                    element: <AddTopicc></AddTopicc>
                  },
                  {
                    path: "/admin/addconcept/:tid/topicdetails/:cid/:topicId",
                    element: <Topicdetails></Topicdetails>,
                    children: [
                      {
                        path: "/admin/addconcept/:tid/topicdetails/:cid/:topicId/addcontent",
                        element: <AddContent></AddContent>
                      }
                    ]
                  },
                  {
                    path: "/admin/addconcept/:tid/edittopic/:cid/:topicId/:contentId/editcontent",
                    element: <EditContent></EditContent>
                  }
                ]
              },
              {
                path: "/admin/addconcept/:tid/:cid",
                element: <AddConcept></AddConcept>
              }
            ]
          },
          {
            path: "/",
            element: <UserDashboard></UserDashboard>,
            children: [
              {
                path: "/",
                element: <Technology></Technology>,
              },
              {
                path: "/technologydetails/:tid",
                element: <Technologydetails></Technologydetails>,
                children: [
                  {
                    path: "/technologydetails/:tid/:cid/:toid",
                    element: <TopicDetails></TopicDetails>
                  }
                ]
              },
            ]
          }
    ],
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
)
