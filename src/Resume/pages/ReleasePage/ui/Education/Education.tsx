import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef, useContext, useState, useMemo, ReactNode } from 'react';
import { HStack, VStack } from '/src/shared/ui/Stack';
import { classNames } from '/src/shared/lib/classNames/classNames';
import cls from './Education.module.scss';
import TimeLine from '/src/Resume/shared/ui/TimeLine/TimeLine';
import { langContext, t, T } from '/src/Resume/shared/ui/ToggleLanguage/ToggleLanguage';
import { Demo, DemoMode } from '/src/Resume';
import RedDiploma from '/src/Resume/shared/assets/imgs/red_diploma_cover.svg?react'
import { fontWeight } from 'html2canvas/dist/types/css/property-descriptors/font-weight';

type Component = "ul";
type ElRef = ElementRef<Component> | null;

interface EducationProps extends ComponentProps<Component>, Demo {

}

interface Speciality {
    name: ReactNode,
    number: `${number}.${number}.${number}`
}

const specialities: Record<string, Speciality> = {
    PI: {
        name: <T
            ru="Программная инженерия"
            en="Software engineering"
        />,
        number: "09.03.04"
    }
}

const univercities = {
    DGTU: {
        name: <T ru="Дагестанский государственный технический университет" en="Dagestan State Technical University" />,
        link: "https://dstu.ru/",
        city: <T ru="г. Махачкала" en="Makhachkala" />,
        specialities: Object.entries(specialities)
            .filter(([key]) => ["PI"].includes(key))
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}) as Record<string, Speciality>,
        departments: {
            POVTIAS: {
                name: <T
                    ru="Факультет компьютерных технологий, вычислительной техники и энергетики"
                    en="Faculty of Computer Technologies, Computer Engineering and Power Engineering"
                />,
                link: "https://dstu.ru/sveden/fakultet-kompjuternykh-tekhnologii-vychislitelnoi"
            }
        }
    }
}

type Univercity = typeof univercities[keyof typeof univercities];

export const educs = [
    {
        univercity: univercities.DGTU,
        degrees: [
            {
                is_red: true,
                degree: <T
                    ru="Магистр"
                    en="Master"
                />,
                time: {
                    start: new Date("01 September 2023 14:48 UTC"),
                    end: new Date("01 June 2025 14:48 UTC"),
                }
            },
            {
                degree: <T
                    ru="Бакалавр"
                    en="Bachelor"
                />,
                time: {
                    start: new Date("01 September 2019 14:48 UTC"),
                    end: new Date("06 June 2023 14:48 UTC")
                }
            }
        ],
        department: univercities.DGTU.departments.POVTIAS,
        speciality: univercities.DGTU.specialities.PI,
    },
];


const devoUnivercities: Record<string, Univercity> = {
    DGTU: {
        name: <T ru="Университет" en="University" />,
        link: "https://university",
        specialities: Object.entries(specialities)
            .filter(([key]) => ["PI"].includes(key))
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
        departments: {
            POVTIAS: {
                name: <T
                    ru="Факультет компьютерных технологий, вычислительной техники и энергетики"
                    en="Faculty of Computer Technologies, Computer Engineering and Power Engineering"
                />,
                link: "https://faculty"
            }
        }
    }
}

import file from "/src/Resume/shared/assets/Diploma. Master's degree.pdf";

const Education = (props: EducationProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        demo,
        ...otherProps
    } = props;

    const educationRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => educationRef.current,
    );

    const [_, [lang]] = useContext(langContext);

    return (
        educs
            .map((v) => (
                demo.isHide() ? {
                    ...v,
                    univercity: devoUnivercities.DGTU,
                    department: devoUnivercities.DGTU.departments.POVTIAS,
                    speciality: devoUnivercities.DGTU.specialities.PI,
                } : v
            ))
            .map((u, i) => (
                <VStack tag="article" key={i} style={{ gap: "0.4em" }}>
                    <VStack tag="p" style={{ gap: "0.2em" }}>
                        <b>{!demo.isHide() && u.speciality.number} «{u.speciality.name}»</b>
                        <a href={u.univercity.link}>{u.univercity.name}</a>
                        <small style={{
                            "padding-left": "1.2em",
                        }}>
                            <i><a href={u.department.link}>{u.department.name}</a></i>
                        </small>
                    </VStack>
                    <VStack tag="ul" style={{
                        rowGap: "0.4em",
                        paddingLeft: "2em",
                        margin: "0",
                    }}>
                        {
                            u.degrees.map((u) => (
                                <li
                                    style={u.is_red ? {
                                        listStyleType: "none",
                                    } : {
                                        // "list-style-position": "inside",
                                    }}
                                >
                                    <span style={{
                                        display: "inline-flex",
                                        justifyContent: "space-between",
                                        // gap: "2em",
                                        width: "95%",
                                        alignItems: "center"
                                    }}>

                                        <HStack align="center" style={{
                                            // gap: "1.2em",
                                            fontWeight: "bold"
                                        }}>
                                            {u.is_red && <a
                                                href={demo.mode == DemoMode.Release && file}
                                                title={lang === "ru" ? "Диплом с отличием" : "Honors degree"}
                                                style={{
                                                    width: "auto",
                                                    height: "2.2em",
                                                    position: "relative",
                                                }}
                                            >
                                                <RedDiploma
                                                    style={{
                                                        width: "auto",
                                                        height: "100%",
                                                        position: "absolute",
                                                        right: "calc(100% + 0.2em)",
                                                    }} aria-hidden />
                                            </a>}
                                            {u.degree}
                                        </HStack>
                                        <small style={{
                                            // width: "73%"
                                        }}>
                                            <TimeLine
                                                timeProps={{
                                                    style: {
                                                        "white-space": "nowrap"
                                                    }
                                                }}
                                                lineProps={{
                                                    style: {
                                                        "width": "7em"
                                                    }
                                                }}
                                                style={{
                                                    width: "100%"
                                                }}
                                                time={u.time} />
                                        </small>
                                    </span>
                                </li>
                            ))
                        }
                    </VStack>
                </VStack>
            ))
    )
};

export default memo(forwardRef(Education));