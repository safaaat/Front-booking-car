import type { DataBookingProps } from "@/app/actions/bookingSlice";
import styles from "../../styles/index.module.scss";
import TimeBookingCars from "@/components/TimeBookingCars";
import { durationBooking } from "@/utils/currentmillis";
import { extractImageUrl } from "@/utils/extractImageUrl";
import { Badge, Box, Card, Grid, HStack, Image, Text } from "@chakra-ui/react";

type CardCarsBookingProps = {
    bookingData: DataBookingProps[]
}

const CardCarsBooking = ({ bookingData }: CardCarsBookingProps) => {

    return (
        <>
            <section className={styles["section-global"]}>
                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                    {bookingData.map((data, index) => (
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
                    ))}
                </Grid>
            </section>
        </>
    )
}

export default CardCarsBooking