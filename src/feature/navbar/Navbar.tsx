import styles from "../../styles/index.module.scss";
import Logo from "../../assets/Logo.svg";
import { User, SidebarResize, Home, DaftarCar, MethodBooking } from "../../assets/Icon_SVG/index";
import { Link } from "react-router-dom";
import { TooltipButton } from "../../components/Index";
import { useState } from "react";
import Darkmode from "../darkmode/Darkmode";

const listNav = [
    {
        name: "home",
        icon: Home
    },
    {
        name: "daftar mobil",
        icon: DaftarCar
    },
    {
        name: "cara booking",
        icon: MethodBooking
    },
];

const Navbar = () => {
    const [navbar, setNavbar] = useState(false);
    const [animasiEnd, setAnimasiEnd] = useState(false);

    return (
        <>
            <header className={styles["navbar-container"]}>
                <nav className={styles["navbar-wrapper"]}>
                    <div className={styles["navbar"]}>
                        <div className={styles["icon-wrapper"]}>
                            <button
                                type="button"
                                className={styles["icon-navbar-resize"]}
                                onClick={() => {
                                    setNavbar(true)
                                    document.body.style.overflow = "hidden"
                                }}
                            >
                                <SidebarResize />
                                <TooltipButton name="Open Navbar" />
                            </button>
                            {/* Logo */}
                            <Link to={"/"}>
                                <img src={Logo} alt="Logo" width="100px" className={styles["img-logo"]} />
                            </Link>
                        </div>

                        {/* Navigation Link */}
                        <ul className={styles["link-nav-wrapper"]}>
                            {listNav.map((data, index) => (
                                <li key={index}>
                                    <Link to={"/"}>
                                        {data.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Action Button */}
                        <div className={styles["btn-action-wrapper"]}>
                            <button
                                type="button"
                                aria-label="login user"
                            >
                                <User className={styles["icon"]} />
                                <TooltipButton name="Login" />
                            </button>

                            <Darkmode />
                        </div>
                    </div>

                    {/* Navbar Mobile */}
                    {navbar && (
                        <div
                            className={`
                                ${styles["navbar-mobile"]}
                                ${animasiEnd && styles["close-Navbar-mobile"]}
                            `}
                            onAnimationEnd={() => {
                                if (animasiEnd) {
                                    setAnimasiEnd(false);
                                    setNavbar(false);
                                    document.body.style.overflow = "auto"
                                }
                            }}
                        >
                            <div className={styles["icon-wrapper"]}>
                                <button
                                    type="button"
                                    className={styles["icon-navbar-resize"]}
                                    onClick={() => {
                                        setAnimasiEnd(true)
                                    }}
                                >
                                    <SidebarResize />
                                    <TooltipButton name="Close Navbar" />
                                </button>
                                {/* Logo */}
                                <Link to={"/"}>
                                    <img src={Logo} alt="Logo" width="100px" className={styles["img-logo"]} />
                                </Link>
                            </div>

                            {/* Navigation Link */}
                            <ul className={styles["link-nav-wrapper"]}>
                                {listNav.map((data, index) => (
                                    <li key={index}>
                                        <Link to={"/"}>
                                            <data.icon className={styles["icon"]} />
                                            {data.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </nav>
            </header>
        </>
    )
}

export default Navbar