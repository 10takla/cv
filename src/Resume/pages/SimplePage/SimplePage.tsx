import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef, useMemo, useContext, Fragment, ReactNode, cloneElement, isValidElement } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './SimplePage.module.scss';
import { langContext, t, T } from 'resume/shared/ui/ToggleLanguage/ToggleLanguage';
import { Demo } from 'resume';
import Contacts from '../ReleasePage/ui/Contacts/Contacts';
import { educs } from '../ReleasePage/ui/Education/Education';
import Block from 'resume/shared/ui/Block/Block';
import { demoExperienceList } from '../ReleasePage/ui/WorkExperience/WorkExperience';
import PetProjects from 'resume/sections/Experience/PetProjects/PetProjects';
import { skills } from 'resume/shared/const/info';
import { Time, TimeLineProps } from 'resume/shared/ui/TimeLine/TimeLine';
import PrivateConnectivitySvg from "./sections/private_connectivity.svg?react"
import ConstructionSvg from "./sections/construction.svg?react"


const abbrDefinitions: Record<string, { ru: string, en: string }> = {
    "JNI": {
        ru: "Java Native Interface — интерфейс взаимодействия Java с native-кодом",
        en: "Java Native Interface"
    },
    "CI/CD": {
        ru: "Continuous Integration / Continuous Delivery — непрерывная интеграция и доставка",
        en: "Continuous Integration / Continuous Delivery"
    },
    "MCP": {
        ru: "Model Context Protocol — открытый стандарт подключения внешних инструментов и источников данных к ИИ-агентам",
        en: "Model Context Protocol"
    },
    "SDK": {
        ru: "Software Development Kit — комплект средств разработки",
        en: "Software Development Kit"
    },
    "DSL": {
        ru: "Domain Specific Language — предметно-ориентированный язык программирования",
        en: "Domain Specific Language"
    },
    "AST": {
        ru: "Abstract Syntax Tree — абстрактное синтаксическое дерево",
        en: "Abstract Syntax Tree"
    },
    "ZPL": {
        ru: "Zebra Programming Language — язык описания страниц, используемый в принтерах Zebra",
        en: "Zebra Programming Language"
    },
    "CPCL": {
        ru: "Comtec Printer Control Language — язык управления принтерами Comtec/Zebra",
        en: "Comtec Printer Control Language"
    },
    "TSPL": {
        ru: "TSPL (TSC Printer Language) — язык управления принтерами TSC",
        en: "TSC Printer Language"
    },
    "NDK": {
        ru: "Native Development Kit — набор инструментов для разработки на C/C++ под Android",
        en: "Native Development Kit"
    },
    "OIDC": {
        ru: "OpenID Connect — стандарт аутентификации на базе протокола OAuth 2.0",
        en: "OpenID Connect"
    },
    "JWKS": {
        ru: "JSON Web Key Set — набор ключей в формате JSON для проверки подлинности JWT",
        en: "JSON Web Key Set"
    }
};

const abbrRegex = /\b(JNI|CI\/CD|MCP|SDK|DSL|AST|ZPL|CPCL|TSPL|NDK|OIDC|JWKS)\b/g;

const renderAbbr = (text: ReactNode, lang: 'ru' | 'en'): ReactNode => {
    if (typeof text === 'string') {
        const parts = text.split(abbrRegex);
        if (parts.length === 1) return text;
        return parts.map((part, index) => {
            if (index % 2 === 1) {
                const def = abbrDefinitions[part];
                return (
                    <abbr key={index} title={def[lang]}>
                        {part}
                    </abbr>
                );
            }
            return part;
        });
    }
    if (Array.isArray(text)) {
        return text.map((child, index) => <Fragment key={index}>{renderAbbr(child, lang)}</Fragment>);
    }
    if (isValidElement(text)) {
        if (text.type === 'abbr') {
            return text;
        }
        let propsUpdate: any = {};
        let hasUpdates = false;
        if (text.props) {
            if ('ru' in text.props) {
                propsUpdate.ru = renderAbbr((text.props as any).ru, lang);
                hasUpdates = true;
            }
            if ('en' in text.props) {
                propsUpdate.en = renderAbbr((text.props as any).en, lang);
                hasUpdates = true;
            }
            if ('children' in text.props && (text.props as any).children) {
                propsUpdate.children = renderAbbr((text.props as any).children, lang);
                hasUpdates = true;
            }
        }
        if (hasUpdates) {
            return cloneElement(text, propsUpdate);
        }
    }
    return text;
};

