var themeNav = require('./navTheme');

module.exports = [
    {
        name: "New tasks",
        emoji: "📬",
        color: 'secondary',
        content: [
            {
                name: 'Get another day full of work done!',
                comments: 6,
                progress: {
                    color: 'success',
                    value: 74
                },
                badge: {
                    color: 'warning',
                    text: 'Important'
                }
            },
            {
                name: "Keep my mentality healthy by taking walks outside",
                comments: 3,
                progress: {
                    color: 'warning',
                    value: 38
                },
                checked: true
            }
        ]
    },
    {
        name: "Do today",
        emoji: "✨",
        color: 'primary',
        content: [
            {
                name: "Figure out how to use Clever from the help center! ",
                comments: 12,
                progress: {
                    color: 'primary',
                    value: 10
                },
                checked: true
            },
            {
                name: "Build some new components in Figma",
                comments: 5,
                progress: {
                    color: 'success',
                    value: 83
                },
                badge: {
                    color: 'success',
                    text: 'New product'
                }
            },
            {
                name: "Create wireframes for the new dashboard",
                comments: 3,
                progress: {
                    color: 'danger',
                    value: 4
                },
                checked: true
            }
        ]
    },
    {
        name: "In progress",
        emoji: "✍",
        color: 'tertiary',
        content: [
            {
                name: "Figure out how to use Clever from the help center! ",
                comments: 12,
                progress: {
                    color: 'primary',
                    value: 10
                }
            },
            {
                name: "Build some new components in Figma",
                comments: 5,
                progress: {
                    color: 'success',
                    value: 83
                },
                badge: {
                    color: 'danger',
                    text: 'Delayed'
                },
            },
            {
                name: "Create wireframes for the new dashboard",
                comments: 3,
                progress: {
                    color: 'danger',
                    value: 4
                },
                checked: true
            },
            {
                name: 'Get another day full of work done!',
                comments: 6,
                progress: {
                    color: 'success',
                    value: 74
                }
            },
            {
                name: "Keep my mentality healthy by taking walks outside",
                comments: 3,
                progress: {
                    color: 'warning',
                    value: 38
                }
            }
        ]
    },
    {
        name: "For later",
        emoji: "✍",
        color: 'warning',
        content: [
            {
                name: "Figure out how to use Clever from the help center! ",
                comments: 12,
                progress: {
                    color: 'primary',
                    value: 10
                }
            },
            {
                name: "Build some new components in Figma",
                comments: 5,
                progress: {
                    color: 'success',
                    value: 83
                },
                badge: {
                    color: 'danger',
                    text: 'Delayed'
                },
            },
            {
                name: "Create wireframes for the new dashboard",
                comments: 3,
                progress: {
                    color: 'danger',
                    value: 4
                },
                checked: true
            },
            {
                name: 'Get another day full of work done!',
                comments: 6,
                progress: {
                    color: 'success',
                    value: 74
                }
            },
            {
                name: "Keep my mentality healthy by taking walks outside",
                comments: 3,
                progress: {
                    color: 'warning',
                    value: 38
                }
            }
        ]
    }
]
