import "./index.scss"
import { createRoot } from 'react-dom/client';
import {
    BrowserRouter,
    Link, Route, Routes,
} from 'react-router-dom';
import Resume, { DemoMode, DemoStuct as DemoStruct } from "./Resume"
import { Suspense } from "react";
import { VStack } from "./shared/ui/Stack";

const root = createRoot(document.getElementById('root')!);

export const sites = {
    release: <Resume />,
    demo: <Resume demo={new DemoStruct(DemoMode.Demo)} />,
};

root.render(
    <Suspense>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Routes>
                <Route
                    path="/"
                    element={(
                        <VStack>
                            {Object.keys(sites).map((pageName) => (
                                <Link key={pageName} to={pageName}>{pageName}</Link>
                            ))}
                        </VStack>
                    )}
                />
                {Object.entries(sites).map(([pageName, page]) => (
                    <Route key={pageName} path={`${pageName}/*`} element={page} />
                ))}
            </Routes>
        </BrowserRouter>
    </Suspense>
);