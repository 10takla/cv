type Skill = StarsSkill | SelfLevelSkill;

interface StarsSkill extends CommonSkill {
    stars: number,
}

interface SelfLevelSkill extends CommonSkill {
    level: string,
    stars: number,
}

interface CommonSkill {
    name: string,
    link?: string,
    en?: string
    isId?: boolean
}

export const glossary = {
    rustc: {
        link: "https://github.com/rust-lang/rust",
    },
    axum: {
        link: "https://docs.rs/axum/latest/axum/"
    },
    actix: {
        link: "https://docs.rs/actix-web/latest/actix_web/"
    },
    tokio: {
        link: "https://docs.rs/tokio/latest/tokio/"
    },
    diesel: {
        link: "https://docs.rs/diesel/latest/diesel/"
    },
    sqlx: {
        link: "https://docs.rs/sqlx/latest/sqlx/"
    },
    "wasm-bindgen": {
        link: "https://docs.rs/wasm-bindgen/latest/wasm_bindgen/"
    },
    serde: {
        link: "https://docs.rs/serde/latest/serde/"
    },
    clap: {
        link: "https://docs.rs/clap/latest/clap/"
    },
    utopia: {
        link: "https://docs.rs/utoipa/latest/utoipa/"
    },
    "#[marker]": {
        link: "https://github.com/rust-lang/rust/issues/29864"
    }
}
const allSkills = {
    Axum: { stars: 5, link: glossary.axum.link },
    Actix: { stars: 5, link: "https://docs.rs/actix/latest/actix/" },
    Tokio: { stars: 4, link: glossary.tokio.link, isId: true },
    Serde: { stars: 5, link: "https://docs.rs/serde/latest/serde/", isId: true },
    "Rust FFI": { stars: 4, link: "https://doc.rust-lang.org/nomicon/ffi.html", isId: true },
    Sqlx: { stars: 5, link: "https://docs.rs/sqlx/latest/sqlx/" },
    Diesel: { stars: 5, link: "https://docs.rs/diesel/latest/diesel/" },
    Wasm: { stars: 5 },
    rustc: { stars: 5, link: "https://github.com/rust-lang/rust", isId: true },
    CLI: { stars: 4, isId: true },
    Asynchrony: { stars: 5, isId: true },
    "Concurrency/Parallelism": { stars: 5, isId: true }
}
const langSkills = {
    Rust: { stars: 5, isId: true },
    OCaml: { stars: 2, isId: true },
    Python: { stars: 3, isId: true },
    TypeScript: { stars: 5, isId: true },
    HTML: { stars: 4, isId: true },
    "CSS": { stars: 4, isId: true }
}
const backend = {
    MySQL: { stars: 4, isId: true },
    Django: { stars: 3, isId: true },
    Axum: { ...allSkills.Axum, isId: true },
    Actix: { ...allSkills.Actix, isId: true },
    "REST API": { stars: 4, isId: true },
    Diesel: { ...allSkills.Diesel, isId: true }
};
const frontend = {
    React: { stars: 5, isId: true },
    "Redux Toolkit": { stars: 5, isId: true },
    Wasm: { ...allSkills.Wasm, isId: true },
    "RTK Query": { stars: 4, isId: true },
    "Vite": { stars: 4, isId: true },
    "Webpack": { stars: 3, isId: true },
    "Storybook": { stars: 3, isId: true }
}
const other = {
    Linux: { stars: 4, isId: true },
    Docker: { stars: 5, isId: true },
    Bash: { stars: 4, isId: true },
    Git: { stars: 5, isId: true },
    GitHub: { stars: 4, link: "https://github.com/10takla", isId: true },
    "GitHub Actions": { stars: 3, isId: true },
    GitLab: { stars: 4, isId: true },
    "GitLab CI/CD": { stars: 4, isId: true },
    Английский: { level: <abbr title="CEFR A2 — Elementary">A2</abbr>, stars: 2, en: "English", isId: true }
}

