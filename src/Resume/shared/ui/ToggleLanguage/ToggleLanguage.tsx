import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef, useState, createContext, useContext, Dispatch, SetStateAction, ReactNode, useCallback, useEffect, useMemo, cloneElement } from 'react';
import { classNames } from '/src/shared/lib/classNames/classNames';
import cls from './ToggleLanguage.module.scss';
import Select from '/src/shared/ui/Kit/Select';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { HtmlProps } from '@react-three/drei/web/Html';

type Component = typeof Select;
type ElRef = ElementRef<Component> | null;

interface ToggleLanguageProps extends Omit<ComponentProps<Component>, "onChange" | "values"> {
    isNotNavigate?: boolean
}

const ToggleLanguage = (props: ToggleLanguageProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        isNotNavigate,
        ...otherProps
    } = props;

    const toggleLanguageRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => toggleLanguageRef.current,
    );

    const [_, [__, setLang]] = useContext(langContext)


    const location = useLocation();

    // useEffect(() => {
    //     if (isNotNavigate) return
    //     const lang = location.pathname.split('/').pop();
    //     if (lang == "ru" || lang == "en") {
    //         setLang(lang);
    //     }
    // }, [location, isNotNavigate]);
    const lang = useMemo(() => {
        if (isNotNavigate) return
        const lang = location.pathname.split('/').pop();
        if (lang == "ru" || lang == "en") {
            setLang(lang)
            return lang
        }
    }, [location, isNotNavigate]);

    const navigate = useNavigate();

    return (
        <>
            {/* {!isNotNavigate && <Routes>
                <Route index element={<Navigate to={lang} replace />} />
            </Routes>} */}
            <Select
                className={classNames(cls.ToggleLanguage, [className])}
                ref={toggleLanguageRef}
                values={[["ru", "Рус"], ["en", "Eng"],]}
                value={lang}
                defaultValue={lang}
                {...otherProps}
                onChange={(value) => {
                    !isNotNavigate && navigate(value, { replace: true });
                    setLang(value);
                }}
            />
        </>
    )
};

export default memo(forwardRef(ToggleLanguage));

type LangProps = {
    [key in Lang | "children"]?: ReactNode | string;
};
interface TProps extends HtmlProps, LangProps {
}

export const t = (otherProps: Record<Lang, string>) => {
    const [_, [lang]] = useContext(langContext);
    return otherProps[lang]
}


export const T = ({ children, ...otherProps }: TProps) => {
    const [_, [lang]] = useContext(langContext)
    let translatedChild = otherProps[lang] || children;
    if (typeof translatedChild === "string") {
        translatedChild = <>{translatedChild}</>;
    }
    return cloneElement(translatedChild, otherProps)
}


export type Lang = "en" | "ru"
export const langContext = createContext<[(key: string) => string, [Lang, Dispatch<SetStateAction<Lang>>]]>([(key) => key, ["en", () => { }]])

export const LanguageProvider = ({ children, lang: l }: { children: ReactNode, lang: Lang }) => {
    const [lang, setLang] = useState<Lang>(l)

    const t = useCallback((key: string) => {
    }, [lang]);

    useEffect(() => {
        document.documentElement.setAttribute("lang", lang);
    }, [lang]);

    return (
        <langContext.Provider value={[t, [lang, setLang]]}>
            {children}
        </langContext.Provider>
    )
}