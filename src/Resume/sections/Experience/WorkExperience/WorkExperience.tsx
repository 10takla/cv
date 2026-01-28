import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef, useMemo } from 'react';
import { HStack, VStack } from '/src/shared/ui/Stack';
import { classNames } from '/src/shared/lib/classNames/classNames';
import cls from './WorkExperience.module.scss';
import { HightlightLink } from '/src/Resume/shared/ui/Hightlight/Hightlight';
import { T } from '/src/Resume/shared/ui/ToggleLanguage/ToggleLanguage';
import { Demo } from '/src/Resume';
import { TimeLineWithLength } from '/src/Resume/shared/ui/TimeLine/TimeLine';

export const experienceList = [
    {
        id: "Mertech",
        name: "Mertech",
        position: <T ru="Rust-разработчик" en="Rust Developer" />,
        description: <T
            ru="разработка программного обеспечения для торгового оборудования"
            en="software development for retail equipment"
        />,
        time: ["2023-11-01"],
        achievements: [
            [
                <T
                    ru="Создал универсальную библиотеку для динамической генерации этикеток для приложений печатающих весов, обеспечив гибкую адаптацию под различные аппаратные платформы"
                    en="Developed a universal library for dynamic label generation for applications for printing scales, ensuring flexible adaptation to various hardware platforms"
                />,
                [
                    <T
                        ru={<>Построил <u>гибкую</u> и <u>расширяемую</u> модель отрисовки элементов этикеток</>}
                        en={<>Designed a <u>flexible</u> and <u>extensible</u> model for rendering label elements</>}
                    />,
                    <T
                        ru="Внедрил новый интерфейс для более гибкого и интенсивного взаимодействия, что упростило работу приложений весов и ускорило разработку"
                        en="Introduced a new interface for more flexible and intensive interaction, simplifying the operation of scale applications and speeding up development"
                    />,
                    <T
                        ru={<>Организовал полное <u>профилирование</u> и <u>бенчмаркинг</u> системы. Выявил узкие места в производительности и оптимизировал их, ускорив ключевые процессы и сократив время генерации этикеток на <u>40%</u></>}
                        en={<>Organized full system <u>profiling</u> and <u>benchmarking</u>. Identified performance bottlenecks and optimized them, accelerating key processes and reducing label generation time by <u>40%</u></>}
                    />,
                ]
            ],
            <T
                ru="Автоматизировал и оптимизировал процессы сборки и тестирования, сократив время релизов и повысив стабильность конечного продукта"
                en="Automated and optimized build and testing processes, reducing release time and increasing final product stability"
            />,
            [
                <T
                    ru="Разработка драйверов, связывающих устройства торгового оборудования с корпоративной системой 1С. Позволило исключить ручной ввод при работе с устройствами и минимизировать риск ошибок при учёте"
                    en="Developed drivers linking retail equipment devices with the corporate 1C system, eliminating manual input when working with devices and minimizing accounting errors"
                />,
                [
                    <T
                        ru={<><u>Инициировал</u> задачу реализовать дополнительный функционал, адаптированный под специфику оборудования, помимо стандартного для 1С-компонент</>}
                        en={<><u>Initiated</u> the task of implementing additional functionality specific to the device, beyond the standard 1C components</>}
                    />,
                    <T
                        ru="Реализовал полное покрытие тестами"
                        en="Achieved full test coverage"
                    />
                ]
            ]
        ],
        stack: [
            { name: "Rust", id: "Rust" },
            { name: "Serde", id: "Serde" },
            [{ name: "Axum", id: "Axum" }, { name: "REST", id: "REST API" }],
            [{ name: "GitLab", id: "GitLab" }, { name: "GitHub Actions", id: "GitHub Actions" }, { name: "GitLab CI/CD", id: "GitLab CI/CD" }],
            [{ name: "Docker", id: "Docker" }, { name: "Bash", id: "Bash" }],
            ["JNI", { name: "C FFI", id: "Rust FFI" }], <T ru="1С" en="1C" />,
        ]
    },
    {
        id: "WEBSYSTEMS",
        name: <T
            ru="ВЕБСИСТЕМС, E-commerce компания (интернет-магазин)"
            en="WEBSYSTEMS, E-commerce company (online store)"
        />,
        position: <T ru="Rust-разработчик" en="Rust Developer" />,
        description: <T
            ru="разработка сервисов на Rust для повышения эффективности серверов в онлайн-торговле"
            en="development of services in Rust to improve server efficiency in online commerce"
        />,
        time: ["2022-12-01", "2023-09-01"],
        achievements: [
            <T
                ru={<>Осуществил перенос <u>высоконагруженных</u> сервисов с Django на Rust, добившись существенного ускорения обработки данных в пиковые периоды</>}
                en={<>Migrated <u>high-load</u> services from Django to Rust, achieving significant acceleration of data processing during peak periods</>}
            />,
            <T
                ru="Реализовал набор вспомогательных серверных приложений и консольных утилит для перераспределения нагрузки с основных Django-сервисов"
                en="Implemented a set of auxiliary server applications and console utilities to offload core Django services"
            />,
            <T
                ru="Разработал низкоуровневые библиотеки для бесшовной интеграции с Python, что снизило накладные расходы при ускорении сервисов"
                en="Developed low-level libraries for seamless integration with Python, reducing overhead while speeding up services"
            />,
            <T
                ru={<>Ввёл <u>комплексное тестирование</u> и мониторинг, что снизило риски неожиданных сбоев и упростило масштабирование проекта</>}
                en={<>Introduced <u>comprehensive testing</u> and monitoring, reducing the risk of unexpected failures and simplifying project scaling</>}
            />,
        ],
        stack: [
            { name: "Rust", id: "Rust" },
            { name: "Serde", id: "Serde" },
            { name: "Axum", id: "Axum" },
            "PostgreSQL",
            { name: "Diesel", id: "Diesel" },
            { name: "Clap", id: "CLI" },
            { name: "Docker", id: "Docker" },
            { name: "GitHub", id: "GitHub" }
        ]
    }
];

