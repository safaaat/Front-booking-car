import styles from "../../styles/index.module.scss";
import { Languages } from "../../assets/Icon_SVG/index";
import TooltipButton from "@/components/TooltipButton";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";

type LangType = "en" | "id";

const language: { name: string; type: LangType }[] = [
    {
        name: "english",
        type: "en"
    },
    {
        name: "indonesia",
        type: "id"
    },
]

const Language = () => {
    const [active, setActive] = useState(false);
    const { i18n } = useTranslation();
    const langRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation("home");

    const changeLang = (lang: "en" | "id") => {
        i18n.changeLanguage(lang);
    };

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (langRef.current && langRef.current.contains(target)) {
                setActive(false)
            }
        };

        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <>
            <div className={styles["language-wrapper"]}>
                <button
                    type="button"
                    onClick={() => {
                        setActive(true)
                    }}
                >
                    <Languages width={"20px"} className={styles["icon"]} />
                    <TooltipButton name={t(`tooltip.language`)} />
                </button>

                {active && (
                    <div ref={langRef} className={styles["overlay"]}>
                        <div className={styles["button-wrapper"]}>
                            {language.map((event) => (
                                <button
                                    key={event.type}
                                    className={i18n.language === event.type ? styles["active"] : ""}
                                    onClick={() => {
                                        changeLang(event.type)
                                        setActive(false)
                                    }}
                                >
                                    {event.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Language