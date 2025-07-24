import { Tabs } from "@chakra-ui/react"
import { AiFillCar, BiLock } from "../../utils/Icon";
import { useEffect, useState } from "react";
import { CardCars } from "./Index";
import type { dataCar } from "@/app/actions/handleCarSlice";
import { useAppSelector } from "@/app/hooks";
import type { DataBookingProps } from "@/app/actions/bookingSlice";
import CardCarsBooking from "./CardCarsBooking";

const TabsCarBooking = () => {
    const [activeTab, setActiveTab] = useState("car");
    const { dataCar } = useAppSelector((state) => state.handleCar);
    const { dataBookingCars } = useAppSelector((state) => state.bookingCar);
    const [unbookedCars, setUnbookedCars] = useState<dataCar[]>([]);
    const [bookingData, setBookingData] = useState<DataBookingProps[]>([]);


    const filterCars = () => {
        const filterBooking = dataBookingCars.filter((data) => data.is_confirmed === true);
        setBookingData(filterBooking);

        // Ambil semua id_car dari data booking yang sudah dikonfirmasi
        const bookedCarIds = filterBooking.map((booking) => booking.id_car);

        // Filter dataCar, buang mobil yang id-nya ada di daftar bookedCarIds
        const filterCarsByBooking = dataCar.filter(
            (car) => !bookedCarIds.includes(car.id)
        );

        setUnbookedCars(filterCarsByBooking);
    }

    useEffect(() => {
        filterCars()
    }, [dataCar, dataBookingCars])

    return (
        <>
            <Tabs.Root value={activeTab} onValueChange={(e) => setActiveTab(e.value)}>
                <Tabs.List bg="bg.muted"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "1rem",
                    }}
                >
                    <Tabs.Trigger
                        value="car">
                        <AiFillCar />
                        Mobil yang belom dibooking
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        value="car-booking"
                    >
                        <BiLock />
                        Mobil yang sudah dibooking
                    </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="car" mt="3">
                    <CardCars dataCars={unbookedCars} />
                </Tabs.Content>
                <Tabs.Content value="car-booking" mt="3">
                    <CardCarsBooking bookingData={bookingData} />
                </Tabs.Content>
            </Tabs.Root>
        </>
    )
}

export default TabsCarBooking