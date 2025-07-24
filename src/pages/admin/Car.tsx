import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { AlertSuccess, ParentAdmin } from "../../components/Index";
import { Box, Button, Flex, Icon, IconButton, Image, Table } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import { getApiCars, handleEditCar, handleInputCar, removeCars, resetCarState, type dataEditCar } from "@/app/actions/handleCarSlice";
import { useEffect } from "react";
import { FaTrashAlt, FaEdit, RiImageAddFill } from "../../utils/Icon";
import { extractImageUrl } from "@/utils/extractImageUrl";

const CarsPageContent = () => {
    const { dataCar, isLoading, isMessage, dataEditCar } = useAppSelector((state) => state.handleCar);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getApiCars());
    }, [dispatch]);

    const handleRemoveImage = (event: number) => {
        const arrayId = [event]

        if (arrayId.length !== 0) return dispatch(removeCars(arrayId));
    }

    const alertRemoveCars = () => {
        dispatch(resetCarState());
        dispatch(getApiCars());
    }

    const editCar = (value: dataEditCar) => {
        dispatch(handleInputCar(true));
        dispatch(handleEditCar(value));
    }

    return (
        <>
            {isMessage === "remove car success" && (
                <AlertSuccess message={isMessage} onClose={alertRemoveCars} />
            )}

            {isLoading && dataCar.length === 0
                ? (
                    <h1>Loading ...</h1>
                )
                : (
                    <Box position={"relative"}>
                        <Flex justify={"flex-end"} marginY={"2rem"} mt={{ base: "5rem", md: "2rem" }}>
                            <Button
                                type="button"
                                onClick={() => dispatch(handleInputCar(true))}
                                bg="transparent"
                                borderRadius="1rem"
                                fontSize={{ base: ".5rem", sm: ".9rem", lg: "1rem" }}
                                color="black"
                                fontWeight="bold"
                                _hover={{
                                    bg: "blackAlpha.300"
                                }}
                            >
                                <Icon size="lg">
                                    <RiImageAddFill />
                                </Icon>
                                Input Car
                            </Button>
                        </Flex>

                        {/* Table */}
                        <Table.Root size="sm" variant="outline" interactive>
                            <Table.ColumnGroup>
                                <Table.Column width={{ base: "7rem", md: "200px", lg: "300px", xl: "350px" }} />
                                <Table.Column />
                                <Table.Column width={{ base: "1rem", sm: "7rem", md: "10rem" }} />
                            </Table.ColumnGroup>
                            <Table.Header>
                                <Table.Row >
                                    <Table.ColumnHeader >Image</Table.ColumnHeader>
                                    <Table.ColumnHeader borderX="1px solid" borderColor="gray.200">Name Car</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="center">Aksi</Table.ColumnHeader>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {dataCar.map((car) => (
                                    <Table.Row key={car.id} >
                                        <Table.Cell>
                                            <Image
                                                rounded="md"

                                                width={{ base: "full" }}
                                                aspectRatio={4 / 3}
                                                src={`${import.meta.env.VITE_API_URL}images/car/${extractImageUrl(car.image)}`} alt={car.name}
                                            />
                                        </Table.Cell>
                                        <Table.Cell border="1px solid" borderColor="gray.200">{car.name}</Table.Cell>
                                        <Table.Cell textAlign="center" >
                                            <Box
                                                display={{ base: "grid", sm: "inline-flex" }}
                                                gap={{ base: "1", sm: "3" }}
                                            >
                                                {/* <Tooltip
                                                    content="Edit Car"
                                                    openDelay={100}
                                                    closeDelay={0}
                                                    contentProps={{ css: { bg: "blackAlpha.700" } }}
                                                >
                                                    <IconButton aria-label="Remove Car" type="button"
                                                        size={{ base: "xs", sm: "sm", lg: "md" }}
                                                        bg="yellow.500"
                                                        _hover={{
                                                            bg: "yellow.300"
                                                        }}
                                                        onClick={() => editCar(car)}
                                                    >
                                                        <FaEdit />
                                                    </IconButton>
                                                </Tooltip> */}
                                                <Tooltip
                                                    content="Remove Car"
                                                    openDelay={100}
                                                    closeDelay={0}
                                                    contentProps={{ css: { bg: "blackAlpha.700" } }}
                                                >
                                                    <IconButton aria-label="Remove Car" type="button"
                                                        size={{ base: "xs", sm: "sm", lg: "md" }}
                                                        bg="red.600"
                                                        _hover={{
                                                            bg: "red.400"
                                                        }}
                                                        onClick={() => handleRemoveImage(car.id)}
                                                    >
                                                        <FaTrashAlt />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Root >
                    </Box >
                )}
        </>
    )
}

const Car = () => {
    return (
        <>
            <ParentAdmin
                Content={CarsPageContent}
            />
        </>
    )
}

export default Car