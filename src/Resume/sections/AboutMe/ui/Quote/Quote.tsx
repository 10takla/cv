import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef } from 'react';
import { HStack } from '/src/shared/ui/Stack';
import { classNames } from '/src/shared/lib/classNames/classNames';
import cls from './Quote.module.scss';
import { T } from '/src/Resume/shared/ui/ToggleLanguage/ToggleLanguage';

type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface QuoteProps extends ComponentProps<Component> {

}

const Quote = (props: QuoteProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        ...otherProps
    } = props;

    const quoteRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => quoteRef.current,
    );

    return (
        <blockquote
            className={classNames(cls.Quote, [className])}
            ref={quoteRef}
            {...otherProps}
        >
            <T
                ru="Мне важно создавать производительное и надёжное ПО, которое легко поддерживать и развивать. Люблю писать код, который не только летает, но и не разваливается через месяц. Rust — мой помощник в этом: строгий, но справедливый."
                en="I care about building high-performance and reliable software that’s easy to maintain and evolve. I love writing code that not only flies but also doesn’t fall apart a month later. Rust is my tool of choice for that — strict, but fair."
            />
        </blockquote>
    )
};

export default memo(forwardRef(Quote));