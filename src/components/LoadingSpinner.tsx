import { Flex, HStack, Spinner } from "@chakra-ui/react"

const LoadingSpinner = () => {
    return (
        <>
            <Flex
                position="fixed"
                left="0"
                right="0"
                zIndex="var(--index-loading-spinner)"
                bgColor={"blackAlpha.500"}
                color="var(--color-primary)"
                height="full"
                w="full"
                justifyContent="center"
            >
                <HStack gap="5">
                    <Spinner size="xl" />
                </HStack>
            </Flex>
        </>
    )
}

export default LoadingSpinner