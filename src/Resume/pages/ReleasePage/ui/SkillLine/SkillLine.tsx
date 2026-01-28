import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef, useContext, cloneElement } from 'react';
import { HStack, VStack } from '/src/shared/ui/Stack';
import { classNames } from '/src/shared/lib/classNames/classNames';
import cls from './SkillLine.module.scss';
import { skills } from '/src/Resume/shared/const/info';
import getRgbGradient from '/src/shared/lib/getRgbGradient/getRgbGradient';
import Tag from '/src/shared/ui/Stack/Tag/Tag';
import { langContext, T } from '/src/Resume/shared/ui/ToggleLanguage/ToggleLanguage';
import SvgStar from "shared/assets/icons/star.svg?react";
import { display } from 'html2canvas/dist/types/css/property-descriptors/display';

type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface SkillLineProps extends ComponentProps<Component> {

}

const SkillLine = (props: SkillLineProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        ...otherProps
    } = props;

    const skillLineRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => skillLineRef.current,
    );

    return (
        <HStack
            className={classNames(cls.SkillLine, [className])}
            ref={skillLineRef}
            tag="ol"
            {...otherProps}
        >
            {[
                <T ru="Продвинутый" en="Advanced" />,
                <T ru="Развивающийся" en="Developing" />,
                <T ru="Средний" en="Intermediate" />,
                <T ru="Начинающий" en="Beginner" />,
                <T ru="Новичок" en="Novice" />
            ].map((v, i) => ([v, i])).reverse().map(([v, i]) => (
                <HStack className={cls.lineBlock} key={i} align="center"
                    style={{
                        "--i": i,
                        "--color": getRgbGradient(5 - i, { saturation: 60 })
                    }}
                >
                    <div className={cls.line} />
                    <HStack tag="span" align="center">
                        <span>{v}</span>
                        <HStack tag="div" justify="center"
                            align="center"
                            style={{
                                "--i": i,
                                "--color": getRgbGradient(5 - i, { saturation: 40 })
                            }}
                        >
                            <SvgStar />
                            <b>{5 - i}</b>
                        </HStack>
                    </HStack>
                </HStack>
            ))}
        </HStack>
    )
};

export default memo(forwardRef(SkillLine));
