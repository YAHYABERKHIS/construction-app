import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/frontend/Home";
import About from "./components/frontend/About";
import "./assets/css/style.scss";
import Header from "./components/frontend/Header";
import Footer from "./components/frontend/Footer";
import Projects from "./components/frontend/Projects";
import Services from "./components/frontend/Services";
import Blogs from "./components/frontend/Blogs";
import ContactUs from "./components/frontend/ContactUs";
import Login from "./components/backend/Login";
import NotFound from "./components/frontend/NotFound";
import { ToastContainer } from "react-toastify";
import FloatingPhone from "./components/frontend/FloatingPhone";
import Chatbot from "./components/frontend/Chatbot";
import QuoteGenerator from "./components/frontend/QuoteGenerator";
import LanguageSwitcher from "./components/LanguageSwitcher";
import Dashboard from "./components/backend/Dashboard";
import RequireAuth from "./components/RequireAuth";
import { default as ShowServices } from "./components/backend/services/Show";
import { default as CreateServices } from "./components/backend/services/Create";
import { default as EditService } from "./components/backend/services/Edit";
import { default as ShowProjects } from "./components/backend/projects/Show";
import { default as CreateProjects } from "./components/backend/projects/Create";
import { default as EditProjects } from "./components/backend/projects/Edit";
import { default as ShowArticles } from "./components/backend/articles/Show";
import { default as CreateArticles } from "./components/backend/articles/Create";
import { default as EditArticles } from "./components/backend/articles/Edit";
import { default as ShowTestimonials } from "./components/backend/testimonials/Show";
import { default as CreateTestimonials } from "./components/backend/testimonials/Create";
import { default as EditTestimonials } from "./components/backend/testimonials/Edit";
import { default as ShowMembers } from "./components/backend/members/Show";
import { default as CreateMembers } from "./components/backend/members/Create";
import { default as EditMembers } from "./components/backend/members/Edit";
import ServiceDetails from "./components/frontend/ServiceDetails";
import ProjectDetails from "./components/frontend/ProjectDetails";
import ArticleDetails from "./components/frontend/ArticleDetails";
import { default as ShowMessages } from "./components/backend/messages/Show";
import { default as MessageDetails } from "./components/backend/messages/Details";

function AppContent() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/admin") && location.pathname !== "/admin/login";

  useEffect(() => {
    const lang = i18n.language?.startsWith("ar")
      ? "ar"
      : i18n.language?.startsWith("en")
        ? "en"
        : "fr";
    document.documentElement.lang = lang;
    document.body.dir = lang === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <>
      <ToastContainer position="bottom-right" />
      {isDashboard && <LanguageSwitcher fixed />}
      {!isDashboard && <FloatingPhone />}
      {!isDashboard && <Chatbot />}
      {!isDashboard && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/demander-service" element={<ContactUs />} />
        <Route path="/devis" element={<QuoteGenerator />} />
        <Route path="/services/:id" element={<ServiceDetails />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/blogs/:id" element={<ArticleDetails />} />

        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route path="/admin/services" element={<RequireAuth><ShowServices /></RequireAuth>} />
        <Route path="/admin/services/create" element={<RequireAuth><CreateServices /></RequireAuth>} />
        <Route path="/admin/services/edit/:id" element={<RequireAuth><EditService /></RequireAuth>} />
        <Route path="/admin/projects" element={<RequireAuth><ShowProjects /></RequireAuth>} />
        <Route path="/admin/projects/create" element={<RequireAuth><CreateProjects /></RequireAuth>} />
        <Route path="/admin/projects/edit/:id" element={<RequireAuth><EditProjects /></RequireAuth>} />
        <Route path="/admin/articles" element={<RequireAuth><ShowArticles /></RequireAuth>} />
        <Route path="/admin/articles/create" element={<RequireAuth><CreateArticles /></RequireAuth>} />
        <Route path="/admin/articles/edit/:id" element={<RequireAuth><EditArticles /></RequireAuth>} />
        <Route path="/admin/testimonials" element={<RequireAuth><ShowTestimonials /></RequireAuth>} />
        <Route path="/admin/testimonials/create" element={<RequireAuth><CreateTestimonials /></RequireAuth>} />
        <Route path="/admin/testimonials/edit/:id" element={<RequireAuth><EditTestimonials /></RequireAuth>} />
        <Route path="/admin/members" element={<RequireAuth><ShowMembers /></RequireAuth>} />
        <Route path="/admin/members/create" element={<RequireAuth><CreateMembers /></RequireAuth>} />
        <Route path="/admin/members/edit/:id" element={<RequireAuth><EditMembers /></RequireAuth>} />
        <Route path="/admin/messages" element={<RequireAuth><ShowMessages /></RequireAuth>} />
        <Route path="/admin/messages/:id" element={<RequireAuth><MessageDetails /></RequireAuth>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isDashboard && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
