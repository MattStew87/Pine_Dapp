module.exports = {
    name: "Build Yours",
    content: [
        {
            label: "Layouts",
            icon: "layout-sidebar-inset-reverse",
            path: "/pages/layouts",
            submenu: [
                {
                    label: "Base",
                    path: "/pages/layouts/base.html"
                },
                {
                    label: "Alternative",
                    path: "/pages/layouts/alt.html"
                },
                {
                    label: "Columns",
                    path: "/pages/layouts/columns.html"
                }
            ]
        },
        {
            label: "Documentation",
            icon: "code-square",
            path: "/docs",
            submenu: [
                {
                    label: "Getting Started",
                    path: "/docs/getting-started"
                },
                {
                    label: "Style Guide",
                    path: "/docs/styleguide"
                },
                {
                    label: "Customize",
                    path: "/docs/customize"
                },
                {
                    label: "About",
                    path: "/docs/about"
                }
            ]
        }
    ]
}
