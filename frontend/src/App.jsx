import { BrowserRouter, Routes, Route } from "react-router-dom";
import CursorGlow from "./components/CursorGlow/CursorGlow";
import Layout from "./components/Layout/Layout";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Resume from "./pages/Resume";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import CurrentPassword from "./pages/CurrentPassword";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import HomeManager from "./pages/HomeManager";
import ProjectsManager from "./pages/ProjectManager";
import AboutManager from "./pages/AboutManager";
import ResumeManager from "./pages/ResumeManager";
import BlogManager from "./pages/BlogManager";
import ContactManager from "./pages/ContactManager";
import BlogPost from "./pages/BlogPost";
import ProjectDetails from "./pages/ProjectDetails";
import ProjectCaseStudy from "./pages/ProjectCaseStudy";
import PortfolioAI from "./components/PortfolioAI";
function App() {
  return (
    <BrowserRouter>
      <CursorGlow />
      <Layout>
        <PortfolioAI />
        

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />}
           />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/current-password" element={<CurrentPassword />} />
          
          <Route
  path="/admin-dashboard"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/home-manager"
  element={
    <ProtectedRoute>
      <HomeManager />
    </ProtectedRoute>
  }
/>
<Route
  path="/about-manager"
  element={
    <ProtectedRoute>
      <AboutManager />
    </ProtectedRoute>
  }
/>
<Route
  path="/resume-manager"
  element={
    <ProtectedRoute>
      <ResumeManager />
    </ProtectedRoute>
  }
/>
<Route
  path="/blog-manager"
  element={
    <ProtectedRoute>
      <BlogManager />
    </ProtectedRoute>
  }
/>

<Route
  path="/contact-manager"
  element={
    <ProtectedRoute>
      <ContactManager />
    </ProtectedRoute>
  }
/>
<Route path="/blog/:id" element={<BlogPost />} />
<Route path="/projects/:id" element={<ProjectDetails />} />
<Route path="/projects/:id" element={<ProjectCaseStudy />} />
<Route
  path="/projects-manager"
  element={
    <ProtectedRoute>
      <ProjectsManager />
    </ProtectedRoute>
  }
/>
        </Routes>

      </Layout>

    </BrowserRouter>
  );

  


}

export default App;