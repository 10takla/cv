import { ComponentProps, ElementRef, ForwardedRef, forwardRef, memo, useContext, useImperativeHandle, useRef } from 'react';
import { langContext, T } from '/src/Resume/shared/ui/ToggleLanguage/ToggleLanguage';
import { classNames } from '/src/shared/lib/classNames/classNames';
import { HStack, VStack } from '/src/shared/ui/Stack';
import cls from './AboutMe.module.scss';
import FerrisSvg from "/src/Resume/shared/assets/imgs/Ferris.svg?react"
import Learning from '../Learning/Learning';
import { Demo } from '/src/Resume';
import Quote from './ui/Quote/Quote';

type Component = typeof VStack;
type ElRef = ElementRef<Component> | null;

interface AboutMeProps extends ComponentProps<Component>, Demo {
}

const AboutMe = (props: AboutMeProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        demo,
        ...otherProps
    } = props;

    const AboutMeRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => AboutMeRef.current,
    );

    const [t] = useContext(langContext);

    return (
        <VStack
            className={classNames(cls.AboutMe, [className])}
        >
            <p>
                <HStack
                    tag="span" align="center"
                    style={{
                        display: "inline-flex",
                        "font-size": "1.2em"
                    }}
                >
                    <FerrisSvg style={{
                        // fill: "white",
                        width: "1.4em",
                    }} />
                    <u>
                        Rust<T ru="-разработчик" en=" Developer" />
                    </u>
                </HStack>
                {", "}
                23 <T ru="года" en="years old" />
                {", GMT+3; "}
                <T
                    ru="удалённая работа (полная или частичная занятость); открыт к любому графику работы."
                    en="remote work (full-time or part-time); open to any work schedule."
                />
            </p>
            {/* <Learning /> */}
            <Quote
                style={{
                    "border-radius": ".6em",
                    "border": "0.24em solid rgba(152, 188, 231, 0.908)",
                }}
            />
        </VStack>
    )
};

export default memo(forwardRef(AboutMe));