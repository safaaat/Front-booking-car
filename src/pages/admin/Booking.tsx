import { Badge, Box, Button, Card, Flex, Grid, HStack, Icon, Image, Tabs, Text } from "@chakra-ui/react";
import { AlertSuccess, ConfirmasiCarsEmpty, LoadingSpinner, ParentAdmin, TimeBookingCars } from "../../components/Index";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect, useState } from "react";
import { confirmasiBookings, getBookingCars, removeBookings, resetStateApiBooking, type DataBookingProps } from "@/app/actions/bookingSlice";
import { AiFillCar, FaClock } from "../../utils/Icon";
import { extractImageUrl } from "@/utils/extractImageUrl";
import { durationBooking } from "@/utils/currentmillis";

const valueTabs = [
    { value: "menunggu", icon: <FaClock />, name: "Menunggu Confirmasi" },
    { value: "digunakan", icon: <AiFillCar />, name: "Sedang Digunakan" }
]

const BookingPageContent = () => {
    const { dataBookingCars, isLoading, isMessage, isSuccess } = useAppSelector((state) => state.bookingCar);
    const dispatch = useAppDispatch();
    const [dataWaitConfirmasi, setDataWaitConfirmasi] = useState<DataBookingProps[]>([]);
    const [dataConfirmed, setConfirmed] = useState<DataBookingProps[]>([]);

    const handleFilterWaitConfirmasi = (value: DataBookingProps[]) => {
        if (value) {
            const data = value.filter(item => item.is_confirmed === false);
            return setDataWaitConfirmasi(data);
        }
    }

    const handleFilterDataConfirmed = (value: DataBookingProps[]) => {
        if (value) {
            const data = value.filter(item => item.is_confirmed === true);
            return setConfirmed(data);
        }
    }

    useEffect(() => {
        if (Array.isArray(dataBookingCars) && dataBookingCars.length > 0) {
            handleFilterWaitConfirmasi(dataBookingCars);
            handleFilterDataConfirmed(dataBookingCars);
        }
    }, [dataBookingCars])

    useEffect(() => {
        dispatch(getBookingCars());
    }, [dispatch]);

    const toggleConfirmasiBooking = (value: DataBookingProps) => {
        const data = {
            id: value.id,
            id_car: value.id_car
        }

        dispatch(confirmasiBookings(data));
    }

    const handleAlertConfirmasi = () => {
        dispatch(getBookingCars());
        dispatch(resetStateApiBooking());
    }

    return (
        <>
            {isLoading && <LoadingSpinner />}

            {isSuccess && (
                <AlertSuccess message={isMessage} onClose={() => handleAlertConfirmasi()} />
            )}

            <Tabs.Root defaultValue="menunggu" mt={{ base: "4rem" }}>
                <Tabs.List>
                    {valueTabs.map((data, index) => (
                        <Tabs.Trigger key={index} value={data.value}>
                            <Icon size="md" color="blackAlpha.600">
                                {data.icon}
                            </Icon>
                            {data.name}
                        </Tabs.Trigger>
                    ))}
                </Tabs.List>

                {!isLoading && dataBookingCars.length !== 0 && (
                    <>
                        <Tabs.Content value="menunggu">
                            <Flex wrap="wrap" gap="4">
                                {dataWaitConfirmasi.length !== 0 ? (
                                    dataWaitConfirmasi.map((data, index) => (
                                        <Card.Root key={index} flexDirection={{ base: "column", sm: "row" }} overflow="hidden" maxW="xl">
                                            <Image
                                                objectFit="cover"
                                                w={{ base: "full", sm: "auto" }}
                                                maxW={{ base: "auto", sm: "200px" }}
                                                src={`${import.meta.env.VITE_API_URL}images/car/${extractImageUrl(data.url_images)}`}
                                                alt={data.name_car}
                                            />
                                            <Box>
                                                <Card.Body>
                                                    <Card.Title mb="2">{data.name_car}</Card.Title>

                                                    <Box height="1px" backgroundColor="gray.300" my="2" />

                                                    <Text fontWeight="semibold">
                                                        <span>Name Customer: </span>
                                                        {data.name_user}
                                                    </Text>

                                                    <Text>
                                                        <span>Tanggal Mulai: </span>
                                                        {new Date(data.start_time * 1000).toLocaleDateString("id-ID", {
                                                            day: "numeric",
                                                            month: "long",
                                                            year: "numeric",
                                                        })}
                                                    </Text>

                                                    <Text>
                                                        <span>Tanggal Selesai: </span>
                                                        {new Date(data.end_time * 1000).toLocaleDateString("id-ID", {
                                                            day: "numeric",
                                                            month: "long",
                                                            year: "numeric",
                                                        })}
                                                    </Text>
                                                    <Text fontWeight="semibold" mt="2">
                                                        Durasi Pemakaian: {durationBooking(data.start_time, data.end_time)}
                                                    </Text>

                                                    <Box height="1px" backgroundColor="gray.300" my="2" />

                                                    <HStack mt="4">
                                                        <Badge colorPalette="yellow">Menunggu Confirmasi</Badge>
                                                    </HStack>
                                                </Card.Body>
                                                <Flex>
                                                    <Card.Footer>
                                                        <Button
                                                            size="sm"
                                                            colorPalette="red"
                                                            variant="outline"
                                                            onClick={() => dispatch(removeBookings(data.id))}
                                                        >
                                                            Cansel
                                                        </Button>
                                                    </Card.Footer>
                                                    <Card.Footer ml={{ base: "-1rem", md: "auto" }}>
                                                        <Button size="sm" colorPalette="blue"
                                                            variant="outline"
                                                            _hover={{
                                                                bg: "var(--color-primary)",
                                                                color: "white"
                                                            }}
                                                            onClick={() => toggleConfirmasiBooking(data)}
                                                        >
                                                            Confirmasi
                                                        </Button>
                                                    </Card.Footer>
                                                </Flex>
                                            </Box>
                                        </Card.Root>
                                    ))
                                ) : (
                                    <ConfirmasiCarsEmpty
                                        text="tidak ada confirmasi pemesanan mobil yang ditemukan"
                                    />
                                )}

                            </Flex>
                        </Tabs.Content>
                        <Tabs.Content value="digunakan">
                            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                                {dataConfirmed.length !== 0 ? (
                                    dataConfirmed.map((data, index) => (
                                        <Card.Root key={index} flexDirection={{ base: "column", lg: "row" }} overflow="hidden" width={{ base: "100%" }}>
                                            <Image
                                                objectFit="cover"
                                                w={{ base: "full", sm: "auto" }}
                                                maxW={{ base: "auto", lg: "200px" }}
                                                src={`${import.meta.env.VITE_API_URL}images/car/${extractImageUrl(data.url_images)}`}
                                                alt={data.name_car}
                                            />
                                            <Box>
                                                <Card.Body>
                                                    {Date.now() > data.start_time * 1000 ? (
                                                        <HStack mb="2">
                                                            <Badge colorPalette="blue">Sedang Digunakan</Badge>
                                                        </HStack>
                                                    ) : (
                                                        <HStack mb="2">
                                                            <Badge colorPalette="black">Sudah Dibooking</Badge>
                                                        </HStack>
                                                    )}

                                                    <Card.Title mb="2">{data.name_car}</Card.Title>

                                                    <Box height="1px" backgroundColor="gray.300" my="2" />

                                                    <Text mt="1">
                                                        <span>Tanggal Mulai: </span>
                                                        {new Date(data.start_time * 1000).toLocaleDateString("id-ID", {
                                                            day: "numeric",
                                                            month: "long",
                                                            year: "numeric",
                                                        })}
                                                    </Text>

                                                    <Text>
                                                        <span>Tanggal Selesai: </span>
                                                        {new Date(data.end_time * 1000).toLocaleDateString("id-ID", {
                                                            day: "numeric",
                                                            month: "long",
                                                            year: "numeric",
                                                        })}
                                                    </Text>
                                                    <Box fontWeight="semibold" mt="2">
                                                        Durasi Pemakaian: {durationBooking(data.start_time, data.end_time)}
                                                    </Box>

                                                    <Box height="1px" backgroundColor="gray.300" my="2" />

                                                    {/* Masalah */}
                                                    <TimeBookingCars
                                                        startTime={data.start_time}
                                                        endTime={data.end_time}
                                                    />
                                                </Card.Body>
                                            </Box>
                                        </Card.Root>
                                    ))
                                ) : (
                                    <ConfirmasiCarsEmpty
                                        text="tidak ada mobil yang sedang di gunakan"
                                    />
                                )}
                            </Grid>
                        </Tabs.Content>
                    </>
                )}

            </Tabs.Root>
        </>
    )
}

const Booking = () => {
    return (
        <>
            <ParentAdmin Content={BookingPageContent} />
        </>
    )
}

export default Booking