import {
    Box, Field, Input,
    Button,
    Flex,
    Fieldset,
    Image
} from "@chakra-ui/react";
import { IoMdClose } from "../../utils/Icon";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { getApiCars, handleInputCar, postApiCars, resetCarState } from "@/app/actions/handleCarSlice";
import { useState } from "react";
import { UploadImage, LoadingSpinner, AlertSuccess } from "../Index";
import { extractImageUrl } from "@/utils/extractImageUrl";


const InputCarForm = () => {
    const { isLoading, isSuccess, isMessage, dataEditCar } = useAppSelector((state) => state.handleCar);
    const dispatch = useAppDispatch();
    const [carName, setCarName] = useState(dataEditCar?.name ?? "");
    const [file, setFile] = useState<File[]>([]);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newCar = {
            name: carName,
            image1: file[0]
        };

        dispatch(postApiCars(newCar));
    }

    const handleImagesChange = (newFiles: File[]) => {
        setFile(newFiles)
    }

    const handleCloseIsSuccess = () => {
        if (isSuccess) {
            dispatch(resetCarState());
            dispatch(getApiCars());
            dispatch(handleInputCar(false));
        }
    }

    const handleCloseForm = () => {
        dispatch(resetCarState());
        dispatch(handleInputCar(false));
    }

    console.log(carName)

    return (
        <>
            {/* Alert */}
            {isSuccess && <AlertSuccess message={isMessage} onClose={handleCloseIsSuccess} />}

            {/* Loading */}
            {isLoading && <LoadingSpinner />}

            <Box position={"fixed"} w={"full"} h={"full"} bg={"blackAlpha.800"} zIndex={"var(--index-input-car)"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <form onSubmit={handleSubmit} style={{ width: "100%" }} >
                    <Fieldset.Root
                        position={"relative"} m="auto" bg="white" p="3" borderRadius={"1rem"} overflow={"hidden"}
                        h={["450px", "500px"]}
                        w={["90%", "80%", "500px"]}
                    >
                        <Flex justify={"flex-end"}>
                            <Button
                                type="button"
                                onClick={() => handleCloseForm()}
                                w="0"
                                height="2rem"
                                bg="transparent"
                                color="black"
                                _hover={{
                                    bg: "blackAlpha.500", color: "red"
                                }}
                            >
                                <IoMdClose />
                            </Button>
                        </Flex>

                        <Fieldset.Content mt="5">
                            <Field.Root
                                invalid={isMessage === "Nama mobil sudah di gunakan" || isMessage === "Name car harus di isi"}
                            >
                                <Field.Label
                                    color={isMessage === "Nama mobil sudah di gunakan" || isMessage === "Name car harus di isi" ? "red.500" : "gray.700"}
                                >
                                    Nama Mobil
                                </Field.Label>
                                <Input placeholder="Contoh: Toyota Avanza"
                                    value={carName}
                                    onChange={(e) => setCarName(e.target.value)}
                                />
                                <Field.ErrorText >{isMessage}</Field.ErrorText>
                            </Field.Root>

                            <UploadImage onChange={handleImagesChange} />

                            {/* View Image Edit */}
                            {dataEditCar && file.length === 0 && (
                                <Box>
                                    <Image
                                        src={`${import.meta.env.VITE_API_URL}${extractImageUrl(dataEditCar.url)}`}
                                        alt={dataEditCar.name}
                                        aspectRatio={4 / 3}
                                        width="300px"
                                    />
                                </Box>
                            )}
                        </Fieldset.Content>

                        <Flex position={"absolute"} left={"0"} bottom={"0"} w="full" p={"3"}>
                            <Button
                                type="submit"
                                w="full"
                                _hover={{
                                    bg: "blackAlpha.700"
                                }}
                            >
                                Submit
                            </Button>
                        </Flex>
                    </Fieldset.Root>
                </form>
            </Box>
        </>
    )
}

export default InputCarForm