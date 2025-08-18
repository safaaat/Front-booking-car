import styles from "../styles/index.module.scss";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect } from "react";
import { getApiCars } from "@/app/actions/handleCarSlice";
import { FormLoginAdmin } from "../components/Index";
import { getBookingCars } from "@/app/actions/bookingSlice";
// import { TabsCarBooking } from "./home/Index";
import { getMe } from "@/app/actions/adminSlice";
import Navbar from "@/feature/navbar/Navbar";
import { Gear, Book, Cepat, Eye, Fleksible } from "../assets/img/index";

const FiturUnggulan = [
    {
        title: "praktis",
        desc: "Menunjukkan bahwa proses booking mobil di website ini sangat mudah dan tidak ribet.",
        icon: Gear
    },
    {
        title: "cepat",
        desc: "Proses pencarian dan booking mobil bisa dilakukan dalam hitungan detik.",
        icon: Cepat
    },
    {
        title: "transparan",
        desc: "Informasi mobil dan status booking ditampilkan secara jujur & real-time.",
        icon: Eye
    },
    {
        title: "fleksibel",
        desc: "Pengguna bisa booking kapan saja, sesuai kebutuhan mereka.",
        icon: Fleksible
    },
    {
        title: "lengkap",
        desc: "Katalog mobil tersedia dengan informasi yang jelas dan gambar yang menarik.",
        icon: Book
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

                <section className={styles["hero-section"]}>
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

                <section className={styles["featured-features-section"]}>
                    <div className={styles["featured-features"]}>
                        <div className={styles["img-car"]}></div>

                        <div className={styles["content-featured"]}>
                            <h2>
                                Temukan Mobil Terbaik, <br />
                                Siap Jalan Kapan Saja
                            </h2>

                            <ul>
                                {FiturUnggulan.map((event, index) => (
                                    <li key={index}>
                                        <img src={event.icon} alt={event.title} width={"67px"} />
                                        <div className={styles["content-fitur-unggulan"]}>
                                            <h3>{event.title}</h3>
                                            <p>{event.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* <TabsCarBooking /> */}
            </div>
        </>
    )
}

export default Home