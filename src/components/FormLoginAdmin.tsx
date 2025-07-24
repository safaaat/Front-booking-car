import { Box, Button, Field, Flex, Icon, IconButton, Input } from "@chakra-ui/react";
import { BiUserCircle, IoMdClose } from "../utils/Icon";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { postLogin, resetStateAdmin, toggleLoginForm } from "@/app/actions/adminSlice";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "./Index";

const defaultValidasi = {
    password: false
}

const FormLoginAdmin = () => {
    const [password, setPassword] = useState<string>("");
    const [validasi, setValidasi] = useState(defaultValidasi);
    const { isLoading, isMessage } = useAppSelector((state) => state.admin);
    const dispatch = useAppDispatch();

    const handleValidasi = (event: Partial<typeof validasi>) => {
        setValidasi((state) => ({
            ...state, ...event
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setValidasi(defaultValidasi)
        if (password.length === 0) return handleValidasi({ password: true });

        const isValid = Object.values(validasi).every((val) => val === false);
        if (isValid) {
            const data = {
                password
            }
            dispatch(postLogin(data));
        }
    }

    const handleCloseFormLogin = () => {
        dispatch(resetStateAdmin());
        dispatch(toggleLoginForm(false));
    }

    useEffect(() => {
        if (isMessage === "Login Success") return handleCloseFormLogin();
    }, [isMessage])

    return (
        <>
            {/* Loading */}
            {isLoading && <LoadingSpinner />}

            <Box
                position="fixed" right="0" top="0" zIndex="var(--index-input-car)"
                width="full" height="full" bg="blackAlpha.800"
            >
                <Flex w="full" h="full" justify="center" align="center">
                    <Box
                        w={{ base: "90%", sm: "25rem" }} h="auto" bg="white" borderRadius=".5rem"
                        p="4" position="relative"
                    >
                        <form onSubmit={handleSubmit}>

                            <IconButton type="button" aria-label="Close Form"
                                position="absolute" right="1rem" top="1rem"
                                bg="blackAlpha.300" color="black"
                                _hover={{
                                    bg: "blackAlpha.800",
                                    color: "white"
                                }}
                                onClick={() => dispatch(toggleLoginForm(false))}
                            >
                                <IoMdClose />
                            </IconButton>

                            <Flex justify="center" align="center" mb="7" mt="10">
                                <Icon fontSize="6rem" color="var(--color-primary)">
                                    <BiUserCircle />
                                </Icon>
                            </Flex>

                            <Field.Root invalid={validasi.password}>
                                <Field.Label color={validasi.password ? "red" : "black"}>Password</Field.Label>
                                <Input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Field.ErrorText>Password harus di isi</Field.ErrorText>
                            </Field.Root>

                            <Flex mt="7" w="full">
                                <Button
                                    type="submit"
                                    w="full" bg="blackAlpha.800" color="white"
                                    _hover={{
                                        bg: "var(--color-primary)"
                                    }}
                                >
                                    Button
                                </Button>
                            </Flex>
                        </form>
                    </Box>
                </Flex>
            </Box >
        </>
    )
}

export default FormLoginAdmin