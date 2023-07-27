import React from 'react';
import Link from 'next/link';


import { ConnectButton } from '@rainbow-me/rainbowkit';
import Profile from '../components/profile';
import LeaderBoard from '../components/LeaderBoard';




// add HTML here which has been adjusted for React/Next.js 
// Wnat to put overview.html here from files/overview 
// Make that the main page at Components on Top


const Main = () => {


    return (
        <div>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
            <meta name="color-scheme" content="dark light" />
            <title>Storage Management | Clever Admin Dashboard Template</title>
            {/* Bootstrap Icons */}
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css" />
            {/* Styles */}
            <link rel="stylesheet" type="text/css" href="/css/main.css" />
            {/* Utilities */}
            <link rel="stylesheet" type="text/css" href="/css/utilities.css" />
            <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
            {/* Sidebar */}
            <nav className="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg" id="sidebar">
                <div className="container-fluid">
                {/* Toggler */}
                <button className="navbar-toggler ms-n2" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                {/* Brand */}
                <Link className="navbar-brand py-lg-2 mb-lg-5 px-lg-6 me-0" href="/">
                    <img src="/img/logos/clever-primary.svg" alt="..." />
                </Link>
                {/* User menu (mobile) */}
                <div className="navbar-user d-lg-none">
                    {/* Dropdown */}
                    <div className="dropdown">
                    {/* Toggle */}
                    <Link href="#" id="sidebarAvatar" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <div className="avatar-parent-child">
                            {/* Profile Goes here*/}
                            <Profile/> 
                        <span className="avatar-child avatar-badge bg-success" />
                        </div>
                    </Link>
                    {/* Menu */}
                    <div className="dropdown-menu dropdown-menu-end" aria-labelledby="sidebarAvatar">
                        <Link href="#" className="dropdown-item">Profile</Link>
                        <Link href="#" className="dropdown-item">Settings</Link>
                        <Link href="#" className="dropdown-item">Billing</Link>
                        <hr className="dropdown-divider" />
                        <Link href="#" className="dropdown-item">Logout</Link>
                    </div>
                    </div>
                </div>
                {/* Collapse */}
                <div className="collapse navbar-collapse" id="sidebarCollapse">
                    {/* Navigation */}
                    <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="#sidebar-projects" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebar-projects">
                        <i className="bi bi-briefcase" /> Projects
                        </a>
                        <div className="collapse" id="sidebar-projects">
                        <ul className="nav nav-sm flex-column">
                            <li className="nav-item">
                                <Link href="/pages/projects/overview.html" className="nav-link">Overview</Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/pages/projects/grid-view.html" className="nav-link">Grid View</Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/pages/projects/table-view.html" className="nav-link">Table View</Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/pages/projects/details.html" className="nav-link">Details</Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/pages/projects/create-project.html" className="nav-link">Create Project</Link>
                            </li>
                        </ul>
                    </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#sidebar-tasks" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebar-tasks">
                        <i className="bi bi-kanban" /> Tasks
                        </a>
                        <div className="collapse" id="sidebar-tasks">
                        <ul className="nav nav-sm flex-column">
                            <li className="nav-item">
                            <Link href="/pages/tasks/overview.html" className="nav-link">
                                Overview
                            </Link>
                            </li>
                            <li className="nav-item">
                            <Link href="/pages/tasks/list-view.html" className="nav-link">
                                List View
                            </Link>
                            </li>
                            <li className="nav-item">
                            <Link href="/pages/tasks/list-view-aside.html" className="nav-link">
                                List View w/ Details
                            </Link>
                            </li>
                            <li className="nav-item">
                            <Link href="/pages/tasks/board-view.html" className="nav-link">
                                Board View
                            </Link>
                            </li>
                            <li className="nav-item">
                            <Link href="/pages/tasks/create-task.html" className="nav-link">
                                Create Task
                            </Link>
                            </li>
                        </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="#sidebar-files" data-bs-toggle="collapse" role="button" aria-expanded="true" aria-controls="sidebar-files">
                        <i className="bi bi-file-earmark-text" /> Files
                        </a>
                        <div className="collapse show" id="sidebar-files">
                        <ul className="nav nav-sm flex-column">
                            <li className="nav-item">
                            <Link href="/pages/files/overview.html" className="nav-link font-bold">
                                Overview
                            </Link>
                            </li>
                            <li className="nav-item">
                            <Link href="/pages/files/table-view.html" className="nav-link">
                                Table View
                            </Link>
                            </li>
                            <li className="nav-item">
                            <Link href="/pages/files/media-gallery.html" className="nav-link">
                                Media Gallery
                            </Link>
                            </li>
                        </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#sidebar-integrations" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebar-integrations">
                        <i className="bi bi-terminal" /> Integrations
                        </a>
                        <div className="collapse" id="sidebar-integrations">
                        <ul className="nav nav-sm flex-column">
                            <li className="nav-item">
                            <Link href="/pages/integrations/applications.html" className="nav-link">
                                Applications
                            </Link>
                            </li>
                            <li className="nav-item">
                            <Link href="/pages/integrations/manage-apps.html" className="nav-link">
                                Manage Apps
                            </Link>
                            </li>
                        </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#sidebar-user" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebar-user">
                        <i className="bi bi-people" /> User
                        </a>
                        <div className="collapse" id="sidebar-user">
                        <ul className="nav nav-sm flex-column">
                            <li className="nav-item">
                            <Link href="/pages/user/profile.html" className="nav-link">
                                Profile
                            </Link>
                            </li>
                            <li className="nav-item">
                            <Link href="/pages/user/table-view.html" className="nav-link">
                                Table View
                            </Link>
                            </li>
                            <li className="nav-item">
                            <Link href="/pages/user/permissions.html" className="nav-link">
                                Permissions
                            </Link>
                            </li>
                        </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#sidebar-settings" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebar-settings">
                        <i className="bi bi-gear" /> Settings
                        </a>
                        <div className="collapse" id="sidebar-settings">
                        <ul className="nav nav-sm flex-column">
                            <li className="nav-item">
                            <Link href="/pages/settings/general.html" className="nav-link">
                                General
                            </Link>
                            </li>
                            <li className="nav-item">
                            <Link href="/pages/settings/security.html" className="nav-link">
                                Security
                            </Link>
                            </li>
                            <li className="nav-item">
                            <Link href="/pages/settings/team.html" className="nav-link">
                                Team
                            </Link>
                            </li>
                            <li className="nav-item">
                            <Link href="/pages/settings/billing.html" className="nav-link">
                                Billing
                            </Link>
                            </li>
                            <li className="nav-item">
                            <Link href="/pages/settings/notifications.html" className="nav-link">
                                Notifications
                            </Link>
                            </li>
                        </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#sidebar-authentication" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebar-authentication">
                        <i className="bi bi-person-bounding-box" /> Authentication
                        </a>
                        <div className="collapse" id="sidebar-authentication">
                        <ul className="nav nav-sm flex-column">
                            <li className="nav-item">
                            <Link href="/pages/authentication/basic-login.html" className="nav-link">
                                Basic Login
                            </Link>
                            </li>
                            <li className="nav-item">
                            <Link href="/pages/authentication/basic-register.html" className="nav-link">
                                Basic Register
                            </Link>
                            </li>
                            <li className="nav-item">
                            <Link href="/pages/authentication/basic-recover.html" className="nav-link">
                                Basic Recover
                            </Link>
                            </li>
                            <li className="nav-item">
                            <Link href="/pages/authentication/side-login.html" className="nav-link">
                                Side Login
                            </Link>
                            </li>
                            <li className="nav-item">
                            <Link href="/pages/authentication/side-register.html" className="nav-link">
                                Side Register
                            </Link>
                            </li>
                            <li className="nav-item">
                            <Link href="/pages/authentication/side-recover.html" className="nav-link">
                                Side Recover
                            </Link>
                            </li>
                        </ul>
                        </div>
                    </li>
                    </ul>
                    {/* Divider */}
                    <hr className="navbar-divider my-4 opacity-70" />
                    {/* Documentation */}
                    <ul className="navbar-nav">
                    <li>
                        <span className="nav-link text-xs font-semibold text-uppercase text-muted ls-wide">
                        Resources
                        </span>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link py-2" href="/docs">
                        <i className="bi bi-code-square" /> Documentation
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link py-2 d-flex align-items-center" href="https://webpixels.io/themes/clever-admin-dashboard-template/releases" target="_blank">
                        <i className="bi bi-journals" />
                        <span>Changelog</span>
                        <span className="badge badge-sm bg-soft-success text-success rounded-pill ms-auto">v1.0.0</span>
                        </a>
                    </li>
                    </ul>
                    {/* Push content down */}
                    <div className="mt-auto" />
                    {/* User menu */}
                    <div className="my-4 px-lg-6 position-relative">
                    <div className="dropup w-full">
                        <button className="btn-primary d-flex w-full py-3 ps-3 pe-4 align-items-center shadow shadow-3-hover rounded-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className="me-3">
                            {/* Profile Goes Here */}
                            <Profile/> 
                        </span>
                        <span className="flex-fill text-start text-sm font-semibold">
                            Tahlia Mooney
                        </span>
                        <span>
                            <i className="bi bi-chevron-expand text-white text-opacity-70" />
                        </span>
                        </button>
                        <div className="dropdown-menu dropdown-menu-end w-full">
                        <div className="dropdown-header">
                            <span className="d-block text-sm text-muted mb-1">Signed in as</span>
                            <span className="d-block text-heading font-semibold">Tahlia Mooney</span>
                        </div>
                        <div className="dropdown-divider" />
                        <a className="dropdown-item" href="#">
                            <i className="bi bi-house me-3" />Home
                        </a>
                        <a className="dropdown-item" href="#">
                            <i className="bi bi-pencil me-3" />Profile
                        </a>
                        <a className="dropdown-item" href="#">
                            <i className="bi bi-gear me-3" />Settings
                        </a>
                        <div className="dropdown-divider" />
                        <a className="dropdown-item" href="#">
                            <i className="bi bi-box-arrow-left me-3" />Logout
                        </a>
                        </div>
                    </div>
                    <div className="d-flex gap-3 justify-content-center align-items-center mt-6 d-none">
                        <div>
                        <i className="bi bi-moon-stars me-2 text-warning me-2" />
                        <span className="text-heading text-sm font-bold">Dark mode</span>
                        </div>
                        <div className="ms-auto">
                        <div className="form-check form-switch me-n2">
                            <input className="form-check-input" type="checkbox" id="switch-dark-mode" />
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </nav>
            {/* Content */}
            <div className="flex-lg-1 h-screen overflow-y-lg-auto">
                {/* Navbar */}
                <header>
                <div className="container-fluid">
                    <div className="border-bottom pt-6">
                    <div className="row align-items-center">
                        <div className="col-md-6 col-12 mb-4 mb-sm-0">
                        {/* Title */}
                        <h1 className="h2 ls-tight">
                            Storage Management
                        </h1>
                        </div>
                        {/* Actions */}
                        <div className="col-md-6 col-12 text-md-end">
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    padding: 12,
                                }}
                                >
                                <ConnectButton />
                            </div>
                        </div>
                    </div>
                    {/* Nav */}
                    <ul className="nav nav-tabs overflow-x border-0">
                        <li className="nav-item">
                        <Link href="#" className="nav-link active">View all</Link>
                        </li>
                        <li className="nav-item">
                        <Link href="#" className="nav-link">Most recent</Link>
                        </li>
                        <li className="nav-item">
                        <Link href="#" className="nav-link">Popular</Link>
                        </li>
                    </ul>
                    </div>
                </div>
                </header>
                {/* Main */}
                <main className="py-6 bg-surface-secondary">
                <div className="container-fluid">
                    {/* Row 1 */}
                    <div className="row g-6 mb-8">
                    <div className="col-xl col-sm-6 col-12">
                        <div className="card">
                        <div className="card-body">
                            {/* Icon + Dropdown */}
                            <div className="d-flex justify-content-between mb-5">
                            <div className="me-4">
                                <div className="icon icon-shape rounded-4 bg-secondary bg-opacity-40">
                                <img src="/img/social/flickr.svg" alt="..." />
                                </div>
                            </div>
                            <div className="dropdown">
                                <a className="text-muted" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="bi bi-three-dots" />
                                </a>
                                <div className="dropdown-menu">
                                <Link href="#!" className="dropdown-item">
                                    Action
                                </Link>
                                <Link href="#!" className="dropdown-item">
                                    Another action
                                </Link>
                                <Link href="#!" className="dropdown-item">
                                    Something else here
                                </Link>
                                </div>
                            </div>
                            </div>
                            {/* Title */}
                            <h6 className="h5 font-semibold mb-6">Flickr Storage</h6>
                            {/* Progress */}
                            <div className="d-flex align-items-center justify-content-between mb-1">
                            <span className="text-sm text-uppercase text-muted d-block">10 GB</span>
                            <span className="text-sm text-uppercase text-muted d-block">30 GB</span>
                            </div>
                            <div className="progress progress-sm shadow-none">
                            <div className="progress-bar bg-tertiary" role="progressbar" style={{width: '30%'}} aria-valuenow={30} aria-valuemin={0} aria-valuemax={100} />
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-xl col-sm-6 col-12">
                        <div className="card">
                        <div className="card-body">
                            {/* Icon + Dropdown */}
                            <div className="d-flex justify-content-between mb-5">
                            <div className="me-4">
                                <div className="icon icon-shape rounded-4 bg-secondary bg-opacity-40">
                                <img src="/img/social/slack.svg" alt="..." />
                                </div>
                            </div>
                            <div className="dropdown">
                                <a className="text-muted" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="bi bi-three-dots" />
                                </a>
                                <div className="dropdown-menu">
                                <Link href="#!" className="dropdown-item">
                                    Action
                                </Link>
                                <Link href="#!" className="dropdown-item">
                                    Another action
                                </Link>
                                <Link href="#!" className="dropdown-item">
                                    Something else here
                                </Link>
                                </div>
                            </div>
                            </div>
                            {/* Title */}
                            <h6 className="h5 font-semibold mb-6">Slack Storage</h6>
                            {/* Progress */}
                            <div className="d-flex align-items-center justify-content-between mb-1">
                            <span className="text-sm text-uppercase text-muted d-block">20 GB</span>
                            <span className="text-sm text-uppercase text-muted d-block">30 GB</span>
                            </div>
                            <div className="progress progress-sm shadow-none">
                            <div className="progress-bar bg-primary" role="progressbar" style={{width: '60%'}} aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} />
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-xl col-sm-6 col-12">
                        <div className="card">
                        <div className="card-body">
                            {/* Icon + Dropdown */}
                            <div className="d-flex justify-content-between mb-5">
                            <div className="me-4">
                                <div className="icon icon-shape rounded-4 bg-secondary bg-opacity-40">
                                <img src="/img/social/amazon.svg" alt="..." />
                                </div>
                            </div>
                            <div className="dropdown">
                                <a className="text-muted" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="bi bi-three-dots" />
                                </a>
                                <div className="dropdown-menu">
                                <Link href="#!" className="dropdown-item">
                                    Action
                                </Link>
                                <Link href="#!" className="dropdown-item">
                                    Another action
                                </Link>
                                <Link href="#!" className="dropdown-item">
                                    Something else here
                                </Link>
                                </div>
                            </div>
                            </div>
                            {/* Title */}
                            <h6 className="h5 font-semibold mb-6">Amazon Storage</h6>
                            {/* Progress */}
                            <div className="d-flex align-items-center justify-content-between mb-1">
                            <span className="text-sm text-uppercase text-muted d-block">90 GB</span>
                            <span className="text-sm text-uppercase text-muted d-block">100 GB</span>
                            </div>
                            <div className="progress progress-sm shadow-none">
                            <div className="progress-bar bg-warning" role="progressbar" style={{width: '90%'}} aria-valuenow={90} aria-valuemin={0} aria-valuemax={100} />
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    {/* Row 2 */}
                    <div className="d-flex align-items-center mb-5">
                    <div>
                        <h5 className="mb-0">My folders</h5>
                    </div>
                    <div className="ms-auto">
                        <Link href="#" className="btn btn-sm btn-neutral">See more</Link>
                    </div>
                    </div>
                    <div className="row g-6 mb-8">
                    <div className="col-xl-3 col-sm-6 col-12">
                        <div className="card">
                        <div className="card-body">
                            {/* Icon + Avatar group */}
                            <div className="d-flex align-items-center justify-content-between mb-5">
                            <div className="me-4">
                                <div className="icon icon-shape rounded-4 bg-secondary bg-opacity-40 text-lg text-heading">
                                <i className="bi bi-folder-fill" />
                                </div>
                            </div>
                            <div>
                                <div className="avatar-group">
                                <Link href="#" className="avatar avatar-sm bg-primary rounded-circle text-white border border-2 border-solid border-card">
                                    AE
                                </Link>
                                <Link href="#" className="avatar avatar-sm bg-tertiary rounded-circle text-white border border-2 border-solid border-card">
                                    MJ
                                </Link>
                                <Link href="#" className="avatar avatar-sm rounded-circle text-white border border-2 border-solid border-card">
                                    <img alt="..." src="/img/people/img-1.jpg" />
                                </Link>
                                </div>
                            </div>
                            </div>
                            {/* Title */}
                            <h6 className="h5 font-semibold mb-5">Illustrations</h6>
                            {/* Info */}
                            <div className="d-flex justify-content-between">
                            <span className="text-muted text-sm">30 files</span>
                            <span className="text-muted text-sm">25 MB</span>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 col-12">
                        <div className="card">
                        <div className="card-body">
                            {/* Icon + Avatar group */}
                            <div className="d-flex align-items-center justify-content-between mb-5">
                            <div className="me-4">
                                <div className="icon icon-shape rounded-4 bg-secondary bg-opacity-40 text-lg text-heading">
                                <i className="bi bi-folder-fill" />
                                </div>
                            </div>
                            <div>
                                <div className="avatar-group">
                                <Link href="#" className="avatar avatar-sm bg-primary rounded-circle text-white border border-2 border-solid border-card">
                                    AE
                                </Link>
                                <Link href="#" className="avatar avatar-sm bg-tertiary rounded-circle text-white border border-2 border-solid border-card">
                                    MJ
                                </Link>
                                <Link href="#" className="avatar avatar-sm rounded-circle text-white border border-2 border-solid border-card">
                                    <img alt="..." src="/img/people/img-1.jpg" />
                                </Link>
                                </div>
                            </div>
                            </div>
                            {/* Title */}
                            <h6 className="h5 font-semibold mb-5">Marketing stuff</h6>
                            {/* Info */}
                            <div className="d-flex justify-content-between">
                            <span className="text-muted text-sm">1200 files</span>
                            <span className="text-muted text-sm">25 GB</span>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 col-12">
                        <div className="card">
                        <div className="card-body">
                            {/* Icon + Avatar group */}
                            <div className="d-flex align-items-center justify-content-between mb-5">
                            <div className="me-4">
                                <div className="icon icon-shape rounded-4 bg-secondary bg-opacity-40 text-lg text-heading">
                                <i className="bi bi-folder-fill" />
                                </div>
                            </div>
                            <div>
                                <div className="avatar-group">
                                <Link href="#" className="avatar avatar-sm bg-primary rounded-circle text-white border border-2 border-solid border-card">
                                    AE
                                </Link>
                                <Link href="#" className="avatar avatar-sm bg-tertiary rounded-circle text-white border border-2 border-solid border-card">
                                    MJ
                                </Link>
                                <Link href="#" className="avatar avatar-sm rounded-circle text-white border border-2 border-solid border-card">
                                    <img alt="..." src="/img/people/img-1.jpg" />
                                </Link>
                                </div>
                            </div>
                            </div>
                            {/* Title */}
                            <h6 className="h5 font-semibold mb-5">Documentation</h6>
                            {/* Info */}
                            <div className="d-flex justify-content-between">
                            <span className="text-muted text-sm">40 files</span>
                            <span className="text-muted text-sm">13.5 MB</span>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 col-12">
                        <div className="card">
                        <div className="card-body">
                            {/* Icon + Avatar group */}
                            <div className="d-flex align-items-center justify-content-between mb-5">
                            <div className="me-4">
                                <div className="icon icon-shape rounded-4 bg-secondary bg-opacity-40 text-lg text-heading">
                                <i className="bi bi-folder-fill" />
                                </div>
                            </div>
                            <div>
                                <div className="avatar-group">
                                <Link href="#" className="avatar avatar-sm bg-primary rounded-circle text-white border border-2 border-solid border-card">
                                    AE
                                </Link>
                                <Link href="#" className="avatar avatar-sm bg-tertiary rounded-circle text-white border border-2 border-solid border-card">
                                    MJ
                                </Link>
                                <Link href="#" className="avatar avatar-sm rounded-circle text-white border border-2 border-solid border-card">
                                    <img alt="..." src="/img/people/img-1.jpg" />
                                </Link>
                                </div>
                            </div>
                            </div>
                            {/* Title */}
                            <h6 className="h5 font-semibold mb-5">Images</h6>
                            {/* Info */}
                            <div className="d-flex justify-content-between">
                            <span className="text-muted text-sm">2500 files</span>
                            <span className="text-muted text-sm">32 GB</span>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    {/* Table */}
                    <div className="card">
                    <div className="card-header">
                        <h5 className="mb-0">Community Leaderboard:</h5>
                    </div>
                    <div className="table-responsive">
                        <LeaderBoard/>
                    </div>
                    </div>
                </div>
                
                </main>
            </div>
            </div>
        </div>
        );
    }


export default Main;