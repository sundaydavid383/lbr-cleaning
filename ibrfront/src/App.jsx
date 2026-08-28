import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './component/ScrollToTop';
import { AuthProvider } from './context/AuthContext';
import Nav from './component/nav/Nav';
import Footer from './component/footer/Footer';
import { EditModeProvider } from "./context/EditModeContext";
import AdminEditLayout from './component/adminEditLayout/AdminEditLayout';
import AdminLayout from './pages/admin/AdminLayout';
import AdminProtectedRoute from './component/admin/AdminProtectedRoute';
import { UserGuideProvider, useUserGuide } from './context/UserGuideContext';
import UserGuideOverlay from './component/userGuide/UserGuideOverlay';
import GlobalEditToggle from './component/globalEditToggle/GlobalEditToggle';
import { ToastProvider } from './component/toast/ToastProvider';
import { ErrorBoundary } from './component/errorBoundary/ErrorBoundary';

const AdminLogin = lazy(() => import('./pages/auth/AdminLogin'));
const AdminCreateAdmin = lazy(() => import('./pages/auth/AdminCreateAdmin'));
const Home = lazy(() => import('./pages/home/Home'));
const Service = lazy(() => import('./pages/service/Service'));
const ServiceDetails = lazy(() => import('./component/serviceDetails/serviceDetails'));
const Contact = lazy(() => import('./component/contact/Contact'));
const Blog = lazy(() => import('./pages/blog/Blog'));
const About = lazy(() => import('./pages/about/About'));
const NotifySubscribers = lazy(() => import('./pages/notifySubscribers/NotifySubscribers'));
const AdminMessagePage = lazy(() => import('./pages/admin/AdminMessagePage'));
const NotFoundPage = lazy(() => import('./pages/notFoundPage/NotFoundPage'));
const Apply = lazy(() => import('./pages/apply/Apply'));
const Payment = lazy(() => import('./pages/payment/Payment'));
const Login = lazy(() => import('./pages/auth/Login'));
const Signup = lazy(() => import('./pages/auth/Signup'));
const InformationHub = lazy(() => import('./pages/information/InformationHub'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const CmsDashboard = lazy(() => import('./pages/admin/cms/CmsDashboard'));
const CmsEditor = lazy(() => import('./pages/admin/cms/CmsEditor'));
const CmsBatchEditor = lazy(() => import('./pages/admin/cms/CmsBatchEditor'));

const RouteSkeleton = () => (
  <div style={{ 
    minHeight: '60vh', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    background: 'var(--background-color)'
  }}>
    <div className="loading-bars" aria-hidden="true">
      <span></span><span></span><span></span><span></span><span></span>
    </div>
  </div>
);

const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <EditModeProvider>
          <BrowserRouter>
            <UserGuideProvider>
              <ToastProvider>
                <ScrollToTop />
                <Nav />
                <Suspense fallback={<RouteSkeleton />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/service" element={<Service />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/portal/a9f2c1e8b4d67320" element={<Navigate to="/admin/login" replace />} />
                    <Route path="/admin/create-admin" element={<AdminCreateAdmin />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services/:serviceId" element={<ServiceDetails />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/apply" element={<Apply />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/information" element={<InformationHub />} />
                    <Route path="/dashboard/*" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/notify" element={<NotifySubscribers />} />
                    <Route path="/admin" element={<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>}>
                      <Route path="message" element={<AdminMessagePage />} />
                      <Route path="cms" element={<CmsDashboard />} />
                      <Route path="cms/batch" element={<CmsBatchEditor />} />
                      <Route path="cms/:key" element={<CmsEditor />} />

                      {/* Visual, in-place editor — same live pages, edit mode on */}
                      <Route path="edit" element={<AdminEditLayout />}>
                        <Route index element={<Navigate to="/admin/edit/about" replace />} />
                        <Route path="home" element={<Home />} />
                        <Route path="about" element={<About />} />
                        <Route path="services" element={<Service />} />
                        <Route path="services/:serviceId" element={<ServiceDetails />} />
                        <Route path="blog" element={<Blog />} />
                        <Route path="contact" element={<Contact />} />
                      </Route>

                      <Route path="create-admin" element={<AdminCreateAdmin />} />
                    </Route>

                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Suspense>
                <Footer />
                <UserGuideOverlay />
                <GlobalEditToggle />
              </ToastProvider>
            </UserGuideProvider>
          </BrowserRouter>
        </EditModeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;