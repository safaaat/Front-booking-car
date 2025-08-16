import TooltipButton from "@/components/TooltipButton";
import { Sun, Darkmode } from "../../assets/Icon_SVG/index";
import styles from "../../styles/index.module.scss";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { handleDarkmode } from "@/app/actions/sidebarSlice";

const darkmode = () => {
    const { darkmode } = useAppSelector(state => state.sidebar);
    const dispatch = useAppDispatch();

    return (
        <>
            <div className={styles["button-darkmode-wrapper"]}>
                {!darkmode ? (
                    <button
                        type="button"
                        aria-label="dark mode"
                        onClick={() => dispatch(handleDarkmode())}
                    >
                        <Sun className={styles["icon"]} />
                        <TooltipButton name="Dark mode" />
                    </button>
                ) : (
                    <button
                        type="button"
                        aria-label="light mode"
                        onClick={() => dispatch(handleDarkmode())}
                    >
                        <Darkmode className={styles["icon"]} />
                        <TooltipButton name="Light mode" />
                    </button>
                )}
            </div>
        </>
    )
}

export default darkmode