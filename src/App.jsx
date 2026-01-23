import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/Login/LoginPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import UserManagement from "./pages/UserManagement/UserManagement";
import VotingManagement from "./pages/VotingManagement/VotingManagement";
import Cms from "./pages/CmsManagement/Cms";
import CMSView from "./pages/CmsManagement/CMSView";
import AddCmsPage from "./pages/CmsManagement/AddCmsPage";
import MonetizationManagement from "./pages/MonetizationManagement/MonetizationManagement";
import Analytics from "./pages/Analytics/Analytics";
import NotificationCommunication from "./pages/Announcements/Announcements";
import UnderDevelopment from "./pages/UnderDevelopment";
import AddUser from "./pages/UserManagement/AddUser";
import ViewUser from "./pages/UserManagement/ViewUser";
import ViewVoting from "./pages/VotingManagement/ViewVoting";
import Legal from "./pages/legal";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import PropertyManagement from "./pages/PropertyManagement/PropertyManagement";
import ViewProperty from "./pages/PropertyManagement/ViewProperty";
import ContentManagement from "./contentManagement/ContentManagement";
import BlogView from "./ContentManagement/Blogs/BlogView";
import VlogView from "./ContentManagement/Vlogs/VlogView";
import FaqView from "./ContentManagement/Faqs/FaqView";
import BlogAdd from "./ContentManagement/Blogs/BlogAdd";
import VlogAdd from "./ContentManagement/Vlogs/VlogAdd";
import FaqAdd from "./ContentManagement/Faqs/FaqAdd";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="*" element={<NotFound />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/user-management/add-user" element={<AddUser />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/user-management/view-user" element={<ViewUser />} />

          
<Route path="/content-management" element={<ContentManagement />} />

{/* BLOGS */}
<Route path="/content-management/blogs/add" element={<BlogAdd />} />
<Route path="/content-management/blogs/view" element={<BlogView />} />

{/* VLOGS */}
<Route path="/content-management/vlogs/add" element={<VlogAdd />} />
<Route path="/content-management/vlogs/view" element={<VlogView />} />

{/* FAQs */}
<Route path="/content-management/faqs/add" element={<FaqAdd />} />
<Route path="/content-management/faqs/view" element={<FaqView />} />

          <Route path="/property-management" element={<PropertyManagement />} />
          <Route
            path="/property-management/view-property"
            element={<ViewProperty />}
          />

          <Route path="/voting-management" element={<VotingManagement />} />
          <Route
            path="/voting-management/view-vote/:voteId"
            element={<ViewVoting />}
          />

          <Route path="/cms" element={<Cms />} />
          <Route path="/cms/view" element={<CMSView />} />
          <Route path="/cms/add" element={<AddCmsPage />} />
          <Route path="/monetization" element={<MonetizationManagement />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route
            path="/announcements"
            element={<NotificationCommunication />}
          />
          <Route path="/underdevelopment" element={<UnderDevelopment />} />
          <Route path="/legal" element={<Legal />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
