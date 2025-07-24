import { Box, Button, Icon, IconButton, Stack, Text } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import { IoCarSport, FiSidebar, IoCalendarOutline, IoDocumentTextOutline, IoMdClose, FaHome } from "../utils/Icon";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { handleResizeSidebar } from "@/app/actions/sidebarSlice";
import { useNavigate } from "react-router-dom";

type dataSidebarProps = {
    name: string
    icon: React.ElementType
    nav: string
}

const SideBar = () => {
    const { resizeSidebar } = useAppSelector((state) => state.sidebar);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const dataSidebar: dataSidebarProps[] = [
        { name: "Manajemen Mobil", icon: IoCarSport, nav: "/admin/car" },
        { name: "Booking", icon: IoCalendarOutline, nav: "/admin/booking" },
        { name: "Riwayat", icon: IoDocumentTextOutline, nav: "/admin/riwayat" },
    ];

    return (
        <>
            <Box
                w={{
                    base: "var(--size-big-sidebar)",
                    md: !resizeSidebar ? "var(--size-big-sidebar)" : "var(--size-small-sidebar)"
                }}
                transition={"var(--transition-sidebar)"}
            >
                <Box
                    as="aside" bg="var(--sidebar-bg)" color="white" p={2} display="flex" overflow={"hidden"} flexDirection="column" transition={"var(--transition-sidebar)"} h="100vh" position={"fixed"}
                    w={{
                        base: "var(--size-big-sidebar)",
                        md: !resizeSidebar ? "var(--size-big-sidebar)" : "var(--size-small-sidebar)"
                    }}
                >
                    {/* Side Bar */}
                    <Tooltip
                        content={!resizeSidebar ? "Close Sidebar" : "Open Sidebar"} openDelay={100} closeDelay={0}
                        contentProps={{
                            css: {
                                background: "var(--tooltip-background)",
                                zIndex: "var(--index-sidebar)"
                            }
                        }}

                    >
                        <IconButton
                            aria-label="sidebar"
                            alignSelf={!resizeSidebar ? "flex-end" : "center"} cursor={"e-resize"} bg={"transparent"} color="var(--btn-sidebar-resize)" borderRadius={".5rem"}
                            _hover={{ bg: "var(--btn-color-hover-sidebar)", color: "var(--btn-color-sidebar)" }}

                            onClick={() => dispatch(handleResizeSidebar())}
                        >
                            <Icon display={{ base: "none", md: "flex" }}>
                                <FiSidebar />
                            </Icon>
                            <Icon display={{ base: "flex", md: "none" }}>
                                <IoMdClose />
                            </Icon>
                        </IconButton>
                    </Tooltip>

                    <Button
                        bg="transparent" mt="5"
                        color="var(--color-primary)"
                        justifyContent="flex-start"
                        _hover={{
                            color: "white",
                            bg: "var(--color-primary)"
                        }}
                        onClick={() => navigate("/")}
                    >
                        <Icon size="lg" color="inherit">
                            <FaHome />
                        </Icon>
                        {!resizeSidebar && <Text>Back to home</Text>}
                    </Button>

                    {/* Menu Sidebar */}
                    <Stack align="start" mt="4">
                        {dataSidebar.map((item, index) => (
                            <Button key={index} gap={3} bg={"transparent"} w={"full"} color={"var(--btn-color-sidebar)"} justifyContent={"flex-start"}
                                _hover={{ bg: "var(--btn-color-hover-sidebar)", cursor: "pointer" }}
                                onClick={() => navigate(item.nav)}
                            >
                                <Icon size="lg" as={item.icon} />
                                {!resizeSidebar && <Text>{item.name}</Text>}
                            </Button>
                        ))}
                    </Stack>
                </Box>
            </Box>
        </>
    )
}

export default SideBar