import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef, useMemo, useContext } from 'react';
import { HStack } from '/src/shared/ui/Stack';
import { classNames } from '/src/shared/lib/classNames/classNames';
import cls from './Contacts.module.scss';
import CallStar from "resume/pages/ReleasePage/ui/Contacts/svgs/call.svg?react"
import GitHubStar from "resume/pages/ReleasePage/ui/Contacts/svgs/git-hub.svg?react";
import MailStar from "shared/assets/icons/contacts/mail.svg?react";
import TelegramStar from "shared/assets/icons/contacts/telegram.svg?react";
import { langContext, t, T } from '/src/Resume/shared/ui/ToggleLanguage/ToggleLanguage';
import { Demo } from '/src/Resume';

type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface ContactsProps extends ComponentProps<Component>, Demo {

}

const contacts = [
    {
        link: "tel:+7 (932) 409-91-67",
        svg: <CallStar />,
        text: "+7 (932) 409-91-67",
    },
    {
        link: "mailto:letifovabakar88@gmail.com",
        svg: <MailStar />,
        text: "letifovabakar88@gmail.com",
    },
    {
        link: "https://github.com/10takla",
        svg: <GitHubStar />,
        text: "10takla",
    },
    {
        link: "https://crates.io/users/10takla",
        img: "https://crates.io/_app/immutable/assets/cargo.BEjkIoV4.png",
        text: "crates.io",
    },
    {
        link: "https://t.me/Corvo116",
        svg: <TelegramStar />,
        text: "@Corvo116",
    },
    {
        link: "https://hh.ru/resume/5b9c4b92ff0ec486e40039ed1f476b7855654d?hhtmFrom=resume_list&print=true",
        img: "https://i.hh.ru/images/logos/svg/hh.ru.svg?v=05022025",
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

const contactsDemo = [
    {
        link: "tel:+7 (777) 777-77-77",
        svg: <CallStar />,
        text: "+7 (777) 777-77-77",
    },
    {
        link: "mailto:mail@gmail.com",
        svg: <MailStar />,
        text: "mail@gmail.com",
    },
    {
        link: "https://github.com",
        svg: <GitHubStar />,
        text: "github",
    },
    {
        link: "https://crates.io",
        img: "https://crates.io/_app/immutable/assets/cargo.BEjkIoV4.png",
        text: "crates.io",
    },

    {
        link: "https://t.me",
        svg: <TelegramStar />,
        text: "telegram",
    },
    {
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

    const c = useMemo(() => {
        if (demo) {
            return contactsDemo
        } else {
            return contacts
        }
    }, [demo])

    return (
        <HStack
            className={classNames(cls.Contacts, [className])}
            ref={contactsRef}
            {...otherProps}
        >
            {c.map(({ link, svg, text, img }) => {
                return (
                    <HStack
                        className={cls.contact}
                        align="center"
                        key={link}
                        tag={link && "a"}
                        href={link}
                    >
                        {svg && svg}
                        {img && <img src={img} />}
                        {text}
                    </HStack>
                );
            })}
        </HStack>
    )
};

export default memo(forwardRef(Contacts));