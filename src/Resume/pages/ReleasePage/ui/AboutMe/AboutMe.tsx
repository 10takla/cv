import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef } from 'react';
import { HStack } from '/src/shared/ui/Stack';
import { classNames } from '/src/shared/lib/classNames/classNames';
import cls from './AboutMe.module.scss';
import { T } from '/src/Resume/shared/ui/ToggleLanguage/ToggleLanguage';
import FerrisSvg from "/src/Resume/shared/assets/imgs/Ferris.svg?react"

type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface AboutMeProps extends ComponentProps<Component> {

}

const AboutMe = (props: AboutMeProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        ...otherProps
    } = props;

    const aboutMeRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => aboutMeRef.current,
    );

    return (
        <p
            className={classNames(cls.AboutMe, [className])}
            ref={aboutMeRef}
            {...otherProps}
        >
            {(() => {
                const birth = new Date("2002-04-18");
                const today = new Date();

                let age = today.getFullYear() - birth.getFullYear();
                const m = today.getMonth() - birth.getMonth();

                if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
                    age--;
                }

                return age;
            })()} <T ru="года" en="years old" />
            {", GMT+3; "}
            <T
                ru="удалённая работа (полная или частичная занятость); открыт к любому графику работы."
                en="remote work (full-time or part-time); open to any work schedule."
            />
        </p>
    )
};

export default memo(forwardRef(AboutMe));