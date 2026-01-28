import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef, useMemo, useState, useEffect } from 'react';
import { HStack, VStack } from '/src/shared/ui/Stack';
import { classNames } from '/src/shared/lib/classNames/classNames';
import cls from './WorkExperience.module.scss';
import { HightlightLink } from '/src/Resume/shared/ui/Hightlight/Hightlight';
import { T } from '/src/Resume/shared/ui/ToggleLanguage/ToggleLanguage';
import { Demo, DemoMode } from '/src/Resume';
import { TimeLineWithLength } from '/src/Resume/shared/ui/TimeLine/TimeLine';


export const experienceList2 = [
    {
        id: "Mertech",
        name: "Mertech",
        position: <T ru="Rust-разработчик" en="Rust Developer" />,
        description: <T
            ru="разработка ПО для торгового оборудования"
            en="software development for retail equipment"
        />,
        time: ["2023-11-01"],
        achievements: [
            [
                <T
                    ru="Создал библиотеку генерации этикеток для приложений печатающих весов с адаптацией под разные устройства"
                    en="Developed a universal library for dynamic label generation for applications for printing scales, ensuring flexible adaptation to various hardware platforms"
                />,
                [
                    <T
                        ru={<><u>Гибкая</u> и <u>расширяемая</u> модель отрисовки элементов</>}
                        en={<><u>Flexible</u> and <u>extensible</u> model for rendering label elements</>}
                    />,
                    <T
                        ru="Новый интерфейс упростил работу и ускорил разработку"
                        en="Introduced a new interface for more flexible and intensive interaction, simplifying the operation of scale applications and speeding up development"
                    />,
                    <T
                        ru={<>Профилирование и <u>оптимизация</u> ускорили генерацию этикеток на <u>40%</u></>}
                        en={<>Organized full system <u>profiling</u> and <u>benchmarking</u>. Identified performance bottlenecks and optimized them, accelerating key processes and reducing label generation time by <u>40%</u></>}
                    />,
                ]
            ],
            <T
                ru="Автоматизировал сборку и тесты, сократил релизы и повысил стабильность"
                en="Automated and optimized build and testing processes, reducing release time and increasing final product stability"
            />,
            [
                <T
                    ru="Разработал драйверы для связи устройств с 1С без ручного ввода"
                    en="Developed drivers linking retail equipment devices with the corporate 1C system, eliminating manual input when working with devices and minimizing accounting errors"
                />,
                [
                    <T
                        ru={<><u>Инициировал</u> нестандартный функционал под особенности устройств</>}
                        en={<><u>Initiated</u> the task of implementing additional functionality specific to the device, beyond the standard 1C components</>}
                    />,
                    <T
                        ru="Обеспечил полное покрытие тестами"
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
            ru="ВЕБСИСТЕМС, E-commerce (интернет-магазин)"
            en="WEBSYSTEMS, E-commerce company (online store)"
        />,
        position: <T ru="Rust-разработчик" en="Rust Developer" />,
        description: <T
            ru="разработка сервисов на Rust для повышения эффективности серверов"
            en="development of services in Rust to improve server efficiency in online commerce"
        />,
        time: ["2022-12-01", "2023-09-01"],
        achievements: [
            <T
                ru={<>Перенёс <u>нагруженные</u> сервисы с Django на Rust, ускорив обработку в пике</>}
                en={<>Migrated <u>high-load</u> services from Django to Rust, achieving significant acceleration of data processing during peak periods</>}
            />,
            <T
                ru="Создал утилиты и серверные приложения для разгрузки ядра"
                en="Implemented a set of auxiliary server applications and console utilities to offload core Django services"
            />,
            <T
                ru="Разработал библиотеки для интеграции с Python, ускорив сервисы"
                en="Developed low-level libraries for seamless integration with Python, reducing overhead while speeding up services"
            />,
            <T
                ru={<>Ввёл <u>тестирование</u> и мониторинг, упростив масштабирование</>}
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

export const experienceData = [
    {
        id: "Mertech",
        name: "Mertech",
        position: <T ru="Rust-разработчик" en="Rust Developer" />,
        description: <T
            ru="разработка ПО для торгового оборудования"
            en="software development for retail equipment"
        />,
        time: ["2023-11-01"],
        achievements: [
            [
                <T
                    ru="Разработал кроссплатформенный viewer этикеток для языков ZPL, CPCL и TSPL"
                    en="Developed a cross-platform label viewer for ZPL, CPCL, and TSPL languages"
                />,
                [
                    <T
                        ru={<>Полное покрытие всех грамматик {" "}
                            {[
                                ["ZPL", "https://docs.zebra.com/us/en/printers/software/zpl-pg/c-zpl-zpl-commands.html"],
                                ["CPCL", "https://www.zebra.com/content/dam/support-dam/en/documentation/unrestricted/guide/software/cpcl-pm-en.pdf"],
                                ["TSPL", "https://www.pos-shop.ru/upload/iblock/e6d/e6dcd9090030c75de3ffd3435c1e2024.pdf?srsltid=AfmBOoqF0ugra59gGDH1AnkgaCzr7LxsUujL9j7J8r2LHFNn8iokZP_9&utm_source=chatgpt.com"],
                            ].reduce((acc, [a, b], i, arr) => {
                                acc.push(<a key={a} href={b}>{a}</a>);
                                if (i < arr.length - 1) acc.push(", ");
                                return acc;
                            }, [])}
                        </>}
                        en={<>Full grammar coverage for {" "}
                            {[
                                ["ZPL", "https://docs.zebra.com/us/en/printers/software/zpl-pg/c-zpl-zpl-commands.html"],
                                ["CPCL", "https://www.zebra.com/content/dam/support-dam/en/documentation/unrestricted/guide/software/cpcl-pm-en.pdf"],
                                ["TSPL", "https://www.pos-shop.ru/upload/iblock/e6d/e6dcd9090030c75de3ffd3435c1e2024.pdf?srsltid=AfmBOoqF0ugra59gGDH1AnkgaCzr7LxsUujL9j7J8r2LHFNn8iokZP_9&utm_source=chatgpt.com"],
                            ].reduce((acc, [a, b], i, arr) => {
                                acc.push(<a key={a} href={b}>{a}</a>);
                                if (i < arr.length - 1) acc.push(", ");
                                return acc;
                            }, [])}
                        </>}
                    />,
                    <T
                        ru="Поддержка Windows, Linux, Android"
                        en="Support for Windows, Linux, and Android"
                    />,
                    <T
                        ru="Универсальная генерация этикеток в соответствии с требованиями каждого протокола"
                        en="Universal label generation compliant with the requirements of each protocol"
                    />
                ]
            ],
            [
                <T
                    ru="Разработал универсальную библиотеку генерации этикеток с поддержкой разных платформ печатающих весов"
                    en="Developed a universal library for dynamic label generation for applications for printing scales, ensuring flexible adaptation to various hardware platforms"
                />,
                [
                    <T
                        ru={<>Построил <strong>гибкую</strong> и <strong>расширяемую</strong> модель отрисовки элементов этикеток</>}
                        en={<>Designed a <strong>flexible</strong> and <strong>extensible</strong> model for rendering label elements</>}
                    />,
                    <T
                        ru="Реализовал гибкий интерфейс для эффективного взаимодействия компонентов весов"
                        en="Introduced a new interface for more flexible and intensive interaction, simplifying the operation of scale applications and speeding up development"
                    />,
                    <T
                        ru={<>Провел полное <strong>профилирование</strong> и <strong>бенчмаркинг</strong>, выявил и оптимизировал узкие места, ускорив время генерации на <strong>40%</strong></>}
                        en={<>Organized full system <strong>profiling</strong> and <strong>benchmarking</strong>. Identified performance bottlenecks and optimized them, accelerating key processes and reducing label generation time by <u>40%</u></>}
                    />,
                ]
            ],
            <T
                ru="Автоматизировал и оптимизировал процессы сборки и тестирования, ускорив релизы и повысив стабильность"
                en="Automated and optimized build and testing processes, reducing release time and increasing final product stability"
            />,
            [
                <T
                    ru="Разработка драйверов для прямого взаимодействия оборудования с системой 1С. Позволило исключить ручной ввод и минимизировать риск ошибок при учёте"
                    en="Developed drivers linking retail equipment devices with the corporate 1C system, eliminating manual input when working with devices and minimizing accounting errors"
                />,
                [
                    <T
                        ru={<><strong>Инициировал</strong> задачу реализовать функционал под специфику оборудования, <em>помимо стандартного для 1С-компонент</em></>}
                        en={<><strong>Initiated</strong> the task of implementing additional functionality specific to the device, <em>beyond the standard 1C components</em></>}
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
            [{ name: "Axum", id: "Axum" }, { name: "REST", id: "REST API" }, { name: "Diesel", id: "Diesel" },],
            [{ name: "GitLab", id: "GitLab" }, { name: "GitHub Actions", id: "GitHub Actions" }, { name: "GitLab CI/CD", id: "GitLab CI/CD" }],
            { name: "Serde", id: "Serde" },
            [{ name: "Docker", id: "Docker" }, { name: "Bash", id: "Bash" }],
            ["JNI", { name: "C FFI", id: "Rust FFI" }], <T ru="1С" en="1C" />, "SQLite"
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
                ru={<>Перенёс <strong>высоконагруженные</strong> сервисы с Django на Rust, ускорив обработку данных в пиковые периоды</>}
                en={<>Migrated <strong>high-load</strong> services from Django to Rust, achieving significant acceleration of data processing during peak periods</>}
            />,
            <T
                ru="Реализовал набор вспомогательных серверных приложений и утилит для разгрузки основных Django-сервисов"
                en="Implemented a set of auxiliary server applications and console utilities to offload core Django services"
            />,
            <T
                ru="Разработал низкоуровневые библиотеки для интеграции с Python, сократив накладные расходы при ускорении сервисов"
                en="Developed low-level libraries for seamless integration with Python, reducing overhead while speeding up services"
            />,
            // <T
            //     ru={<>Ввёл <strong>комплексное тестирование</strong> и <strong>мониторинг</strong>, снизив риски неожиданных сбоев и упростив масштабирование проекта</>}
            //     en={<>Introduced <strong>comprehensive testing</strong> and <strong>monitoring</strong>, reducing the risk of unexpected failures and simplifying project scaling</>}
            // />,
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
            [{ name: "Axum", id: "Axum" }, { name: "REST", id: "REST API" },],
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


export const demoExperienceList = [
    {
        name: <T ru="Компния №1" en="Company №1" />,
    },
    {
        name: <T
            ru="Компания №2, E-commerce компания (интернет-магазин)"
            en="Company №2, E-commerce company (online store)"
        />,
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

    const exprienceList = useMemo(() => {
        return demo.isHide() ?
            experienceData.map((v, i) => {
                return { ...v, ...demoExperienceList[i] }
            })
            : experienceData
    }, [demo]);

    return (
        <VStack
            className={classNames(cls.WorkExperience, [className])}
            style={{
                "padding-left": "0em",
                gap: "0.6em",
                ...style
            }}
            ref={workExperienceRef}
            {...otherProps}
        >
            {exprienceList
                .map(({ time, ...other }) => (
                    { ...other, time: time.map((v) => new Date(v)) }
                ))
                .map(({
                    name, position, description, time, achievements, stack
                }, i) => (
                    <VStack key={i}
                        tag="article"
                        style={{
                            gap: "0.3em",
                            position: "relative"
                        }}
                    >
                        <h3 style={{
                            margin: 0,
                            fontSize: "1.2em"
                        }}>
                            {name}
                        </h3>
                        <HStack tag="section" justify="between">
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
                        <VStack tag="section" align="start" style={{ gap: "0.3em" }}>
                            <p>{"— "}{description}.</p>
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
                                                                <>{v}:</>
                                                        ))
                                                    }
                                                </>
                                                :
                                                <>{v}.</>
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
                                    const El = ({ v }) => (
                                        (typeof v == "object" && "name" in v && "id" in v) ?
                                            <HightlightLink id={v.id}>
                                                {v.name}
                                            </HightlightLink>
                                            : v
                                    );

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
                    </VStack>
                ))
            }
        </VStack>
    )
};

export default memo(forwardRef(WorkExperience));