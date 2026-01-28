import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef, useContext } from 'react';
import { HStack } from '/src/shared/ui/Stack';
import { classNames } from '/src/shared/lib/classNames/classNames';
import cls from './Pdf.module.scss';
import { langContext, T } from '../ToggleLanguage/ToggleLanguage';
import PdfSvg from "shared/assets/icons/pdf.svg?react"
// import html2pdf from 'html2pdf.js';
import { Demo } from '/src/Resume';

type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface PdfProps extends ComponentProps<Component>, Demo {

}

const Pdf = (props: PdfProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        demo,
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
            {...otherProps}
        >
            <PdfSvg />
        </button>
    )
};

export default memo(forwardRef(Pdf));