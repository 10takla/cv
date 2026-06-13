import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef, useMemo, useContext } from 'react';
import { HStack } from '/src/shared/ui/Stack';
import { classNames } from '/src/shared/lib/classNames/classNames';
import cls from './Contacts.module.scss';
import CallSvg from "resume/sections/AboutMe/ui/Contacts/svgs/call.svg?react";
import GitHubSvg from "resume/sections/AboutMe/ui/Contacts/svgs/git-hub.svg?react";
import MailStar from "resume/sections/AboutMe/ui/Contacts/svgs/mail.svg?react";
import TelegramSvg from "resume/sections/AboutMe/ui/Contacts/svgs/telegram.svg?react";
import WhatsAppSvg from "resume/sections/AboutMe/ui/Contacts/svgs/whatsapp.svg?react";
import CratesIo from "resume/sections/AboutMe/ui/Contacts/svgs/crates.io.avif";
import HHRuSvg from "resume/sections/AboutMe/ui/Contacts/svgs/hh.svg?react";
import { langContext, t, T } from '/src/Resume/shared/ui/ToggleLanguage/ToggleLanguage';
import { Demo, DemoMode } from '/src/Resume';

type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface ContactsProps extends ComponentProps<Component>, Demo {

}

const Contacts = (props: ContactsProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        demo,
        ...otherProps
    } = props;

    const contactsRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => contactsRef.current,
    );

    const contacts = useMemo(() => (demo.isDemo() ?
        demo.isHide() ?
            contactsDemo.filter(contact => contact.id !== "hhru")
            : contactsDemo
        : contactsList
    ), [demo])

    return (
        <HStack
            className={classNames(cls.Contacts, [className])}
            ref={contactsRef}
            tag="address"
            {...otherProps}
        >
            {contacts.map(({ link, svg, text, img, id }) => (
                <HStack
                    className={classNames(cls.contact, { [cls.preferably]: id === "telegram", ["preferably"]: id === "telegram" })}
                    align="center"
                    key={link}
                    tag={link && "a"}
                    href={link}
                >
                    {svg && svg}
                    {img && <img src={img} aria-hidden />}
                    {text}
                </HStack>
            ))}
        </HStack>
    )
};

export default memo(forwardRef(Contacts));

export const contactsList = [
    {
        link: "https://wa.me/79324099167",
        svg: <WhatsAppSvg />,
        text: "+7 (932) 409-91-67",
    },
    {
        link: "mailto:letifovabakar50@gmail.com",
        svg: <MailStar />,
        text: "letifovabakar50@gmail.com",
    },
    {
        id: "telegram",
        link: "https://t.me/co_932",
        svg: <TelegramSvg />,
        text: "@co_932",
    },
    {
        link: "https://github.com/10takla",
        svg: <GitHubSvg />,
        text: "10takla",
    },
    {
        link: "https://crates.io/users/10takla",
        img: CratesIo,
        text: "crates.io",
    },
    {
        link: "https://hh.ru/resume/5b9c4b92ff0ec486e40039ed1f476b7855654d?hhtmFrom=resume_list&print=true",
        svg: <HHRuSvg />,
        text: "hh.ru",
    },
    {
        get link() {
            return t({
                ru: "https://www.linkedin.com/in/абакар-летифов-582322362?locale=ru_RU",
                en: "https://www.linkedin.com/in/абакар-летифов-582322362?locale=en_US"
            })
        },
        img: "https://static.licdn.com/scds/common/u/images/logos/favicons/v1/favicon.ico",
        text: "LinkedIn",
    },
];

export const contactsDemo = [
    {
        link: "https://wa.me/<WhatsApp>",
        svg: <WhatsAppSvg />,
        text: "<WhatsApp>",
    },
    {
        link: "mailto:mail@gmail.com",
        svg: <MailStar />,
        text: "<mail@gmail.com>",
    },
    {
        id: "telegram",
        link: "https://t.me",
        svg: <TelegramSvg />,
        text: "<Telegram>",
    },
    {
        link: "https://github.com",
        svg: <GitHubSvg />,
        text: "github",
    },
    {
        link: "https://crates.io",
        img: "https://crates.io/_app/immutable/assets/cargo.BEjkIoV4.png",
        text: "crates.io",
    },
    {
        id: "hhru",
        link: "https://spb.hh.ru/?hhtmFrom=main",
        img: "https://i.hh.ru/images/logos/svg/hh.ru.svg?v=05022025",
        text: "hh.ru",
    },
    {
        link: "https://www.linkedin.com/",
        img: "https://static.licdn.com/scds/common/u/images/logos/favicons/v1/favicon.ico",
        text: "LinkedIn",
    },
];