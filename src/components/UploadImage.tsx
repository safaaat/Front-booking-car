import { useAppSelector } from "@/app/hooks";
import {
    Button,
    FileUpload,
    Float,
    Text,
    useFileUploadContext,
} from "@chakra-ui/react"
import { useEffect } from "react";
import { LuFileImage, LuX } from "react-icons/lu";

type UploadImageProps = {
    onChange?: (files: File[]) => void
}

const FileUploadList = ({ onChange }: UploadImageProps) => {
    const fileUpload = useFileUploadContext()
    const files = fileUpload.acceptedFiles;

    useEffect(() => {
        if (onChange) {
            onChange(files)
        }
    }, [files])

    if (files.length === 0) return null;

    return (
        <FileUpload.ItemGroup>
            {files.map((file) => (
                <FileUpload.Item
                    h={["160px", "220px"]}
                    w={["160px", "220px"]}
                    p="2"
                    file={file}
                    key={file.name}
                >
                    <FileUpload.ItemPreviewImage />
                    <Float placement="top-end">
                        <FileUpload.ItemDeleteTrigger boxSize="4" layerStyle="fill.solid">
                            <LuX />
                        </FileUpload.ItemDeleteTrigger>
                    </Float>
                </FileUpload.Item>
            ))}

        </FileUpload.ItemGroup>
    )
}

const UploadImage = ({ onChange }: UploadImageProps) => {
    const { isMessage } = useAppSelector((state) => state.handleCar);

    return (
        <>
            <FileUpload.Root accept="image/*">
                <FileUpload.HiddenInput />
                <FileUpload.Trigger asChild>
                    <Button variant="outline" size="sm"
                        color={isMessage === "Image tidak boleh kosong" ? "red" : undefined}
                        borderColor={isMessage === "Image tidak boleh kosong" ? "red" : undefined}
                    >
                        <LuFileImage /> Upload Images
                    </Button>
                </FileUpload.Trigger>
                <FileUploadList onChange={onChange} />
            </FileUpload.Root>

            {isMessage === "Image tidak boleh kosong" && (
                <Text fontSize="sm" color="red.500" mt={1}>
                    {isMessage}
                </Text>
            )}
        </>
    )
}

export default UploadImage