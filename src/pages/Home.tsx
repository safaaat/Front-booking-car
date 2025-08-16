import styles from "../styles/index.module.scss";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect } from "react";
import { getApiCars } from "@/app/actions/handleCarSlice";
import { FormLoginAdmin } from "../components/Index";
import { getBookingCars } from "@/app/actions/bookingSlice";
// import { TabsCarBooking } from "./home/Index";
import { getMe } from "@/app/actions/adminSlice";
import Navbar from "@/feature/navbar/Navbar";
import { gear } from "../assets/img/index";

const FiturUnggulan = [
    {
        title: "praktis",
        desc: "Menunjukkan bahwa proses booking mobil di website ini sangat mudah dan tidak ribet.",
        icon: gear
    }
]

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
                <Navbar />

                <section className={styles["hero"]}>
                    <div className={styles["content-wrapper"]}>
                        <h1>
                            Rasakan Pengalamannya: <br />
                            Booking Mobil Kini, <br />
                            Praktis & Fleksibel
                        </h1>

                        <div className={styles["button-wrapper"]}>
                            <button
                                type="button"
                                className={styles["btn-cara-booking"]}
                            >
                                cara booking mobil
                            </button>
                            <button
                                type="button"
                                className={styles["btn-daftar-mobil"]}
                            >
                                daftar mobil
                            </button>
                        </div>
                    </div>
                </section>

                <section className={styles["Featured Features"]}>
                    <h2>
                        Temukan Mobil Terbaik, <br />
                        Siap Jalan Kapan Saja
                    </h2>

                    <ul>
                        {FiturUnggulan.map((event, index) => (
                            <li key={index}>
                                <img src={event.icon} alt={event.title} width={"67px"} />
                                <div>
                                    <h3>{event.title}</h3>
                                    <p>{event.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* <TabsCarBooking /> */}
            </div>
        </>
    )
}

export default Home