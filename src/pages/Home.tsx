import styles from "../styles/index.module.scss";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect } from "react";
import { getApiCars } from "@/app/actions/handleCarSlice";
import { FormLoginAdmin, NavLogin } from "../components/Index";
import { getBookingCars } from "@/app/actions/bookingSlice";
// import { TabsCarBooking } from "./home/Index";
import { getMe } from "@/app/actions/adminSlice";

const Home = () => {
    const { formAdmin } = useAppSelector((state) => state.admin);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getMe())
        dispatch(getApiCars())
        dispatch(getBookingCars())
    }, [])

    return (
        <>
            {/* Form Admin */}
            {formAdmin && <FormLoginAdmin />}

            <div className={styles["home-container"]}>
                <NavLogin />

                <div className={styles["hero"]}>
                    <div className={styles["content-wrapper"]}>
                        <h1>
                            Permudah Proses Booking Mobil Anda.
                        </h1>
                        <h3>Untuk kebutuhan operasional yang lebih efisien dan terorganisir.</h3>
                    </div>
                </div>

                {/* <TabsCarBooking /> */}
            </div>
        </>
    )
}

export default Home