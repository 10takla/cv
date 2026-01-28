import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef, ReactNode, useContext, ElementType, isValidElement, cloneElement } from 'react';
import { HStack, VStack } from '/src/shared/ui/Stack';
import { classNames } from '/src/shared/lib/classNames/classNames';
import cls from './Block.module.scss';
import { langContext, T } from '../ToggleLanguage/ToggleLanguage';

type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

type Variant = {
    tag: ElementType,
    value: ReactNode
} | {
    new: ReactNode
}

interface BlockProps extends ComponentProps<Component> {
    head: Variant
}

const Block = (props: BlockProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        children,
        head,
        ...otherProps
    } = props;

    const blockRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => blockRef.current,
    );

    return (
        <VStack
            tag="section"
            className={classNames(cls.Block, [className])}
            ref={blockRef}
            {...otherProps}
        >
            {(() => {
                if (!head) return null;
                let element: ReactNode;
                if (typeof head === "object" && "new" in head) {
                    element = head.new
                } else if (typeof head === "object" && "tag" in head && "value" in head) {
                    const { tag: Tag, value } = head;
                    element =
                        cloneElement(<Tag>{value}</Tag>, {
                            className: cls.head
                        })
                }
                return element
            })()}
            {children}
        </VStack>
    )
};

export default memo(forwardRef(Block));
