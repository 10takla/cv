import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef, useContext } from 'react';
import { HStack } from '/src/shared/ui/Stack';
import { classNames } from '/src/shared/lib/classNames/classNames';
import cls from './Pdf.module.scss';
import PdfSvg from "shared/assets/icons/pdf.svg?react"
import { Demo } from '/src/Resume';

type Component = "button";
type ElRef = ElementRef<Component> | null;

interface PdfProps extends ComponentProps<Component> {
    id: string,
}

const Pdf = (props: PdfProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        id,
        ...otherProps
    } = props;

    const pdfRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => pdfRef.current,
    );

    return (
        <button
            className={classNames(cls.Pdf, [className])}
            ref={pdfRef}
            onClick={() => {
                const element = document.getElementById(id);
                if (!element) return
                element.setAttribute("id", "pdf-content")
                window.print()
                element.setAttribute("id", id)
            }}
            {...otherProps}
        >
            <PdfSvg />
        </button>
    )
};

export default memo(forwardRef(Pdf));