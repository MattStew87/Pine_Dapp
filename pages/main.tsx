import React from 'react';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import { useState, useEffect } from 'react';


//Imported Components for main.tsx page 
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Profile from '../components/profile';
import LeaderBoard from '../components/LeaderBoard';
import DisplayPineBadges from '../components/DisplayPineBadges';
import DisplayPineNFT from '../components/DisplayPineNFT';
import DisplayTwDs from '../components/DisplayTwDS';
import SubmitContentForm from '../components/submitContent'
import MyContent from '../components/myContent'
import Questions from '../components/questions'


const Main = () => {

    const { address } = useAccount();
    const [shortAddress, setShortAddress] = useState('0x00...0000');   

    useEffect(() => {
        if (address) {
          setShortAddress(`${address.slice(0, 4)}...${address.slice(-4)}`);
        }
      }, [address]);


    // Renders the Profile page and all the componenets mounted on that page
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
                <Link className="navbar-brand py-lg-2 mb-lg-5 px-lg-6 me-0" href="https://storage.googleapis.com/pinedao/Pinehome1.html">
                    <img src="/output-onlinepngtools.png" alt="..." style={{height: '39px'}} />
                </Link>
                {/* User menu (mobile) */}
                <div className="navbar-user d-lg-none">
                    {/* Dropdown */}
                    <div className="dropdown">
                    {/* Toggle */}
                        <Link href="#" id="sidebarAvatar" role="button" aria-haspopup="true" aria-expanded="false">
                            <div className="avatar-parent-child">
                                {/* Profile Goes here*/}
                                <Profile/> 
                            <span className="avatar-child avatar-badge bg-success" />
                            </div>
                        </Link>
                    </div>
                </div>
                {/* Collapse */}
                <div className="collapse navbar-collapse" id="sidebarCollapse">
                    {/* Navigation */}

                    {/* if you want items above the line on the nav-bar put them here */}


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
                        <a className="nav-link py-2" href="https://linktr.ee/pineanalytics" target="_blank" rel="noopener noreferrer">
                            <i className="bi bi-code-square" /> Linktree
                        </a>
                    </li>
                    {/* Questions Listed Here */}
                    <li>
                        <span className="nav-link text-xs font-semibold text-uppercase text-muted ls-wide">
                        Questions
                        </span>
                    </li>
                    <Questions />
                    </ul>
                    {/* Push content down */}
                    <div className="mt-auto" />
                    {/* User menu */}
                    <div className="my-4 px-lg-6 position-relative">
                    <div className="dropup w-full">
                        <button className="btn-primary d-flex w-full py-3 ps-3 pe-4 align-items-center shadow shadow-3-hover rounded-3" type="button"  aria-expanded="false" style={{ backgroundColor: '#6ECC6E', color: '#FFFFFF', borderColor: '#6ECC6E' }} >
                        <span className="me-3">
                            {/* Profile Goes Here */}
                            <Profile/> 
                        </span>
                        <span className="flex-fill text-start text-sm font-semibold">
                            {shortAddress}
                        </span>
                        <span>
                            <i className="bi bi-chevron-expand text-white text-opacity-70" />
                        </span>
                        </button>
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
                            Profile 🌲
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
                                <div className="card shadow-4-hover">
                                    <div className="card-body">
                                        <DisplayPineBadges/> 
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl col-sm-6 col-12">
                            <div className="card">
                                <div className="card shadow-4-hover">
                                    <div className="card-body">
                                        <DisplayPineNFT/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl col-sm-6 col-12">
                            <div className="card">
                                <div className="card shadow-4-hover">
                                    <DisplayTwDs />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Row 2 */}



                <div className="d-flex align-items-center mb-5">
                    <div>
                        <h5 className="mb-0">My Content</h5>
                    </div>
                    {/* Submit content button and form */}
                    <div className="ms-auto">
                        <SubmitContentForm />
                    </div>
                    
                </div>

                    <div>
                        <MyContent /> 
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