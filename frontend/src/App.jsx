import React from "react";
import { Route, Routes } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { ErrorBoundary } from "react-error-boundary";
import AppNavbar from "./AppNavbar";
import Home from "./home/home";
import PrivateRoute from "./privateRoute";
import Register from "./auth/register/Register";
import Login from "./auth/login/Login";
import Logout from "./auth/logout/Logout";
import PlanList from "./public/plan";
import tokenService from "./services/token.service";
import UserListAdmin from "./admin/users/UserListAdmin";
import UserEditAdmin from "./admin/users/UserEditAdmin";
import SwaggerDocs from "./public/swagger";
import DeveloperList from "./developers/developers";
import AchievementList from "./achievements/achievementList";
import AchievementEdit from "./achievements/achievementEdit";
import Dashboard from "./dashboard/Dashboard"
import CreateGame from "./createGame/CreateGame";
import Rules from "./rules/rules";
import Match from "./match/Match"


function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function App() {
  const jwt = tokenService.getLocalAccessToken();
  let roles = []
  if (jwt) {
    roles = getRolesFromJWT(jwt);
  }

  function getRolesFromJWT(jwt) {
    return jwt_decode(jwt).authorities;
  }

  let adminRoutes = <></>;
  let ownerRoutes = <></>;
  let userRoutes = <></>;
  let vetRoutes = <></>;
  let publicRoutes = <></>;

  roles.forEach((role) => {
    if (role === "ADMIN") {
      adminRoutes = (
        <>
          <Route path="/users" exact={true} element={<PrivateRoute><UserListAdmin /></PrivateRoute>} />
          <Route path="/developers" element={<DeveloperList />} /> 
          <Route path="/users/:username" exact={true} element={<PrivateRoute><UserEditAdmin /></PrivateRoute>} />
          <Route path="/developers" element={<DeveloperList />} />  
          <Route path="/achievements/" exact={true} element={<PrivateRoute><AchievementList
            /></PrivateRoute>} />
          <Route path="/achievements/:achievementId" exact={true} element={<PrivateRoute><AchievementEdit
            /></PrivateRoute>} />     
          <Route path="/matches/:matchId" exact={true} element={<PrivateRoute><Match/></PrivateRoute>}></Route>

          <Route path="/creategame/" element={<CreateGame />} />   
          
          <Route path="/docs" element={<SwaggerDocs />} />  
        </>)
    }
    if (role === "PLAYER") {
      ownerRoutes = (
        <>
          <Route path="/matches/:matchId" exact={true} element={<PrivateRoute><Match/></PrivateRoute>}></Route>
          <Route path="/achievements/" exact={true} element={<PrivateRoute><AchievementList
            /></PrivateRoute>} />
          <Route path="/creategame/" element={<CreateGame />} />  
          <Route path="/developers" element={<DeveloperList />} />
        </>)
    }    
  })
  if (!jwt) {
    publicRoutes = (
      <>        
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rules" element={<Rules />} />
      </>
    )
  } else {
    userRoutes = (
      <>
        { <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} /> }        
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rules" element={<Rules />} />
      </>
    )
  }

  return (
    <div>
      <ErrorBoundary FallbackComponent={ErrorFallback} >
        <AppNavbar />
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/plans" element={<PlanList />} />
          {publicRoutes}
          {userRoutes}
          {adminRoutes}
          {ownerRoutes}
          {vetRoutes}
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