const demoEl = {
    name: <>
        QBDevelopment
        {" "}
        (
        <T
            ru="стартап"
            en="startApp"
        />
        {", "}
        <T
            ru="парт-тайм"
            en="part-time"
        />
        )
    </>,
    position: <T ru="Rust-разработчик" en="Rust Developer" />,
    description: <T
        ru="разработка блокчейн сервисов"
        en="blockchain service development"
    />,
    time: ["2024-12-01", "2025-02-01"],
    achievements: [
        <T
            ru="Разработал сервис для автоматизации розыгрышей и платежей, улучшив пользовательский опыт и снизив ручные операции."
            en="Developed a service for automating giveaways and payments, improving user experience and reducing manual operations."
        />,
        <T
            ru="Проектировал масштабируемую серверную архитектуру на Rust/Actix, обеспечив эффективное добавление новых функций в высоконагруженной среде."
            en="Designed a scalable server architecture using Rust/Actix, enabling efficient addition of new features in a high-load environment."
        />,
        <T
            ru="Внедрил систему контроля качества кода с автоматизированным статическим анализом и интеграционные проверки в CI."
            en="Implemented a code quality control system with automated static analysis and integration checks in CI."
        />
    ],
    stack: [
        <a>FullStack -
            <HightlightLink id={"Rust"}>
                Rust
            </HightlightLink>
            |<HightlightLink id={"React"}>
                React
            </HightlightLink></a>,
        [{ name: "Actix", id: "Actix" }, { name: "REST", id: "REST API" }],
        "Sqlx",
        [{ name: "GitHub", id: "GitHub" }, "GitHub Projects"],
        [{ name: "Docker", id: "Docker" }, { name: "Bash", id: "Bash" }]
    ]
};


type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface WorkExperienceProps extends ComponentProps<Component>, Demo {
    stackProps: ComponentProps<typeof HStack>,
    timeLineWithLengthProps: ComponentProps<typeof TimeLineWithLength>,
}

