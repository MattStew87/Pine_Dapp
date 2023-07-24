var themeNav = require('./navTheme');

module.exports = [
    {
        name: "",
        content: [
            {
                label: "Projects",
                icon: "briefcase",
                path: "/pages/projects",
                submenu: [
                    {
                        label: "Overview",
                        path: "/pages/projects/overview.html"
                    },
                    {
                        label: "Grid View",
                        path: "/pages/projects/grid-view.html"
                    },
                    {
                        label: "Table View",
                        path: "/pages/projects/table-view.html"
                    },
                    {
                        label: "Details",
                        path: "/pages/projects/details.html"
                    },
                    {
                        label: "Create Project",
                        path: "/pages/projects/create-project.html"
                    }
                ]
            },
            {
                label: "Tasks",
                icon: "kanban",
                path: "/pages/tasks",
                submenu: [
                    {
                        label: "Overview",
                        path: "/pages/tasks/overview.html"
                    },
                    {
                        label: "List View",
                        path: "/pages/tasks/list-view.html"
                    },
                    {
                        label: "List View w/ Details",
                        path: "/pages/tasks/list-view-aside.html"
                    },
                    {
                        label: "Board View",
                        path: "/pages/tasks/board-view.html"
                    },
                    {
                        label: "Create Task",
                        path: "/pages/tasks/create-task.html"
                    }
                ]
            },
            {
                label: "Files",
                icon: "file-earmark-text",
                path: "/pages/files",
                submenu: [
                    {
                        label: "Overview",
                        path: "/pages/files/overview.html"
                    },
                    {
                        label: "Table View",
                        path: "/pages/files/table-view.html"
                    },
                    {
                        label: "Media Gallery",
                        path: "/pages/files/media-gallery.html"
                    }
                ]
            },
            {
                label: "Integrations",
                icon: "terminal",
                path: "/pages/integrations",
                submenu: [
                    {
                        label: "Applications",
                        path: "/pages/integrations/applications.html"
                    },
                    {
                        label: "Manage Apps",
                        path: "/pages/integrations/manage-apps.html"
                    }
                ]
            },
            {
                label: "User",
                icon: "people",
                path: "/pages/user",
                submenu: [
                    {
                        label: "Profile",
                        path: "/pages/user/profile.html"
                    },
                    {
                        label: "Table View",
                        path: "/pages/user/table-view.html"
                    },
                    {
                        label: "Permissions",
                        path: "/pages/user/permissions.html"
                    }
                ]
            },
            {
                label: "Settings",
                icon: "gear",
                path: "/pages/settings",
                submenu: [
                    {
                        label: "General",
                        path: "/pages/settings/general.html"
                    },
                    {
                        label: "Security",
                        path: "/pages/settings/security.html"
                    },
                    {
                        label: "Team",
                        path: "/pages/settings/team.html"
                    },
                    {
                        label: "Billing",
                        path: "/pages/settings/billing.html"
                    },
                    {
                        label: "Notifications",
                        path: "/pages/settings/notifications.html"
                    }
                ]
            },
            {
                label: "Authentication",
                icon: "person-bounding-box",
                path: "/pages/authentication",
                submenu: [
                    {
                        label: "Basic Login",
                        path: "/pages/authentication/basic-login.html"
                    },
                    {
                        label: "Basic Register",
                        path: "/pages/authentication/basic-register.html"
                    },
                    {
                        label: "Basic Recover",
                        path: "/pages/authentication/basic-recover.html"
                    },
                    {
                        label: "Side Login",
                        path: "/pages/authentication/side-login.html"
                    },
                    {
                        label: "Side Register",
                        path: "/pages/authentication/side-register.html"
                    },
                    {
                        label: "Side Recover",
                        path: "/pages/authentication/side-recover.html"
                    }
                ]
            }
        ]
    }
]
