import { Alert, Flex } from "@chakra-ui/react";

type AlertProps = {
    message: string,
    onClose?: () => void;
}

const AlertBookingConflict = ({ message, onClose }: AlertProps) => {
    return (
        <>
            <Flex
                position={"absolute"}
                zIndex="var(--index-loading-spinner)"
                w="full"
                mt="3"
                justifyContent={"center"}
                data-state="open"
                onAnimationEnd={() => {
                    setTimeout(() => {
                        onClose?.(); // hanya panggil kalau ada
                    }, 4000); // tambahin 500ms delay kalau mau muncul dulu
                }}
                className="slide-in-out-top"
            >
                <Alert.Root status="error" variant="solid"
                    w={{ base: "90%", md: "50%" }}
                >
                    <Alert.Indicator />
                    <Alert.Title>{message}</Alert.Title>
                </Alert.Root>
            </Flex >
        </>
    )
}

export default AlertBookingConflict