export const skills = [
    {
        block: "Rust",
        skills: allSkills
    },
    {
        block: <T ru="Языки программирования" en="Programming Languages" />,
        skills: langSkills,
    },
    {
        block: "Backend",
        skills: backend,
    },
    {
        block: "Frontend",
        skills: frontend,
    },
    {
        block: <T ru="Прочее" en="Other" />,
        skills: other,
    }
]
    .map(({ block, skills }) => ({
        block,
        skills: Object.entries(skills).map(([name, other]) => ({ name, ...other }))
    }));

import { Lang, T } from '../ui/ToggleLanguage/ToggleLanguage'


export type Book = [string, string, string] | [string, string] | [Record<Lang, [string, string]>, string]
export const books: Array<Book> = [
    [
        "Rust Atomics and Locks. Low-Level Concurrency in Practice",
        "https://marabos.nl/atomics/",
    ],
    // [
    //     {
    //         en: [
    //             "Clean Code: A Handbook of Agile Software Craftsmanship",
    //             "https://m.media-amazon.com/images/I/51E2055ZGUL._SL1000_.jpg",
    //         ],
    //         ru: [
    //             "Чистый код. Создание, анализ и рефакторинг",
    //             "https://ir.ozone.ru/s3/multimedia-c/wc1000/6189288048.jpg"
    //         ],

    //     },
    //     "https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882"
    // ],
    // [
    //     {
    //         en: [
    //             "Clean Architecture: A Craftsman's Guide to Software Structure and Design",
    //             "https://m.media-amazon.com/images/I/71stxGw9JgL._SL1500_.jpg",
    //         ],
    //         ru: [
    //             "Чистая архитектура: Искусство разработки программного обеспечения",
    //             "https://cdn1.ozone.ru/s3/multimedia-1/6892791841.jpg"
    //         ],

    //     },
    //     "https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164",
    // ],
    [
        "The rust Programming Language",
        "https://doc.rust-lang.org/book/"
    ],
    [
        "The rust Reference",
        "https://doc.rust-lang.org/reference/"
    ],

    [
        "Asynchronous Programming in rust",
        "https://rust-lang.github.io/async-book/"
    ],
    [
        "The Cargo Book",
        "https://doc.rust-lang.org/cargo/",
    ],
    [
        "The Little Book of rust Macros",
        "https://veykril.github.io/tlborm/"
    ],
    [
        "Rust 🦀 and WebAssembly 🕸",
        "https://rustwasm.github.io/book/"
    ],
    [
        "Rust By Example",
        "https://doc.rust-lang.org/rust-by-example/"
    ],
    [
        "The rustdoc book",
        "https://doc.rust-lang.org/rustdoc/what-is-rustdoc.html"
    ],
    [
        "Rust Compiler Development Guide",
        "https://rustc-dev-guide.rust-lang.org/"
    ],
    [
        "The `wasm-bindgen` Guide",
        "https://rustwasm.github.io/wasm-bindgen/"
    ],
    [
        "The Rust Performance Book",
        "https://nnethercote.github.io/perf-book/inlining.html"
    ],
    [
        "Learning Rust",
        "https://quinedot.github.io/rust-learning/index.html"
    ],
    [
        "The rustup book",
        "https://rust-lang.github.io/rustup/cross-compilation.html"
    ],
    [
        "The rustc book",
        "https://doc.rust-lang.org/rustc/what-is-rustc.html"
    ],
    [
        "The Rustonomicon",
        "https://doc.rust-lang.org/nomicon/arc-mutex/arc-layout.html"
    ],
    // [
    //     {
    //         en: [
    //             "Introduction to Algorithms",
    //             "https://m.media-amazon.com/images/I/61ZYxrQEpCL._SL1400_.jpg",
    //         ],
    //         ru: [
    //             "Алгоритмы. Построение и анализ",
    //             "https://ir.ozone.ru/s3/multimedia-u/wc1000/6315006402.jpg"
    //         ]
    //     },
    //     "https://www.amazon.com/Introduction-Algorithms-3rd-MIT-Press/dp/0262033844"
    // ],
];