type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface SimplePageProps extends ComponentProps<Component>, Demo {
    microSaaS?: ReactNode;
}

const SimplePage = (props: SimplePageProps, ref: ForwardedRef<ElRef>) => {
    const {
        className, demo, experienceData, microSaaS,
        ...otherProps
    } = props;
    console.log(microSaaS)
    const [_, [lang]] = useContext(langContext);
    const simplePageRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => simplePageRef.current,
    );

    const exprienceList = useMemo(() => {
        return demo.isHide() ?
            experienceData.map((v, i) => {
                return { ...v, ...demoExperienceList[i] }
            })
            : experienceData
    }, [demo, experienceData]);

    const TimeDiapason = ({ time }: { time: TimeLineProps["time"] }) => {
        return <HStack tag="span" style={{ whiteSpace: "nowrap", columnGap: "0.2em" }}>
            <Time time={time.start} />
            {" — "}
            {time.end ? <Time time={time.end} /> : (
                <span>
                    <T en="Present" ru="н.в." />
                </span>
            )}
        </HStack>
    };

    return (
        <VStack
            className={classNames(cls.SimplePage, [className])}
            ref={simplePageRef}
            {...otherProps}
        >
            <VStack tag="header" align="center" style={{ width: "100%" }}>
                <h1 style={{
                    marginBottom: 0,
                    marginTop: "0.2em",
                }}>
                    {demo.isDemo() ? <T ru="Имя Фамилия" en="First Last Name" /> : <T ru="Абакар Летифов" en="Abakar Letifov" />}
                </h1>
                <HStack
                    tag="span" align="center"
                    style={{
                        display: "inline-flex",
                        "font-size": "1.5em",
                        // color: "var(--feature-color)"
                        color: "gray"
                    }}
                >
                    {/* <FerrisSvg style={{
                        // fill: "white",
                        width: "1.4em",
                    }} /> */}
                    <strong>Rust<T ru="-разработчик" en=" Developer" /></strong>
                </HStack>
                <p>
                    {(() => {
                        const birth = new Date("2002-04-18");
                        const today = new Date();

                        let age = today.getFullYear() - birth.getFullYear();
                        const m = today.getMonth() - birth.getMonth();

                        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
                            age--;
                        }

                        return age;
                    })()}  <T ru="года" en="years old" />
                    {", GMT+3; "}
                    <T
                        ru="удалённая работа (полная или частичная занятость); открыт к любому графику работы."
                        en="remote work (full-time or part-time); open to any work schedule."
                    />
                </p>
                <Contacts demo={demo} className={cls.contacts} />
            </VStack>
            <VStack tag="main">
                {
                    [
                        [
                            <T ru={"Опыт работы".toUpperCase()} en={"Work Experience".toUpperCase()} />,
                            <VStack
                                className={cls.workExperience}
                                style={{
                                    gap: "0.6em",
                                }}
                                {...otherProps}
                            >
                                {exprienceList
                                    .map(({ time, ...other }) => ({ ...other, time: time.map((v) => new Date(v)) }))
                                    .map(({ name, position, description, time, achievements, stack }, i) => (
                                        <VStack tag="article" key={i}
                                            style={{
                                                gap: "0.3em",
                                                position: "relative"
                                            }}
                                        >
                                            <HStack tag="section" justify="between">
                                                <h3>{name}</h3>
                                                <TimeDiapason time={{ start: time[0], end: time[1], }} />
                                            </HStack>
                                            <HStack tag="section" justify="between" style={{ color: "#6e6e6e", "white-space": "nowrap" }}>
                                                <span>{position}</span>
                                                {
                                                    (([start, end]) => {
                                                        const [_, [lang]] = useContext(langContext);
                                                        return formatYearMonthDiff(start, end, lang)
                                                    })(time)
                                                }
                                            </HStack>
                                            <VStack tag="section" align="start" style={{ gap: "0.3em" }}>
                                                <p>{"— "}{renderAbbr(description, lang)}.</p>
                                                <VStack tag="ul" className={cls.achievements}
                                                    style={{ gap: "0.2em" }}
                                                >
                                                    {achievements.map((v, i) => (
                                                        <li key={i}>
                                                            {
                                                                Array.isArray(v) ?
                                                                    <VStack style={{ gap: "0.2em" }}>
                                                                        {
                                                                            v.map((v, i) => (
                                                                                Array.isArray(v) ?
                                                                                    <VStack tag="ul" key={i}
                                                                                        style={{ gap: "0.2em" }}
                                                                                    >
                                                                                        {v.map((item, i) => (
                                                                                            <li key={i}>
                                                                                                {renderAbbr(item, lang)}
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
                                                                                    <span key={i}>{renderAbbr(v, lang)}:</span>
                                                                            ))
                                                                        }
                                                                    </VStack>
                                                                    :
                                                                    <>{renderAbbr(v, lang)}.</>
                                                            }
                                                        </li>
                                                    ))}
                                                </VStack>
                                                <HStack
                                                    tag="ul"
                                                    align="center"
                                                    style={{
                                                        listStyleType: "none",
                                                        columnGap: "1em",
                                                        paddingLeft: "unset",
                                                        flexWrap: "wrap"
                                                    }}
                                                    // {...stackProps}
                                                    className={cls.stack}
                                                >
                                                    {stack.flat().map((v, i) => (
                                                        <li key={i} style={{ whiteSpace: "nowrap" }}>
                                                            {/* <i> */}
                                                            {renderAbbr((typeof v == "object" && "name" in v) ?
                                                                v.name
                                                                : v, lang)}
                                                            {/* </i> */}
                                                        </li>
                                                    ))}
                                                </HStack>
                                            </VStack>
                                        </VStack>
                                    ))
                                }
                            </VStack>
                        ],
                        [
                            <T ru={"Pet-проекты".toUpperCase()} en={"Pet projects".toUpperCase()} />,
                            <VStack style={{ width: "100%", gap: "0.8em" }}>
                                <VStack style={{
                                    width: "100%",
                                    gap: "0.3em"
                                }}>
                                    <HStack style={{
                                        fontWeight: "bold",
                                        justifyContent: "space-between",
                                        // alignItems: "center",
                                    }}>
                                        <h3>
                                            Micro-SaaS (
                                            <abbr
                                                title={t({
                                                    ru: "Business-to-Consumer — «бизнес для потребителя»",
                                                    en: "Business-to-Consumer"
                                                })}>
                                                B2C
                                            </abbr>
                                            )
                                        </h3>
                                        <HStack style={{
                                            gap: "0.2em",
                                        }}>
                                            <div
                                                style={{ display: "inline-flex", boxSizing: "border-box" }}
                                                title={t({ ru: "Проприетарный / Закрытый исходный код", en: "Proprietary / Closed Source" })}
                                            >
                                                <PrivateConnectivitySvg
                                                    style={{ height: "100%" }}
                                                />
                                            </div>
                                            {/* <div
                                                style={{ display: "inline-flex", }}
                                                title={t({ ru: "В разработке", en: "Under development" })}
                                            >
                                                <ConstructionSvg />
                                            </div> */}
                                        </HStack>
                                    </HStack>
                                    {renderAbbr(microSaaS, lang)}
                                </VStack>
                                <VStack style={{ width: "100%", gap: "0.3em" }}>
                                    <h3>
                                        <T ru="Библиотеки:" en="Libraries:" />
                                    </h3>
                                    <PetProjects className={cls.petProjects} />
                                </VStack>
                            </VStack>
                        ],
                        [
                            <T ru={"Навыки".toUpperCase()} en={"Skills".toUpperCase()} />,
                            <VStack style={{ gap: "0.3em", width: "100%" }}>
                                <HStack tag="ul" className={cls.skills}>
                                    {
                                        [...new Map(skills.filter(s => !s.isAi).flatMap(s => s.skills).map(s => [s.name, s])).values()]
                                            .filter((s: any) => !s.childs)
                                            .map((skill: any, i) => (
                                                <li style={{ whiteSpace: "nowrap" }} key={i}>
                                                    {renderAbbr(skill.en ? t({ ru: skill.name, en: skill.en }) : skill.name, lang)} {skill.level}
                                                </li>
                                            ))
                                    }
                                </HStack>
                                {
                                    [...new Map(skills.filter(s => !s.isAi).flatMap(s => s.skills).map(s => [s.name, s])).values()]
                                        .filter((s: any) => s.childs)
                                        .map((skill: any, i) => (
                                            <div key={`normal-group-${i}`} style={{ width: "100%", marginTop: "0.5em", lineHeight: "1.4" }}>
                                                <span style={{ fontSize: "0.85em", fontWeight: "bold" }}>
                                                    {renderAbbr(skill.en ? t({ ru: skill.name, en: skill.en }) : skill.name, lang)}:
                                                </span>{" "}
                                                {
                                                    skill.childs.map((child: any, j: number) => (
                                                        <Fragment key={j}>
                                                            {renderAbbr(child.en ? t({ ru: child.name, en: child.en }) : child.name, lang)}{child.level ? ` ${child.level}` : ""}
                                                            {j < skill.childs.length - 1 ? ", " : ""}
                                                        </Fragment>
                                                    ))
                                                }
                                            </div>
                                        ))
                                }
                                <div style={{ fontSize: "0.9em", fontWeight: "bold", borderBottom: "1px dashed #ccc", paddingBottom: "0.2em", marginTop: "0.3em", width: "100%" }}>
                                    <T ru="ИИ и Агенты" en="AI & Agents" />
                                </div>
                                <VStack style={{ gap: "0.1em", width: "100%" }}>
                                    <HStack tag="ul" className={cls.skills}>
                                        {
                                            [...new Map(skills.filter(s => s.isAi).flatMap(s => s.skills).map(s => [s.name, s])).values()]
                                                .filter((s: any) => !s.childs)
                                                .map((skill: any, i) => (
                                                    <li style={{ whiteSpace: "nowrap" }} key={i}>
                                                        {renderAbbr(skill.en ? t({ ru: skill.name, en: skill.en }) : skill.name, lang)} {skill.level}
                                                    </li>
                                                ))
                                        }
                                    </HStack>
                                    {
                                        [...new Map(skills.filter(s => s.isAi).flatMap(s => s.skills).map(s => [s.name, s])).values()]
                                            .filter((s: any) => s.childs)
                                            .map((skill: any, i) => (
                                                <div key={`ai-group-${i}`} style={{ width: "100%", lineHeight: "1.4" }}>
                                                    <span style={{ fontSize: "0.85em", fontWeight: "bold" }}>
                                                        {renderAbbr(skill.en ? t({ ru: skill.name, en: skill.en }) : skill.name, lang)}:
                                                    </span>{" "}
                                                    {
                                                        skill.childs.map((child: any, j: number) => (
                                                            <Fragment key={j}>
                                                                {renderAbbr(child.en ? t({ ru: child.name, en: child.en }) : child.name, lang)}{child.level ? ` ${child.level}` : ""}
                                                                {j < skill.childs.length - 1 ? ", " : ""}
                                                            </Fragment>
                                                        ))
                                                    }
                                                </div>
                                            ))
                                    }
                                </VStack>
                            </VStack>
                        ],
                        [
                            <T ru={"Образование".toUpperCase()} en={"Education".toUpperCase()} />,
                            educs.map(({ univercity: u, degrees, speciality }) => (
                                <>
                                    <p>
                                        <b>{!demo.isHide() && speciality.number} «{speciality.name}»</b>
                                        <br />
                                        {u.name}, {u.city}
                                    </p>
                                    <ul>
                                        {degrees.map((v, i) => (
                                            <li key={i}>
                                                <HStack tag="span" justify="between">
                                                    {v.degree} <TimeDiapason time={v.time} />
                                                </HStack>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            ))
                        ],
                    ].map(([value, el]) => (
                        <Block
                            className={cls.block}
                            head={{
                                tag: "h2",
                                value,
                            }}
                        >
                            <hr style={{
                                width: "100%",
                                marginBottom: "0.4em",
                                marginTop: "-0.4em",
                                border: 0,
                                borderTop: "1.1px solid #000"
                            }} />
                            {el}
                        </Block>
                    ))
                }
            </VStack>
        </VStack>
    )
};

export default memo(forwardRef(SimplePage));

const formatYearMonthDiff = (start: Date, end = null, locale = "ru", style = "long") => {
    let s = new Date(start), e = end == null ? new Date() : new Date(end);
    if (e < s) [s, e] = [e, s];

    let years = e.getFullYear() - s.getFullYear();
    let months = e.getMonth() - s.getMonth();
    if (months < 0) { years--; months += 12 + 1 /* текущий месяц */; }
    if (e.getDate() < s.getDate()) { months--; if (months < 0) { years--; months += 12; } }

    const dur = {};
    if (years) dur.years = years;
    if (months) dur.months = months;

    // 1) Встроенный форматтер (лучший вариант)
    if (Intl?.DurationFormat) {
        if (!dur.years && !dur.months) return new Intl.DurationFormat(locale, { style }).format({ months: 0 });
        return new Intl.DurationFormat(locale, { style }).format(dur);
    }

    // 2) Фолбэк (PluralRules)
    const pr = new Intl.PluralRules(locale);
    const forms = {
        en: { years: { one: "year", other: "years" }, months: { one: "month", other: "months" } },
        ru: {
            years: { one: "год", few: "года", many: "лет", other: "лет" },
            months: { one: "месяц", few: "месяца", many: "месяцев", other: "месяцев" }
        }
    };
    const f = forms[locale.startsWith("ru") ? "ru" : "en"];
    const unit = (n, u) => `${n} ${f[u][pr.select(n)] || f[u].other}`;

    const parts = [];
    if (years) parts.push(unit(years, "years"));
    if (months) parts.push(unit(months, "months"));
    return parts.join(" ") || (locale.startsWith("ru") ? "0 месяцев" : "0 months");
};

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
            { name: "Serde", id: "Serde" },
            [{ name: "Axum", id: "Axum" }, { name: "Diesel", id: "Diesel" },],

            [{ name: "GitLab", id: "GitLab" }, { name: "GitHub Actions", id: "GitHub Actions" }, { name: "GitLab CI/CD", id: "GitLab CI/CD" }],
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
            <T
                ru={<>Ввёл <strong>комплексное тестирование</strong> и <strong>мониторинг</strong>, снизив риски неожиданных сбоев и упростив масштабирование проекта</>}
                en={<>Introduced <strong>comprehensive testing</strong> and <strong>monitoring</strong>, reducing the risk of unexpected failures and simplifying project scaling</>}
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