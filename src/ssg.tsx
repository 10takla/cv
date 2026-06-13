import "./index.scss"
import {
    Link, Route, Routes,
} from 'react-router-dom';
import { VStack } from './shared/ui/Stack';
import Resume, { ReleasePdfPage, SimplePdfPage, SimplePdfPageV2 } from "resume"

import { ViteReactSSG } from 'vite-react-ssg'

const sites = {
    release: <Resume />,
    // demo: <Resume demo={new DemoStruct(DemoMode.Demo)} />,
};

export const createRoot = ViteReactSSG(
    {
        routes: [
            {
                path: '/*',
                element:
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
                            <Route key={pageName} path={`${pageName}/*`} element={(() => {
                                if (typeof localStorage == 'undefined') return;
                                return page
                            })()} />
                        ))}
                    </Routes>
                ,
            },
            {
                path: '/release',
                element: <Resume />,
                children: [
                    { index: true },
                    {
                        path: 'pdf-content', element: <ReleasePdfPage />, children: [
                            { path: 'ru', element: <ReleasePdfPage /> },
                            { path: 'en', element: <ReleasePdfPage /> },
                        ]
                    },
                    {
                        path: 'simple-page', element: <SimplePdfPage />, children: [
                            { path: 'ru', element: <SimplePdfPage /> },
                            { path: 'en', element: <SimplePdfPage /> },
                        ]
                    },
                    {
                        path: 'simple-page/v2', element: <SimplePdfPageV2 />, children: [
                            { path: 'ru', element: <SimplePdfPageV2 /> },
                            { path: 'en', element: <SimplePdfPageV2 /> },
                        ]
                    },
                ],
            },
        ]
    },
    // function to have custom setups
    ({ router, routes, isClient, initialState }) => {
        // do something.
    },
)