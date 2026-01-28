import { cloneElement, ComponentProps, ElementRef, ForwardedRef, forwardRef, memo, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { glossary } from '/src/Resume/shared/const/info';
import { T } from '/src/Resume/shared/ui/ToggleLanguage/ToggleLanguage';
import Block from '/src/Resume/shared/ui/Block/Block';
import { classNames } from '/src/shared/lib/classNames/classNames';
import { HStack, VStack } from '/src/shared/ui/Stack';
import cls from './Experience.module.scss';
import LeetCode from "/src/Resume/shared/assets/imgs/leet code.svg?react"
import CodeWars from "/src/Resume/shared/assets/imgs/codewars.svg?react"
import { TimeLineWithLength } from '/src/Resume/shared/ui/TimeLine/TimeLine';
import { HightlightLink } from '/src/Resume/shared/ui/Hightlight/Hightlight';
import AboutMe from '../AboutMe/AboutMe';
import PetProjects from './PetProjects/PetProjects';
import { Demo } from '/src/Resume';
import WorkExperience from './WorkExperience/WorkExperience';

type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface ExperienceProps extends ComponentProps<Component>, Demo {

}

export const G = ({ children }: { children: keyof typeof glossary }) => {
    let el = glossary[children];
    return (
        <a href={el.link}>{children}</a>
    )
}

export const L = ({ children }: { children: any }) => {
    return (
        <code className={cls.lang}>{children}</code>
    )
}

export const ot = [
    <p>
        <span><T
            ru="Использовал на практике:"
            en="Used in practice:"
        /></span>
        <VStack tag="ul">
            {(() => {
                const v = [
                    <>
                        {
                            (() => {
                                const v = [
                                    "axum",
                                    "actix",
                                    "diesel",
                                    "sqlx",
                                    "serde",
                                    "utopia"
                                ];
                                const l = v.length - 1;
                                return [...v].map((v, i) => (
                                    <>
                                        <L><G>{v}</G></L>
                                        {i == l ? null : "|"}
                                    </>
                                ))
                            })()
                        }
                    </>,
                    <><L>wasm</L>|<L><G>wasm-bindgen</G></L></>,
                    <>FFI <T ru="к" en="to" /> C, C++, Python, Java</>,
                    <T
                        ru={<>Concurrency на уровне <u>атомарных операций</u>, <u>упорядочивания памяти</u> и системных вызовов <u>futex</u></>}
                        en={<>Concurrency at the <u>atomic-operations</u> level, <u>memory ordering</u>, <u>futex</u> system calls</>}
                    />,
                    <T
                        ru={<>Асинхронное программирование, в частности <L><G>tokio</G></L></>}
                        en={<>Asynchronous programming, particularly <L><G>tokio</G></L></>}
                    />,
                    <T
                        ru={<>Создание CLI-приложений, в частности <L><G>clap</G></L></>}
                        en={<>Creating CLI applications, particularly <L><G>clap</G></L></>}
                    />
                ];
                return v.map((c, i) => (
                    <li key={i}>{c}{i != v.length - 1 ? ";" : "."}</li>
                ))
            })()}
        </VStack>
    </p>,
    <p>
        <T
            ru={<>Имею опыт работы с компилятором <L><G>rustc</G></L>. На данный момент <a href="https://github.com/10takla/rust">работаю</a> над модификацией <a href="https://rustc-dev-guide.rust-lang.org/traits/resolution.html">правила перекрытий</a>.</>}
            en={<>I have experience working with <L><G>rustc</G></L> compiler. At the moment I am  <a href="https://github.com/10takla/rust">working</a> on modification of the <a href="https://rustc-dev-guide.rust-lang.org/traits/resolution.html">overlap rule</a>.</>}
        />
        <br />
    </p>,
    <HStack tag="p" align="start">
        <span>
            <T
                ru={<>
                    Знаю алгоритмы и структуры данных. Умею находить оптимальные решения с точки зрения памяти и времени выполнения. Постоянно стремлюсь к <u>O(log n)</u> и <u>O(n)</u> сложности алгоритмов.
                </>}
                en={<>
                    I know algorithms and data structures, how to find optimal solutions for memory and CPU time. I constantly strive for <u>O(log n)</u> and <u>O(n)</u> complexity of algorithms.
                </>}
            />
        </span>
        <HStack className={cls.algoLinks} align="center">
            <a href="https://leetcode.com/u/10takla/">
                <LeetCode id="leetcode" />
            </a>
            <a href="https://www.codewars.com/users/10takla">
                <CodeWars id="codewars" />
            </a>
        </HStack>
    </HStack>,
    <p>
        <p>
            <T
                ru="Умею:"
                en="Skilled in:"
            />
            <VStack tag="ul">
                <li>
                    <T
                        ru={<>Читать, понимать и писать </>}
                        en={<>Read, understand, and write </>}
                    />
                    <a href="https://doc.rust-lang.org/rustdoc/how-to-write-documentation.html#how-to-write-documentation">
                        <T
                            ru={<><L>rust</L>-овскую документацию;</>}
                            en={<><L>Rust</L> documentation;</>}
                        />
                    </a>
                </li>
                <li>
                    <T
                        ru={<>Создавать и управлять <a href="https://doc.rust-lang.org/cargo/reference/publishing.html">пакетами <L>cargo</L></a> в системах </>}
                        en={<>Create and manage <a href="https://doc.rust-lang.org/cargo/reference/publishing.html"><L>Cargo</L> packages</a> in </>}
                    />
                    <L><a href="https://crates.io/">crates.io</a></L>/<L><a href="https://github.com/10takla">github</a></L>.
                </li>
            </VStack>
        </p>
        <T
            ru={<>Весь "копипаст" кода перевожу в процедурные, декларативные макросы.</>}
            en={<>I translate all "copy-paste" code into procedural, declarative macros.</>}
        />
        <br />
        <T
            ru={<>
                Весь логически важный код всегда сопровождаю <u>unit</u> и интеграционными тестами.
            </>}
            en={<>
                <>I always accompany all logically important code with <u>unit</u> and integration tests.</>
            </>}
        />
    </p>,
    <p>
        <T
            ru="Грамотно планирую свой рабочий процесс. Использую трекеры, такие как "
            en="I plan my workflow carefully. I use trackers such as "
        />
        <a href="https://www.jetbrains.com/youtrack/">YouTrack</a>
        <T
            ru=", для отслеживания выполненных задач."
            en=" to keep track of tasks completed."
        />
    </p>,
]

const Experience = (props: ExperienceProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        demo,
        ...otherProps
    } = props;

    const experienceRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => experienceRef.current,
    );


    const list = [
        <Block
            head={<T ru="Опыт работы" en="Work Experience" />}
        >
            <WorkExperience
                style={{
                    "padding-left": "1em",
                }}
            />
        </Block>,
        // <Block
        //     head={<T ru="Предыдущий опыт" en="Previous experience" />}
        // >
        //     <T
        //         ru={
        //             <div>
        //                 Языки, которые я изучал: <L>Python</L>, <L>TypeScript</L>:
        //                 <VStack tag="ul">
        //                     <li><L>Python</L> на уровне Junior.<br />
        //                         <ol>осваивал <L>Django</L>, создавал <a href="https://github.com/10takla/planet-backend">сервер</a></ol>
        //                     </li>
        //                     <li><L>React</L>/<L>TypeScript</L>/<L>Redux</L> на уровне Junior-Middle.
        //                         <ol>прошёл <a href='https://ulbitv.ru/frontend'>курс</a>, на котором писал <a href="https://github.com/10takla/ulbi">проект</a></ol>
        //                     </li>
        //                 </VStack>
        //             </div>
        //         }
        //         en={
        //             <div>
        //                 Languages I have learned: <L>Python</L>, <L>TypeScript</L>:
        //                 <VStack tag="ul">
        //                     <li><L>Python</L> at Junior level.<br />
        //                         <ol>studied <L>Django</L>, built a <a href="https://github.com/10takla/planet-backend">server-side logic</a></ol>
        //                     </li>
        //                     <li><L>React</L>/<L>TypeScript</L>/<L>Redux</L> at Junior-Middle level.
        //                         <ol>completed the <a href='https://ulbitv.ru/frontend'>course</a> on which I wrote the <a href="https://github.com/10takla/ulbi">project</a></ol>
        //                     </li>
        //                 </VStack>
        //             </div>
        //         }
        //     />
        // </Block>,
        ...ot,
        <Block head={<T ru="Pet-проекты" en="Pet projects" />}>
            <PetProjects className={classNames(cls.petProjects)} />
        </Block>
    ];

    return (
        <VStack
            className={classNames(cls.Experience, [className])}
            ref={experienceRef}
            // justify="between"
            {...otherProps}
        >
            {list.map((item, i) => (
                cloneElement(
                    item,
                    {
                        key: i,
                        className: classNames(cls.item, [item.props.className]),
                    }
                )
            ))}
        </VStack >
    )
};

export default memo(forwardRef(Experience));
