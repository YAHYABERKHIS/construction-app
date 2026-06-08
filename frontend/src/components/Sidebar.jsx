import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { AuthContext } from "./backend/context/Auth";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Briefcase,
  FolderOpen,
  FileText,
  LogOut,
  Users,
  MessageCircleCode,
  Mail,
} from "lucide-react";
const Sidebar = ({ activePage = "dashboard" }) => {
  const { t } = useTranslation();
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const menuItems = [
    {
      icon: <Home size={18} />,
      titleKey: "admin.dashboard",
      link: "/admin/dashboard",
      id: "dashboard",
    },
    {
      icon: <Briefcase size={18} />,
      titleKey: "admin.services",
      link: "/admin/services",
      id: "services",
    },
    {
      icon: <FolderOpen size={18} />,
      titleKey: "admin.projects",
      link: "/admin/projects",
      id: "projects",
    },
    {
      icon: <Mail size={18} />,
      titleKey: "admin.messages",
      link: "/admin/messages",
      id: "messages",
    },
    {
      icon: <FileText size={18} />,
      titleKey: "admin.articles",
      link: "/admin/articles",
      id: "articles",
    },
    {
      icon: <MessageCircleCode size={18} />,
      titleKey: "admin.testimonials",
      link: "/admin/testimonials",
      id: "testimonials",
    },
    {
      icon: <Users size={18} />,
      titleKey: "admin.members",
      link: "/admin/members",
      id: "members",
    },
  ];

  return (
    <div className="sidebar card h-auto border-0 shadow-sm">
      <div className="card-body p-0">
        <div className="brand-header p-4 border-bottom">
          <h4 className="mb-0 fw-bold text-primary">GHANI SAKAN</h4>
          <p className="text-muted small mb-0">{t("admin.brand_subtitle")}</p>
        </div>

        <div className="p-3">
          <p className="text-uppercase text-muted small fw-bold ms-3 mt-2 mb-3">
            {t("admin.menu_main")}
          </p>
          <ul className="nav flex-column">
            {menuItems.map((item) => (
              <li className="nav-item mb-1" key={item.id}>
                <a
                  href={item.link}
                  className={`nav-link d-flex align-items-center rounded py-2 px-3 ${
                    activePage === item.id
                      ? "active bg-primary text-white"
                      : "text-body"
                  }`}
                >
                  <span className="admin-sidebar-icon">{item.icon}</span>
                  {t(item.titleKey)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-3 mt-auto border-top">
          <button
            type="button"
            className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center"
            onClick={handleLogout}
          >
            <LogOut size={18} className="me-2" />
            {t("admin.logout")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
