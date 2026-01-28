import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef } from 'react';
import { HStack, VStack } from '/src/shared/ui/Stack';
import { classNames } from '/src/shared/lib/classNames/classNames';
import cls from './ReleasePage.module.scss';
import pdf_cls from '../PdfPage.module.scss';
import ToggleLanguage, { T } from '/src/Resume/shared/ui/ToggleLanguage/ToggleLanguage';
import Contacts from './ui/Contacts/Contacts';
import Quote from '/src/Resume/sections/AboutMe/ui/Quote/Quote';
import AboutMe from './ui/AboutMe/AboutMe';
import FerrisSvg from "/src/Resume/shared/assets/imgs/Ferris.svg?react"
import Skills from 'resume/sections/Skills/Skills';
import Block from '/src/Resume/shared/ui/Block/Block';
import block_cls from '/src/Resume/shared/ui/Block/Block.module.scss';
import PetProjects from '/src/Resume/sections/Experience/PetProjects/PetProjects';
import WorkExperience from './ui/WorkExperience/WorkExperience';
import Education from './ui/Education/Education';
import { ot } from './ui/Experience/Experience';
import SkillLine from './ui/SkillLine/SkillLine';
import { Demo } from '/src/Resume';

type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface ReleasePageProps extends ComponentProps<Component>, Demo {

}

const ReleasePage = (props: ReleasePageProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        demo,
        ...otherProps
    } = props;

    const releasePageRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => releasePageRef.current,
    );

    return (
        <VStack
            className={classNames(cls.ReleasePage, [pdf_cls.pdf_page, className])}
            id="release-page"
            ref={releasePageRef}
            {...otherProps}
        >
            <VStack tag="header" className={cls.head}>
                <VStack tag="section">
                    <h1 style={{
                        "margin-bottom": 0,
                        "margin-top": "0.2em",
                    }}>
                        {demo.isDemo() ? <T ru="Имя Фамилия" en="First Last Name" /> : <T ru="Абакар Летифов" en="Abakar Letifov" />}
                    </h1>
                    <HStack
                        tag="span" align="center"
                        style={{
                            display: "inline-flex",
                            "font-size": "1.5em",
                            color: "var(--feature-color)"
                        }}
                    >
                        <FerrisSvg style={{
                            // fill: "white",
                            width: "1.4em",
                        }} aria-hidden />
                        <strong>Rust<T ru="-разработчик" en=" Developer" /></strong>
                    </HStack>
                    <AboutMe />
                    <Quote className={cls.quote} />
                    <ToggleLanguage className={cls.toggleLanguage} aria-hidden />
                </VStack>
                <Contacts demo={demo} className={cls.contacts} />
            </VStack>
            <HStack tag="main">
                <VStack>
                    <Block
                        className={cls.block}
                        head={{
                            tag: "h2",
                            value: <T ru={"Опыт работы".toUpperCase()} en={"Work Experience".toUpperCase()} />
                        }}
                    >
                        <WorkExperience
                            demo={demo}
                            style={{
                                "list-style-type": "none",
                                margin: 0,
                                padding: 0,
                            }}
                            timeLineWithLengthProps={{
                                style: {
                                    "white-space": "wrap",
                                    "display": "flex",
                                    "flex-direction": "column",
                                    "align-items": "end",
                                },
                                timeLineProps: {
                                    lineProps: {
                                        style: {
                                            "width": "4em",
                                        }
                                    },
                                }
                            }}
                        />
                    </Block>
                    <Block
                        className={cls.block}
                        head={{
                            tag: "h2",
                            value: <T ru={"Pet-проекты".toUpperCase()} en={"Pet projects".toUpperCase()} />
                        }}
                    >
                        <PetProjects
                            style={{
                                "padding-left": "1em",
                            }}
                        />
                    </Block>
                </VStack>
                <VStack>
                    <Block
                        className={cls.block}
                        head={{
                            tag: "h2",
                            value: <T ru={"Образование".toUpperCase()} en={"Education".toUpperCase()} />
                        }}
                    >
                        <Education demo={demo} />
                    </Block>
                    <Block
                        className={cls.block}
                        head={{
                            new: <HStack
                                style={{
                                    "gap": "4em",
                                }}
                                justify="between"
                                align="center"
                            >
                                <h2 className={block_cls.head} >
                                    <T ru={"Навыки".toUpperCase()} en={"Skills".toUpperCase()} />
                                </h2>
                                <SkillLine
                                    aria-hidden
                                    style={{
                                        fontSize: "0.6em",
                                        flexWrap: "wrap",
                                        "justify-content": "end",
                                    }}
                                />
                            </HStack>
                        }}
                    >
                        <Skills />
                    </Block>
                    <section className={cls.other}>{ot}</section>
                </VStack>
            </HStack>
        </VStack>
    )
};

export default memo(forwardRef(ReleasePage));