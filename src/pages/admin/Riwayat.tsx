import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { ParentAdmin, TimeBookingCars } from "../../components/Index";
import { useEffect } from "react";
import { getRiwayat } from "@/app/actions/riwayatSlice";
import { Badge, Box, ButtonGroup, Card, Grid, Heading, HStack, IconButton, Image, Pagination, Stack, Table, Text } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { durationBooking } from "@/utils/currentmillis";
import { extractImageUrl } from "@/utils/extractImageUrl";

const RiwayatPageContent = () => {
    const { dataRiwayat } = useAppSelector((state) => state.riwayat);
    const dispacth = useAppDispatch();

    useEffect(() => {
        dispacth(getRiwayat());
    }, [])

    return (
        <>
            <Grid gap="3" mt="3" templateColumns={{ base: "1fr", md: "1fr 1fr" }}>
                {dataRiwayat.map((data) => (
                    <Card.Root key={data.id} flexDirection={{ base: "column", lg: "row" }} overflow="hidden" width={{ base: "100%" }}  >
                        <Image
                            objectFit="cover"
                            w={{ base: "full", sm: "auto" }}
                            maxW={{ base: "auto", lg: "200px" }}
                            src={`${import.meta.env.VITE_API_URL}images/car/${extractImageUrl(data.url_images)}`}
                            alt={data.name_car}
                        />
                        <Box >
                            <Card.Body>
                                <Box>
                                    <Grid gap="1">
                                        <Text mt="0">
                                            <span>Nama: </span>
                                            {data.name_user}
                                        </Text>
                                        <Text mt="0">
                                            <span>Email: </span>
                                            {data.email}
                                        </Text>
                                        <Text mt="0">
                                            <span>No Hp: </span>
                                            {data.phone_number}
                                        </Text>
                                    </Grid>
                                </Box>

                                <Box height="1px" backgroundColor="gray.300" my="2" />

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

                                <Box height="1px" backgroundColor="gray.300" my="2" />

                                <Box fontWeight="semibold" mt="2">
                                    Durasi Pemakaian: {durationBooking(data.start_time, data.end_time)}
                                </Box>
                            </Card.Body>
                        </Box>
                    </Card.Root>
                ))}
            </Grid>
        </>
    )
}

const Riwayat = () => {
    return (
        <>
            <ParentAdmin Content={RiwayatPageContent} />
        </>
    )
}

export default Riwayat