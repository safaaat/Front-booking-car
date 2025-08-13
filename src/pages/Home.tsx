import styles from "../styles/index.module.scss";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect } from "react";
import { getApiCars } from "@/app/actions/handleCarSlice";
import { FormLoginAdmin } from "../components/Index";
import { getBookingCars } from "@/app/actions/bookingSlice";
// import { TabsCarBooking } from "./home/Index";
import { getMe } from "@/app/actions/adminSlice";
import Navbar from "@/feature/navbar/Navbar";

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

                <div className={styles["hero"]}>
                    <Navbar />

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
                </div>

                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil hic error illo tempora ad, dignissimos facilis dolorem at sint nulla, reprehenderit laborum nisi laudantium necessitatibus asperiores ea debitis ullam. Molestias nisi adipisci itaque sequi cum, tempore minima suscipit ab dolore, est fuga rerum voluptates tenetur voluptatum tempora deserunt quae molestiae numquam praesentium unde. Itaque, eum aperiam repellat natus nesciunt corporis numquam consectetur. Odit in voluptas, dolorum facilis iste modi maxime nemo adipisci, quaerat sapiente, rerum nostrum soluta dignissimos ea blanditiis delectus? Vero, cum sit dolores quidem in sint ipsa deleniti tempore est sunt similique animi adipisci provident et vel voluptatum?</p>

                {/* <TabsCarBooking /> */}
            </div>
        </>
    )
}

export default Home