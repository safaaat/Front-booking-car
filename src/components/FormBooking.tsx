import { Box, Button, Field, Flex, Input } from "@chakra-ui/react";
import styles from "../styles/index.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { IoMdClose } from "../utils/Icon";
import { addDays } from "date-fns";
import { handleFormBooking, postBooking, resetStateApiBooking } from "@/app/actions/bookingSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { dateToUnixTime } from "@/utils/currentmillis";
import { LoadingSpinner, AlertSuccess, AlertBookingConflict } from "./Index";

const defaultValidasi = {
    name_user: false,
    email: false,
    phone_number: false,
    start_time: false,
    end_time: false
};

type CarModelProps = {
    id: number
    image: string
    name: string
    url: string
}

type FormBookingProps = {
    car: CarModelProps
}

const FormBooking = ({ car }: FormBookingProps) => {
    const [inputFormBooking, setInputFormBooking] = useState({
        id_car: "", is_confirmed: false, name_car: "", url_images: "", name_user: "", email: "", phone_number: "", start_time: "", end_time: ""
    })
    const [validasiInput, setValidasiInput] = useState(defaultValidasi);
    const [start_time, setStart_time] = useState<Date | null>(null);
    const [end_time, setEnd_time] = useState<Date | null>(null);
    const { isMessage, isSuccess, isLoading, isError } = useAppSelector((state) => state.bookingCar);
    const dispatch = useAppDispatch();

    const handleStateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setInputFormBooking((state) => ({
            ...state,
            [name]: value,
        }));
    }

    const handleStateValidasi = (payload: Partial<typeof validasiInput>) => {
        setValidasiInput((state) => ({
            ...state, ...payload
        }));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        setValidasiInput(defaultValidasi);
        if (inputFormBooking.name_user.length === 0) handleStateValidasi({ name_user: true });
        if (inputFormBooking.email.length === 0) handleStateValidasi({ email: true });
        if (inputFormBooking.phone_number.length === 0) handleStateValidasi({ phone_number: true });
        if (inputFormBooking.start_time.length === 0) handleStateValidasi({ start_time: true });
        if (inputFormBooking.end_time.length === 0) handleStateValidasi({ end_time: true });

        const dataBooking = {
            id_car: car.id,
            is_confirmed: false,
            name_car: car.name,
            url_images: car.image,
            name_user: inputFormBooking.name_user,
            email: inputFormBooking.email,
            phone_number: inputFormBooking.phone_number.toString(),
            start_time: dateToUnixTime(start_time),
            end_time: dateToUnixTime(end_time)
        }

        dispatch(postBooking(dataBooking))
    }

    const handleCloseFormBooking = () => {
        dispatch(resetStateApiBooking());
        dispatch(handleFormBooking(false));
    }

    return (
        <>
            <Box position="fixed" w="full" height="full" left="0" top="0" zIndex="var(--index-input-car)" bg="blackAlpha.700">
                {isSuccess && <AlertSuccess message={isMessage} onClose={() => handleCloseFormBooking()} />}

                {isError && (
                    <AlertBookingConflict message={isMessage} onClose={() => dispatch(resetStateApiBooking())} />
                )}

                {/* Loading */}
                {isLoading && <LoadingSpinner />}

                <div className={styles["form-booking-wrapper"]}>
                    <form
                        onSubmit={handleSubmit}
                        className={styles["form-booking"]}
                    >
                        <div className={styles["btn-close-wrapper"]}>
                            <button type="button"
                                className={styles["btn-close-form"]}
                                onClick={() => {
                                    dispatch(handleFormBooking(false))
                                }}
                            >
                                <IoMdClose />
                            </button>
                        </div>

                        <Box className={styles["input-warapper"]}>
                            <Field.Root invalid={validasiInput.name_user}>
                                <Field.Label
                                    color={validasiInput.name_user ? "red" : ""}
                                >
                                    Name
                                </Field.Label>
                                <Input
                                    placeholder="Enter your Name"
                                    name="name_user"
                                    value={inputFormBooking.name_user}
                                    onChange={handleStateInput}
                                />
                                <Field.ErrorText>Nama tidak boleh kosong</Field.ErrorText>
                            </Field.Root>
                            <Field.Root invalid={validasiInput.email}>
                                <Field.Label
                                    color={validasiInput.email ? "red" : ""}
                                >
                                    Email
                                </Field.Label>
                                <Input
                                    placeholder="Enter your Email"
                                    name="email"
                                    value={inputFormBooking.email}
                                    onChange={handleStateInput}
                                />
                                <Field.ErrorText>Email tidak boleh kosong</Field.ErrorText>
                            </Field.Root>
                            <Field.Root invalid={validasiInput.phone_number}>
                                <Field.Label
                                    color={validasiInput.phone_number ? "red" : ""}
                                >
                                    Number Phone
                                </Field.Label>
                                <Input
                                    placeholder="Enter your Number Phone"
                                    name="phone_number"
                                    value={inputFormBooking.phone_number}
                                    onChange={handleStateInput}
                                />
                                <Field.ErrorText>Nomor handphone tidak boleh kosong</Field.ErrorText>
                            </Field.Root>

                            <Field.Root>
                                <Field.Label>
                                    Tanggal Mulai Booking
                                </Field.Label>
                                <DatePicker
                                    selected={start_time}
                                    onChange={(date) => setStart_time(date)}
                                    selectsStart
                                    startDate={start_time}
                                    endDate={end_time}
                                    placeholderText="Pilih tanggal mulai"
                                    dateFormat="dd/MM/yyyy"
                                    minDate={addDays(new Date(), 1)}
                                />
                            </Field.Root>

                            <Field.Root>
                                <Field.Label>
                                    Tanggal Selesai Booking
                                </Field.Label>
                                <DatePicker
                                    selected={end_time}
                                    onChange={(date) => setEnd_time(date)}
                                    selectsEnd
                                    startDate={start_time}
                                    endDate={end_time}
                                    minDate={start_time ? addDays(start_time, 1) : undefined}
                                    placeholderText="Pilih tanggal selesai"
                                    dateFormat="dd/MM/yyyy"
                                />
                            </Field.Root>
                        </Box>

                        <Flex >
                            <Button
                                type="submit"
                                w="full"
                                bg="var(--color-gray-medium)"
                                mt="5"
                                _hover={{
                                    bg: "black"
                                }}
                            >
                                Button
                            </Button>
                        </Flex>
                    </form>
                </div>
            </Box>
        </>
    )
}

export default FormBooking