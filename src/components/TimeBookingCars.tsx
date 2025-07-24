import { useEffect, useState } from "react";
import styles from "../styles/index.module.scss";

type TimeBookingCarsProps = {
    startTime: number;
    endTime: number;
}

const formatDuration = (seconds: number) => {
    const years = Math.floor(seconds / (365 * 24 * 60 * 60));
    seconds %= 365 * 24 * 60 * 60;

    const months = Math.floor(seconds / (30 * 24 * 60 * 60)); // asumsi 30 hari/bulan
    seconds %= 30 * 24 * 60 * 60;

    const days = Math.floor(seconds / (24 * 60 * 60));
    seconds %= 24 * 60 * 60;

    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;

    const minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;

    return (
        <>
            <div className={styles["duration-container"]}>
                <h5>Sisa Waktu Pemakaian</h5>
                <div className={styles["years-months-days-wrapper"]}>
                    {years !== 0 && (
                        <div className={styles["years-wrapper"]}>
                            <p>{years}</p>
                            <span>tahun,</span>
                        </div>
                    )}
                    {months !== 0 && (
                        <div className={styles["months-wrapper"]}>
                            <p>{months}</p>
                            <span>bulan,</span>
                        </div>
                    )}
                    {days !== 0 && (
                        <div className={styles["days-wrapper"]}>
                            <p>{days}</p>
                            <span>hari</span>
                        </div>
                    )}
                </div>
                <div className={styles["hours-minutes-seconds-wrapper"]}>
                    <div className={styles["hours-wrapper"]}>
                        {hours > 9 ? (
                            <p>{hours}</p>
                        ) : (
                            <p>0{hours}</p>
                        )}
                    </div>
                    <span>:</span>
                    <div className={styles["minutes-wrapper"]}>
                        {minutes > 9 ? (
                            <p>{minutes}</p>
                        ) : (
                            <p>0{minutes}</p>
                        )}

                    </div>
                    <span>:</span>
                    <div className={styles["seconds-wrapper"]}>
                        {seconds > 9 ? (
                            <p>{seconds}</p>
                        ) : (
                            <p>0{seconds}</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

const TimeBookingCars = ({ startTime, endTime }: TimeBookingCarsProps) => {
    const [remaining, setRemaining] = useState(endTime - Math.floor(Date.now() / 1000));

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Math.floor(Date.now() / 1000);
            const diff = endTime - now;

            if (diff <= 0) {
                clearInterval(interval);
                setRemaining(0);
            } else {
                setRemaining(diff);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [endTime]);

    return (
        <>
            {Date.now() > startTime * 1000 && (
                <div>{formatDuration(remaining)}</div>
            )}
        </>
    )
}

export default TimeBookingCars