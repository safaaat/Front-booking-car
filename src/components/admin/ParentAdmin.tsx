import { Box, Button, Icon, Stack } from "@chakra-ui/react"
import { InputCarForm, SideBar } from "../Index";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { HiMenu } from "../../utils/Icon";
import { handleResizeSidebar } from "@/app/actions/sidebarSlice";

type ParentAdminProps = {
    Content: React.ComponentType
}

const ParentAdmin = ({ Content }: ParentAdminProps) => {
    const { resizeSidebar } = useAppSelector((state) => state.sidebar);
    const { handleInputCar } = useAppSelector((state) => state.handleCar);
    const dispatch = useAppDispatch();

    return (
        <>
            {handleInputCar && <InputCarForm />}

            <Box w={"full"} display={"flex"} position={"relative"}>
                <Box
                    position="fixed" zIndex="1" bg="white" py="1"
                    w="full" boxShadow="md"
                    display={{ base: "inherit", md: "none" }}
                >
                    <Button type="button"
                        p="0" w="0" mx="4" bg="transparent"
                        onClick={() => dispatch(handleResizeSidebar())}
                    >
                        <Icon size="xl" color="black">
                            <HiMenu />
                        </Icon>
                    </Button>
                </Box>

                {/* Sidebar <HP */}
                {!resizeSidebar && (
                    <Box
                        position={{ base: "fixed", md: "relative" }}
                        zIndex={"var(--index-sidebar)"}
                        bg="blackAlpha.200"
                        w={{ base: "100rem", md: "auto" }}
                        h={{ base: "100rem", md: "auto" }}
                        display={{ base: "inherit", md: "none" }}
                        top="0"
                        left="0"
                    >
                        <SideBar />
                    </Box>
                )}


                {/* Sidebar > HP */}
                <Box
                    position={{ base: "fixed", md: "relative" }}
                    zIndex={"var(--index-sidebar)"}
                    bg="blackAlpha.200"
                    w={{ base: "100rem", md: "auto" }}
                    h={{ base: "100rem", md: "auto" }}
                    display={{ base: "none", md: "inherit" }}
                    top="0"
                    left="0"
                >
                    <SideBar />
                </Box>

                <Stack w={"full"} right={"0"} transition={"var(--transition-sidebar)"} px={"5"}>
                    <Content />
                </Stack>
            </Box>
        </>
    )
}

export default ParentAdmin