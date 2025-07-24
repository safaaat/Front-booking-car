import { Card, Flex, Image } from "@chakra-ui/react";
import styles from "../../styles/index.module.scss";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { extractImageUrl } from "@/utils/extractImageUrl";
import { handleFormBooking } from "@/app/actions/bookingSlice";
import FormBooking from "@/components/FormBooking";
import { useState } from "react";
import type { dataCar } from "@/app/actions/handleCarSlice";
import ConfirmasiCarsEmpty from "@/components/ConfirmasiCarsEmpty";

interface CardCarsProps {
    dataCars: dataCar[]
}

const CardCars = ({ dataCars }: CardCarsProps) => {
    const { dataCar } = useAppSelector((state) => state.handleCar);
    const { formBooking } = useAppSelector((state) => state.bookingCar);
    const dispatch = useAppDispatch();
    const [selectBooking, setSelectBooking] = useState<any>(null);

    return (
        <>
            {/* Form Booking */}
            {formBooking && <FormBooking car={selectBooking} />}

            <section className={styles["section-global"]}>
                {/* Jika memiliki car, dan semua sudah di booking tampilkan ini */}
                {dataCars.length === 0 && dataCar.length === 0 && (
                    <Flex justify="center" w="full">
                        <ConfirmasiCarsEmpty text="tidak memiliki car" />
                    </Flex>
                )}
                {/* Jika tidak memiliki car, tampilkan ini */}
                {dataCars.length === 0 && dataCar.length !== 0 && (
                    <Flex justify="center" w="full">
                        <ConfirmasiCarsEmpty text="semua mobil sudah di booking" />
                    </Flex>
                )}

                <div className={styles["card-wrapper"]}>
                    {dataCars.length !== 0 && (
                        dataCars.map((car) => (
                            <Card.Root key={car.id} maxW="sm" overflow="hidden">
                                <Image
                                    height={{ base: "130px", sm: "200px" }}
                                    src={`${import.meta.env.VITE_API_URL}images/car/${extractImageUrl(car.image)}`}
                                    alt={car.name}
                                />
                                <Card.Body p="3">
                                    <h5 className={styles["car-name"]}>{car.name}</h5>
                                </Card.Body>
                                <Card.Footer
                                    p="3"
                                >
                                    <button
                                        type="button"
                                        className={styles["button-booking"]}
                                        onClick={() => {
                                            dispatch(handleFormBooking(true))
                                            setSelectBooking(car)
                                        }}
                                    >
                                        Booking now
                                    </button>
                                </Card.Footer>
                            </Card.Root>
                        ))
                    )}

                </div>
            </section>
        </>
    )
}

export default CardCars