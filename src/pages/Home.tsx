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
import { useTranslation } from "react-i18next";

const FiturUnggulan = [
    {
        key: "array1",
        icon: Gear
    },
    {
        key: "array2",
        icon: Cepat
    },
    {
        key: "array3",
        icon: Eye
    },
    {
        key: "array4",
        icon: Fleksible
    },
    {
        key: "array5",
        icon: Book
    }
]

const Home = () => {
    const { t } = useTranslation("home");
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
                    <div className={styles["hero"]}>
                        <div className={styles["content-wrapper"]}>
                            <h1>
                                {t("section-hero.h1.line1")} <br />
                                {t("section-hero.h1.line2")} <br />
                                {t("section-hero.h1.line3")}
                            </h1>

                            <div className={styles["button-wrapper"]}>
                                <button
                                    type="button"
                                    className={styles["btn-cara-booking"]}
                                >
                                    {t("section-hero.button.btn1")}
                                </button>
                                <button
                                    type="button"
                                    className={styles["btn-daftar-mobil"]}
                                >
                                    {t("section-hero.button.btn2")}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles["featured-features-section"]}>
                    <div className={styles["featured-features"]}>
                        <div className={styles["img-car"]}></div>

                        <div className={styles["content-featured"]}>
                            <h2>
                                {t("section-featured-features.h2.line1")} <br />
                                {t("section-featured-features.h2.line2")}
                            </h2>

                            <ul>
                                {FiturUnggulan.map((event, index) => (
                                    <li key={index}>
                                        <img src={event.icon} width={"67px"} />
                                        <div className={styles["content-fitur-unggulan"]}>
                                            <h3>{t(`section-featured-features.list.${event.key}.title`)}</h3>
                                            <p>{t(`section-featured-features.list.${event.key}.desc`)}</p>
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