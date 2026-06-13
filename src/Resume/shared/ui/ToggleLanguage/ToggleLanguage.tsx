import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef, useState, createContext, useContext, Dispatch, SetStateAction, ReactNode, useCallback, useEffect, useMemo, cloneElement, isValidElement } from 'react';
import { classNames } from '/src/shared/lib/classNames/classNames';
import cls from './ToggleLanguage.module.scss';
import Select from '/src/shared/ui/Kit/Select';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { HtmlProps } from '@react-three/drei/web/Html';
import { LANGUAGES } from '../../../../../configs/pages';
import { Flex } from '/src/shared/ui/Stack';

type Component = typeof Select;
type ElRef = ElementRef<Component> | null;

interface ToggleLanguageProps extends Omit<ComponentProps<Component>, "onChange" | "values"> {
    isNotNavigate?: boolean;
    map?: (lang: Lang | undefined, flagStyle: any) => ReactNode;
}

const ToggleLanguageTextComponent = (props: ToggleLanguageProps, ref: ForwardedRef<ElRef>) => {
    return (
        <ToggleLanguageBase
            map={(lang, flagStyle) => <>{lang === LANGUAGES.EN ? "English" : "Русский"}</>}
            {...props}
            ref={ref}
        />
    )
};

const ToggleLanguageFlagComponent = (props: ToggleLanguageProps, ref: ForwardedRef<ElRef>) => {
    return (
        <ToggleLanguageBase
            map={(lang, flagStyle) => (
                <img
                    src={lang === LANGUAGES.EN ? "https://flagcdn.com/gb.svg" : "https://flagcdn.com/ru.svg"}
                    alt={lang === LANGUAGES.EN ? "Eng" : "Рус"}
                    style={flagStyle}
                />
            )}
            {...props}
            ref={ref}
        />
    )
};

const ToggleLanguageBase = forwardRef((props: ToggleLanguageProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        isNotNavigate,
        map,
        ...otherProps
    } = props;

    const toggleLanguageRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => toggleLanguageRef.current,
    );

    const detailsRef = useRef<HTMLDetailsElement>(null);
    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, value: string) => {
        if (!isNotNavigate) {
            e.preventDefault();
            navigate(getLangPath(value), { replace: true });
        }
        setLang(value as Lang);
        if (detailsRef.current) {
            detailsRef.current.removeAttribute('open');
        }
    };

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
        const lang = location.pathname.split('/').filter(Boolean).pop();
        if (lang === LANGUAGES.RU || lang === LANGUAGES.EN) {
            setLang(lang as Lang)
            return lang as Lang
        }
    }, [location, isNotNavigate]);
    const navigate = useNavigate();

    const getLangPath = (value: string) => {
        const segments = location.pathname.split('/').filter(Boolean);
        if (segments.length > 0) {
            segments[segments.length - 1] = value;
            return '/' + segments.join('/') + location.search + location.hash;
        }
        return '/' + value;
    };

    const getLangUrl = (value: string) => {
        const path = getLangPath(value);
        const base = import.meta.env.BASE_URL || '/';
        return (base + path).replace(/\/+/g, '/');
    };

    const flagStyle = {
        // width: '20px',
        // height: '15px',
        width: "2em",
        objectFit: 'cover' as const,
        display: 'inline-block',
        verticalAlign: 'middle',

    };

    return (
        <>
            <details
                ref={detailsRef}
                className={classNames(cls.ToggleLanguage, [className])}
            >
                <Flex tag="summary" justify="center" align="center" style={{ cursor: 'pointer' }}>
                    {map?.(lang, flagStyle)}
                </Flex>
                <ul className={cls.optionsList}>
                    <li className={cls.optionItem}>
                        <a href={getLangUrl(LANGUAGES.RU)} className={cls.optionLink} onClick={(e) => handleLinkClick(e, LANGUAGES.RU)}>
                            <img
                                src="https://flagcdn.com/ru.svg"
                                alt="Русский"
                                style={flagStyle}
                            />
                            Русский
                        </a>
                    </li>
                    <li className={cls.optionItem}>
                        <a href={getLangUrl(LANGUAGES.EN)} className={cls.optionLink} onClick={(e) => handleLinkClick(e, LANGUAGES.EN)}>
                            <img
                                src="https://flagcdn.com/gb.svg"
                                alt="English"
                                style={flagStyle}
                            />
                            English
                        </a>
                    </li>
                </ul>
            </details>
        </>
    )
});

export const ToggleLanguageText = memo(forwardRef(ToggleLanguageTextComponent));
export const ToggleLanguageFlag = memo(forwardRef(ToggleLanguageFlagComponent));

export default ToggleLanguageFlag;

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
    const translatedChild = otherProps[lang] || children;
    const { ru, en, ...restProps } = otherProps;

    if (isValidElement(translatedChild)) {
        return cloneElement(translatedChild, restProps);
    }
    return <>{translatedChild}</>;
}


export type Lang = typeof LANGUAGES[keyof typeof LANGUAGES];
export const langContext = createContext<[(key: string) => string, [Lang, Dispatch<SetStateAction<Lang>>]]>([(key) => key, [LANGUAGES.EN, () => { }]])

export const LanguageProvider = ({ children, lang: l }: { children: ReactNode, lang: Lang }) => {
    const [lang, setLang] = useState<Lang>(l);

    const t = useCallback((key: string) => {
    }, [lang]);

    useEffect(() => {
        document.documentElement.setAttribute("lang", lang);
    }, [lang]);

    return (
        <langContext.Provider value={[t, [lang, setLang]]}>
            {children}
        </langContext.Provider>
    );
};