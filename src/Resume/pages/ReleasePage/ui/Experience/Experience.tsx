import { ComponentProps, ElementRef } from 'react';
import { glossary } from '/src/Resume/shared/const/info';
import { T } from '/src/Resume/shared/ui/ToggleLanguage/ToggleLanguage';
import { HStack, VStack } from '/src/shared/ui/Stack';
import cls from './Experience.module.scss';
import LeetCode from "/src/Resume/shared/assets/imgs/leet code.svg?react"
import CodeWars from "/src/Resume/shared/assets/imgs/codewars.svg?react"
import { Demo } from '/src/Resume';

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

export const ot = <>
    <div>
        <T
            ru=
            "Использовал на практике:"
            en="Used in practice:"
        />
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
                    <><abbr title="Foreign Function Interface">FFI</abbr> <T ru="к" en="to" /> C, C++, Python, Java</>,
                    <T
                        ru={<>Concurrency на уровне <strong>атомарных операций</strong>, <strong>упорядочивания памяти</strong> и системных вызовов <L>futex</L></>}
                        en={<>Concurrency at the <strong>atomic-operations</strong> level, <strong>memory ordering</strong>, <L>futex</L> system calls</>}
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
    </div>
    <div>
        <T
            ru={<>Имею опыт работы с компилятором <L><G>rustc</G></L>. На данный момент <a href="https://github.com/10takla/rust">работаю</a> над модификацией <a href="https://rustc-dev-guide.rust-lang.org/traits/resolution.html">правила перекрытий</a>.</>}
            en={<>I have experience working with <L><G>rustc</G></L> compiler. At the moment I am  <a href="https://github.com/10takla/rust">working</a> on modification of the <a href="https://rustc-dev-guide.rust-lang.org/traits/resolution.html">overlap rule</a>.</>}
        />
        <br />
    </div>
    <HStack tag="div" align="start">
        <span>
            <T
                ru={<>
                    Знаю алгоритмы и структуры данных. Умею находить оптимальные решения для памяти и времени выполнения. Постоянно стремлюсь к <L>O(log n)</L> и <L>O(n)</L> сложности алгоритмов.
                </>}
                en={<>
                    I know algorithms and data structures, how to find optimal solutions for memory and CPU time. I constantly strive for <L>O(log n)</L> and <L>O(n)</L> complexity of algorithms.
                </>}
            />
        </span>
        <VStack align="center">
            <a href="https://leetcode.com/u/10takla/">
                <LeetCode id="leetcode" />
            </a>
            <a href="https://www.codewars.com/users/10takla">
                <CodeWars id="codewars" />
            </a>
        </VStack>
    </HStack>
    <div>
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
                Весь логически важный код всегда сопровождаю unit и интеграционными тестами.
            </>}
            en={<>
                <>I always accompany all logically important code with unit and integration tests.</>
            </>}
        />
    </div>
    <div>
        <T
            ru="Грамотно планирую свой рабочий процесс. Использую трекеры, такие как "
            en="I plan my workflow carefully. I use trackers such as "
        />
        <a href="https://www.jetbrains.com/youtrack/">YouTrack</a>
        <T
            ru=", для отслеживания выполненных задач."
            en=" to keep track of tasks completed."
        />
    </div>
</>