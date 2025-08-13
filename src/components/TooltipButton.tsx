import styles from "../styles/index.module.scss";

type TooltipButtonProps = {
    name: string
}

const TooltipButton = ({ name }: TooltipButtonProps) => {
    return (
        <>
            <div className={styles["tooltip"]}>
                <span>{name}</span>
            </div>
        </>
    )
}

export default TooltipButton