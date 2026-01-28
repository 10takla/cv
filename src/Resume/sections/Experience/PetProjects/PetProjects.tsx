import { L, G } from "/src/Resume/sections/Experience/Experience";
import { T } from "/src/Resume/shared/ui/ToggleLanguage/ToggleLanguage";
import { HStack, VStack } from "/src/shared/ui/Stack";
import cls from "./PetProjects.module.scss"
import { ComponentProps, ElementRef, ForwardedRef, forwardRef, memo, ReactNode, useImperativeHandle, useRef } from "react";
import { classNames } from "/src/shared/lib/classNames/classNames";

const projects = [
    // {
    //     name: "abstract",
    //     descr: <T
    //         ru="PEG и LL парсеры для гибкой интеграции пользовательских грамматик с IDE."
    //         en="PEG and LL parsers for flexible integration of custom grammars with IDEs."
    //     />,
    //     githubLink: "abstract/tree/lsp"
    // },
    {
        name: "abstract-parser",
        descr: <>
            <abbr title="Parsing Expression Grammar">PEG</abbr>
            <T
                ru={<> парсер для гибкой интеграции пользовательских грамматик с <abbr title="Integrated Development Environment">IDE</abbr>.</>}
                en={<> parser for flexible integration of custom grammars with <abbr title="Integrated Development Environment">IDE</abbr>s.</>}
            />
        </>,
        githubLink: "abstract-parser-public"
    },
    {
        name: "std-reset",
        descr: <T
            ru="Множество переработанных реализаций стандартной библиотеки, а также новые решения для простого кодинга."
            en="Many reworked implementations from the standard library, as well as new solutions for easy coding."
        />
    },
    {
        name: "lf-structs",
        descr: <T
            ru="Различные реализации свободных блокировок и атомарных структур."
            en="Various implementations of lock-free and atomic data structures."
        />
    },
    // {
    //     name: "rust fork",
    //     descr: <T
    //         ru={<>Изменение атрибута <L><G>#[marker]</G></L> и <a href="https://doc.rust-lang.org/reference/items/implementations.html#trait-implementation-coherence">правила перекрытий</a>.</>}
    //         en={<>Changing <L><G>#[marker]</G></L> attribute and <a href="https://doc.rust-lang.org/reference/items/implementations.html#trait-implementation-coherence">overlap rules</a>.</>}
    //     />,
    //     githubLink: "rust"
    // },
    // {
    //     name: "production-project",
    //     descr: <T
    //         ru='Web-приложение: Платформа для публикации контента.'
    //         en='Web application: A platform for publishing content'
    //     />,
    //     githubLink: "ulbi"
    // }
];


type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface PetProjectsProps extends ComponentProps<Component> {
}

const PetProjects = (props: PetProjectsProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        ...otherProps
    } = props;

    const petProjectRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => petProjectRef.current,
    );

    return (
        <VStack className={classNames(cls.PetProjects, [className])} tag="ol" ref={petProjectRef} {...otherProps}>
            {projects.map(p => (
                <li key={p.name}>
                    <dt>
                        <a href={`https://github.com/10takla/${p.githubLink || p.name}`}>
                            <L>{p.name}</L>
                        </a>
                    </dt>
                    <dd>{p.descr}</dd>
                </li>
            ))}
        </VStack>
    )
}

export default memo(forwardRef(PetProjects));