import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef, useContext, useState, useMemo, ReactNode } from 'react';
import { HStack, VStack } from '/src/shared/ui/Stack';
import { classNames } from '/src/shared/lib/classNames/classNames';
import cls from './Education.module.scss';
import Books from '../Books/Books';
import TimeLine from '/src/Resume/shared/ui/TimeLine/TimeLine';
import { langContext, T } from '/src/Resume/shared/ui/ToggleLanguage/ToggleLanguage';

type Component = typeof ul;
type ElRef = ElementRef<Component> | null;

interface EducationProps extends ComponentProps<Component> {

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

interface Univercity {
    name: ReactNode,
    link: string
    specialities: Record<string, Speciality>
    departments: Record<string, {
        name: ReactNode,
        link: string
    }>
}

const univercities: Record<string, Univercity> = {
    DGTU: {
        name: <T ru="Дагестанский государственный технический университет" en="Dagestan State Technical University" />,
        link: "https://dstu.ru/",
        specialities: Object.entries(specialities)
            .filter(([key]) => ["PI"].includes(key))
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
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

const educs = [
    {
        univercity: univercities.DGTU,
        degrees: [
            {
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

const Education = (props: EducationProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        ...otherProps
    } = props;

    const educationRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => educationRef.current,
    );

    return (
        <ul
            className={classNames(cls.Education, [className])}
            ref={educationRef}
            style={{ "padding": 0, margin: 0 }}
            {...otherProps}
        >
            {educs.map((u, i) => (
                <VStack key={i} style={{ gap: "0.4em" }}>
                    <VStack style={{ gap: "0.2em" }}>
                        <span><b>{u.speciality.number}</b> "{u.speciality.name}"</span>
                        <VStack>
                            <a href={u.univercity.link}>{u.univercity.name}</a>
                            <small style={{
                                "padding-left": "1.2em",
                            }}>
                                <i><a href={u.department.link}>{u.department.name}</a></i>
                            </small>
                        </VStack>
                    </VStack>
                    <ul style={{
                        paddingLeft: "1em",
                        "margin": "0",
                        // "padding-left": "0em",
                    }}>
                        {
                            u.degrees.map((u) => (
                                <li
                                    style={{
                                        // "list-style-position": "inside",
                                    }}
                                >
                                    <span style={{
                                        display: "inline-flex",
                                        justifyContent: "space-between",
                                        width: "100%",
                                        alignItems: "center"
                                    }}>
                                        {u.degree}
                                        <small style={{
                                            width: "73%"
                                        }}>
                                            <TimeLine
                                                timeProps={{
                                                    style: {
                                                        "white-space": "nowrap"
                                                    }
                                                }}
                                                style={{
                                                    width: "100%"
                                                }}
                                                time={u.time}
                                            />
                                        </small>
                                    </span>
                                </li>
                            ))
                        }
                    </ul>
                </VStack>
            ))}
        </ul>
    )
};

export default memo(forwardRef(Education));