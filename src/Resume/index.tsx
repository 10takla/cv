import { ComponentProps, ElementRef, ForwardedRef, forwardRef, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { HStack, VStack } from "shared/ui/Stack";
import { classNames } from "/src/shared/lib/classNames/classNames";
import cls from "./index.module.scss";
import { HtmlProps } from "@react-three/drei/web/Html";
import ReleasePage from "./pages/ReleasePage/ReleasePage";
import ToggleLanguage, { langContext, LanguageProvider } from "./shared/ui/ToggleLanguage/ToggleLanguage";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import SimplePage, { experienceData } from "./pages/SimplePage/SimplePage";
import pdfСls from './pages/PdfPage.module.scss';
import Pdf from "./shared/ui/Pdf/Pdf";
import {experienceData as experienceDataV2} from "./pages/SimplePage/SimplePageV2"

export const Chapter = forwardRef(({ className, children, head, ...otherProps }: { children: ReactNode } & HtmlProps, ref: ForwardedRef<ElementRef<typeof VStack>>) => {
    return (
        <VStack tag="section" className={classNames(cls.chapter, [className, "background"])} {...otherProps} ref={ref}>
            {head && <div className={classNames(cls.head)}><h2>{head}</h2></div>}
            {children}
        </VStack>
    )
})

export interface Demo {
    demo: DemoStuct
}

export class DemoStuct {
    mode: DemoMode

    constructor(demo: DemoMode = DemoMode.Release) {
        this.mode = demo;
    }

    isDemo(): boolean {
        return this.mode === DemoMode.Hide || this.mode === DemoMode.Demo;
    }

    isHide(): boolean {
        return this.mode === DemoMode.Hide;
    }
}

export enum DemoMode {
    Release,
    Hide,
    Demo,
}

type SelectivPartial<P, K extends keyof P> = Omit<P, K> & Partial<Pick<P, K>>;

const App = ({ demo = new DemoStuct(DemoMode.Release) }: SelectivPartial<Demo, "demo">) => {
    useEffect(() => {
        (async () => {
            try { if ('fonts' in document) await (document as any).fonts.ready } catch { }
            document.dispatchEvent(new Event('prerender-ready'))
        })()
    }, []);

    const pages = [
        ["release-page", <PdfPage id="release-page"><ReleasePage demo={demo} /></PdfPage>],
        ["simple-page", <PdfPage id="simple-page"><SimplePage experienceData={experienceData} demo={demo} /></PdfPage>],
        ["simple-page-v2", <PdfPage id="simple-page-v2"><SimplePage experienceData={experienceDataV2} demo={demo} /></PdfPage>]
    ]


    return (
        <HStack className={cls.App} style={{ gap: "0.5em" }} >
            <LanguageProvider lang="ru">
                <SiteName demo={demo} />
                <Routes>
                    {pages.map(([linkName, page]) => (
                        <>
                            <Route path={linkName} element={<Navigate to="ru" replace />} />
                            <Route path={`${linkName}/*`} element={page} />
                        </>
                    ))}
                    <Route index element={<Navigate to="ru" replace />} />
                    <Route
                        path="ru/*"
                        element={
                            <HStack style={{ gap: "1.2em" }}>
                                {
                                    pages.map(([linkName, page]) => {
                                        return (
                                            <VStack style={{ gap: "0.6em" }} >
                                                <Link to={`../${linkName}/ru`}
                                                    style={{
                                                        background: "white",
                                                        textAlign: "center",
                                                        padding: "0.4em"
                                                    }}
                                                >
                                                    {linkName}
                                                </Link>
                                                {page}
                                            </VStack>
                                        )
                                    })
                                }
                            </HStack>
                        } />
                </Routes>
            </LanguageProvider>
        </HStack>
    );
};

const PdfPage = ({ children, id }) => {
    return (
        <VStack
            className={classNames(pdfСls.pdfPage)}
            id={id}
        >
            {children}
            <HStack className={pdfСls.lang} aria-current="true">
                <ToggleLanguage className={cls.toggleLanguage} />
                <Pdf id={id} className={cls.pdf} />
            </HStack>
        </VStack>
    )
}

const SiteName = ({ demo }: Demo) => {
    const [_, [lang]] = useContext(langContext);

    const titleData: [HTMLTitleElement, string | null] | null = useMemo(() => {
        if (typeof document === 'undefined') return;
        const title = document.head.querySelector("title");
        if (!title) { return null }

        return [title, title.textContent]
    }, []);

    if (!titleData) { return null }

    useEffect(() => {
        const [title, preTitle] = titleData;
        title.textContent = `${lang == "ru" ? "Резюме" : "CV"}. ${demo.isDemo() ? (lang == "ru" ? "Имя Фамилия" : "First Last Name") : (lang == "ru" ? "Абакар Летифов" : "Abakar Letifov")}.pdf`;

        return () => {
            title.textContent = preTitle
        }
    }, [lang, titleData]);

    return null
};

export default App;