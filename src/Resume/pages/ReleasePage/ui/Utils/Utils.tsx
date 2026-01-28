import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef } from 'react';
import { HStack } from '/src/shared/ui/Stack';
import { classNames } from '/src/shared/lib/classNames/classNames';
import cls from './Utils.module.scss';
import ToggleLanguage from '/src/Resume/shared/ui/ToggleLanguage/ToggleLanguage';
import Pdf from '/src/Resume/shared/ui/Pdf/Pdf';

type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface UtilsProps extends ComponentProps<Component> {

}

const Utils = (props: UtilsProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        ...otherProps
    } = props;

    const utilsRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => utilsRef.current,
    );

    return (
        <HStack
            className={classNames(cls.Utils, [className])}
            ref={utilsRef}
            aria-current="true"
            {...otherProps}
        >
            <ToggleLanguage className={cls.toggleLanguage} />
            <Pdf className={cls.pdf} />
        </HStack>
    )
};

export default memo(forwardRef(Utils));