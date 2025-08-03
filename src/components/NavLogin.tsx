import { useAppDispatch, useAppSelector } from "@/app/hooks";
import styles from "../styles/index.module.scss";
import { BiUserCircle } from "../utils/Icon";
import { logout, toggleLoginForm } from "@/app/actions/adminSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

const NavLogin = () => {
    const { dataAdmin } = useAppSelector((state) => state.admin);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
        <>
            <div className={styles["container-nav-login"]}>
                {dataAdmin ? (
                    <div className={styles["admin-menu"]}>
                        <span className={styles["icon"]}><BiUserCircle /></span>
                        <button
                            type="button"
                            className={styles["button-login"]}
                            onClick={() => navigate("/admin/car")}
                        >
                            Dashboard
                        </button>
                        <button
                            type="button"
                            className={styles["button-logout"]}
                            onClick={() => dispatch(logout())}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <Button type="button"
                        bg="var(--color-gray-medium)" borderRadius="lg"
                        _hover={{
                            bg: "var(--color-primary)"
                        }}
                        onClick={() => dispatch(toggleLoginForm(true))}
                    >
                        Login
                    </Button>
                )}
            </div>
        </>
    )
}

export default NavLogin