const WorkExperience = (props: WorkExperienceProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        demo,
        style,
        stackProps,
        timeLineWithLengthProps,
        ...otherProps
    } = props;

    const workExperienceRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => workExperienceRef.current,
    );

    const tmp = useMemo(() => {
        const demoNames = {
            "Mertech": <T ru="Компния №1" en="Company №1" />,
            "WEBSYSTEMS": <T ru="Компния №2" en="Company №2" />
        };
        return demo ?
            experienceList.map((v) => {
                v.name = demoNames[v.id];
                return v
            })
            : experienceList
    }, [demo]);

    return (
        <VStack
            className={classNames(cls.WorkExperience, [className])}
            tag="ol"
            style={{
                "padding-left": "0em",
                gap: "0.6em",
                ...style
            }}
            ref={workExperienceRef}
            {...otherProps}
        >
            {tmp
                .map(({ time, ...other }) => (
                    { ...other, time: time.map((v) => new Date(v)) }
                ))
                .map(({
                    name, position, description, time, achievements, stack
                }, i) => (
                    <li key={i}>
                        <HStack justify="between" align="center">
                            <span>
                                <b>
                                    {name}
                                </b>
                            </span>
                        </HStack>
                        <HStack tag="span" justify="between" align="center"

                        >
                            <span style={{ color: "#6e6e6e", "white-space": "nowrap" }}>
                                {position}
                            </span>
                            <small>
                                <TimeLineWithLength
                                    {...timeLineWithLengthProps}
                                    time={{
                                        start: time[0], end: time[1],
                                    }}
                                    style={{
                                        whiteSpace: "nowrap",
                                        ...timeLineWithLengthProps?.style
                                    }}
                                    timeLineProps={{
                                        style: {
                                            "justify-self": "right",
                                            // "padding": "0.5em",
                                            "box-sizing": "border-box",
                                            "gap": "0.7em",
                                        },
                                        lineProps: {
                                            style: {
                                                width: "6em",
                                            }
                                        },
                                        ...timeLineWithLengthProps?.timeLineProps
                                    }}
                                />
                            </small>
                        </HStack>
                        <VStack align="start" style={{ gap: "0.3em" }}>
                            <span>{"— "}{description}.</span>
                            <VStack tag="ul" className={cls.achievements}
                                style={{
                                    gap: "0.2em"
                                }}
                            >
                                {achievements.map((v, i) => (
                                    <li key={i}>
                                        {
                                            Array.isArray(v) ?
                                                <>
                                                    {
                                                        v.map((v) => (
                                                            Array.isArray(v) ?
                                                                <VStack tag="ul"
                                                                    style={{
                                                                        gap: "0.1em"
                                                                    }}
                                                                >
                                                                    {v.map((item, i) => (
                                                                        <li>
                                                                            {"– "}
                                                                            {item}
                                                                            {
                                                                                i != v.length - 1 ?
                                                                                    ";"
                                                                                    :
                                                                                    "."
                                                                            }
                                                                        </li>
                                                                    ))}
                                                                </VStack>
                                                                :
                                                                <>* {v}:</>
                                                        ))
                                                    }
                                                </>
                                                :
                                                <>* {v}.</>
                                        }
                                    </li>
                                ))}
                            </VStack>
                            <HStack
                                tag="ul"
                                align="center"
                                {...stackProps}
                                className={classNames(cls.stack, [cls.firstLevel, stackProps?.className])}
                            >
                                {stack.map((v, i) => {
                                    const El = ({ v }) => {
                                        if (typeof v == "object" && "name" in v && "id" in v) {
                                            return <HightlightLink id={v.id}>
                                                {v.name}
                                            </HightlightLink>
                                        } else {
                                            return v
                                        }
                                    };

                                    return (
                                        <li key={i}>
                                            {
                                                Array.isArray(v) ?
                                                    <HStack
                                                        tag="ul"
                                                        className={cls.stack}
                                                        align="center"
                                                    >
                                                        {v.map((item, i) => (
                                                            <>
                                                                <li>
                                                                    <El v={item} />
                                                                </li >
                                                                {i < v.length - 1 && "|"}
                                                            </>
                                                        ))}
                                                    </HStack>
                                                    :
                                                    <El v={v} />
                                            }
                                        </li>
                                    )
                                })}
                            </HStack>
                        </VStack>
                    </li>
                ))
            }
        </VStack >
    )
};

export default memo(forwardRef(WorkExperience));
