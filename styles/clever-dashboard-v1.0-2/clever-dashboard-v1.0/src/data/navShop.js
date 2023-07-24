var themeNav = require('./navTheme');

module.exports = [
    {
        name: "",
        content: [
            {
                label: "Overview",
                icon: "shop",
                path: "/pages/ecommerce/overview.html"
            },
            {
                label: "Products",
                icon: "tags-fill",
                path: "/pages/ecommerce/products.html"
            },
            {
                label: "Customers",
                icon: "people-fill",
                path: "/pages/ecommerce/customers.html"
            },
            {
                label: "Orders",
                icon: "cart-check-fill",
                path: "/pages/ecommerce/orders.html"
            },
            {
                label: "Invoices",
                icon: "receipt",
                path: "/pages/ecommerce/orders.html"
            },
            {
                label: "Reviews",
                icon: "star-half",
                path: "/pages/ecommerce/reviews.html"
            }
        ]
    },
    themeNav
]
