import styles from "../styles/index.module.scss";

type ConfirmasiCarsEmpty = {
    text: string
}

const ConfirmasiCarsEmpty = ({ text }: ConfirmasiCarsEmpty) => {
    return (
        <>
            <div className={styles["confirmasi-cars-empty-container"]}>
                <div className={styles["confirmasi-cars-wrapper"]}>
                    <img src={"/image_car/confirmasi-booking-empty.png"} width="400px" alt="book cars" />
                    <div className={styles["contain-image"]}>
                        <h5>Sorry</h5>
                        <p>{text}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConfirmasiCarsEmpty