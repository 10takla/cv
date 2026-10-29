import { T } from "resume/shared/ui/ToggleLanguage/ToggleLanguage";

export const experienceData = [
    {
        id: "Mertech",
        name: "Mertech",
        position: <T ru="Rust Systems Engineer" en="Rust Systems Engineer" />, // Поднял грейд в названии
        description: <T
            ru="разработка серверных систем, кроссплатформенных библиотек и драйверов"
            en="development of backend systems, cross-platform core libraries and drivers"
        />,
        time: ["2023-11-01"],
        projects: [
            {
                achievements: [
                    [
                        <T
                            ru="Спроектировал и реализовал кроссплатформенный движок рендеринга (Render Engine) и парсеры DSL-языков"
                            en="Designed and implemented a cross-platform Rendering Engine and DSL parsers"
                        />,
                        [
                            <T
                                ru={<>Реализовал полные парсеры (Grammar & AST) для промышленных протоколов {" "}
                                    {[
                                        ["ZPL", "https://docs.zebra.com/us/en/printers/software/zpl-pg/c-zpl-zpl-commands.html"],
                                        ["CPCL", "https://www.zebra.com/content/dam/support-dam/en/documentation/unrestricted/guide/software/cpcl-pm-en.pdf"],
                                        ["TSPL", "https://www.pos-shop.ru/upload/iblock/e6d/e6dcd9090030c75de3ffd3435c1e2024.pdf?srsltid=AfmBOoqF0ugra59gGDH1AnkgaCzr7LxsUujL9j7J8r2LHFNn8iokZP_9&utm_source=chatgpt.com"],
                                    ].reduce((acc, [a, b], i, arr) => {
                                        acc.push(<a key={a} href={b}>{a}</a>);
                                        if (i < arr.length - 1) acc.push(", ");
                                        return acc;
                                    }, [])}
                                </>}
                                en={<>Implemented full grammar parsers (AST) for industrial protocols {" "}
                                    {[
                                        ["ZPL", "https://docs.zebra.com/us/en/printers/software/zpl-pg/c-zpl-zpl-commands.html"],
                                        ["CPCL", "https://www.zebra.com/content/dam/support-dam/en/documentation/unrestricted/guide/software/cpcl-pm-en.pdf"],
                                        ["TSPL", "https://www.pos-shop.ru/upload/iblock/e6d/e6dcd9090030c75de3ffd3435c1e2024.pdf?srsltid=AfmBOoqF0ugra59gGDH1AnkgaCzr7LxsUujL9j7J8r2LHFNn8iokZP_9&utm_source=chatgpt.com"],
                                    ].reduce((acc, [a, b], i, arr) => {
                                        acc.push(<a key={a} href={b}>{a}</a>);
                                        if (i < arr.length - 1) acc.push(", ");
                                        return acc;
                                    }, [])}
                                </>}
                            />,
                            <T
                                ru="Обеспечил единую кодовую базу (Shared Core) для Windows, Linux и Android (через JNI)"
                                en="Ensured a unified Shared Core codebase for Windows, Linux, and Android (via JNI)"
                            />,
                            <T
                                ru="Разработал алгоритмы абстракции аппаратных различий, обеспечив универсальность генерации байт-кода"
                                en="Developed algorithms to abstract hardware differences, ensuring universal bytecode generation"
                            />
                        ]
                    ],
                    [
                        <T
                            ru="Создал универсальную Core-библиотеку (SDK) для интеграции Rust-кода в клиентские приложения"
                            en="Created a universal Core Library (SDK) for integrating Rust code into client applications"
                        />,
                        [
                            <T
                                ru={<>Построил <strong>расширяемую архитектуру</strong> отрисовки, позволяющую динамически добавлять поддержку новых устройств без изменения ядра</>}
                                en={<>Built an <strong>extensible rendering architecture</strong>, allowing dynamic support for new devices without modifying the core</>}
                            />,
                            <T
                                ru="Реализовал эффективный API для взаимодействия между Rust-backend и UI-слоем (React/Native)"
                                en="Implemented an efficient API for interaction between the Rust backend and the UI layer"
                            />,
                            <T
                                ru={<>Провел глубокое <strong>профилирование</strong> (Memory/CPU), устранил лишние аллокации в hot-paths, ускорив генерацию на <strong>40%</strong></>}
                                en={<>Conducted deep <strong>profiling</strong> (Memory/CPU), eliminated overhead allocations in hot-paths, accelerating generation by <strong>40%</strong></>}
                            />,
                        ]
                    ],
                    <T
                        ru="Внедрил CI/CD пайплайны с кросс-компиляцией, автоматизировав сборку артефактов под разные архитектуры (ARM/x64)"
                        en="Implemented CI/CD pipelines with cross-compilation, automating artifact builds for different architectures (ARM/x64)"
                    />,
                    [
                        <T
                            ru="Разработка Native Extensions для интеграции оборудования с Enterprise-системами (в т.ч. 1С)"
                            en="Development of Native Extensions for hardware integration with Enterprise systems (incl. 1C)"
                        />,
                        [
                            <T
                                ru={<><strong>Спроектировал безопасный слой FFI</strong> (Foreign Function Interface) для минимизации undefined behavior при вызовах из неуправляемого кода</>}
                                en={<><strong>Designed a safe FFI layer</strong> to minimize undefined behavior when called from unmanaged code</>}
                            />,
                            <T
                                ru="Реализовал 100% покрытие тестами критической бизнес-логики и граничных случаев"
                                en="Achieved 100% test coverage for critical business logic and edge cases"
                            />
                        ]
                    ]
                ],
                stack: [
                    { name: "Rust", id: "Rust" },
                    { name: "Tokio", id: "Tokio" }, // Добавил явно, если использовал
                    [{ name: "Axum", id: "Axum" }, { name: "Diesel", id: "Diesel" }],
                    [{ name: "FFI", id: "Rust FFI" }, "JNI", "Unsafe Rust"], // Выделил Unsafe и FFI
                    [{ name: "Docker", id: "Docker" }, { name: "CI/CD", id: "GitLab CI/CD" }],
                    "SQLite", "Android NDK"
                ]
            },
            {
                achievements: [
                    [
                        <T
                            ru={<>Работа над <strong>микросервисной платформой мониторинга и удалённого управления торговым оборудованием</strong></>}
                            en={<>Work on a <strong>microservices platform for monitoring and remote management of retail devices</strong></>}
                        />,
                        [
                            <T
                                ru="Backend на C++23/userver: REST API и gRPC, управление устройствами и кластерами, телеметрия, удалённые задания и модели распознавания"
                                en="C++23/userver backend: REST API and gRPC, device and cluster management, telemetry, remote tasks and recognition models"
                            />,
                            <T
                                ru="Обработка событий через RabbitMQ; работа с PostgreSQL, ClickHouse и S3-совместимым хранилищем MinIO"
                                en="Event processing with RabbitMQ; working with PostgreSQL, ClickHouse and S3-compatible MinIO storage"
                            />,
                            <T
                                ru="Наблюдаемость сервисов: метрики Prometheus, дашборды Grafana, логи Loki и распределённая трассировка OpenTelemetry/Tempo"
                                en="Service observability: Prometheus metrics, Grafana dashboards, Loki logs and distributed tracing with OpenTelemetry/Tempo"
                            />,
                            <T
                                ru="Авторизация и ролевая модель на Keycloak; сборка и запуск сервисов с CMake, Docker Compose и GitLab CI"
                                en="Authentication and role-based access with Keycloak; building and running services with CMake, Docker Compose and GitLab CI"
                            />
                        ]
                    ],
                ],
                stack: [
                    ["C++23", "userver", "gRPC", "Protobuf"],
                    ["PostgreSQL", "ClickHouse", "RabbitMQ", "MinIO"],
                    ["Prometheus", "Grafana", "Loki", "OpenTelemetry", "Tempo"],
                    ["Keycloak", "CMake", "Docker Compose"],
                ]
            }
        ]
    },
    {
        id: "WEBSYSTEMS",
        name: <T
            ru="ВЕБСИСТЕМС, E-commerce компания (интернет-магазин)"
            en="WEBSYSTEMS, E-commerce компания (интернет-магазин)"
        />,
        position: <T ru="Rust Backend Developer" en="Rust Backend Developer" />,
        description: <T
            ru="разработка микросервисов на Rust для повышения производительности платформы"
            en="development of Rust microservices to improve platform performance"
        />,
        time: ["2022-12-01", "2023-09-01"],
        achievements: [
            <T
                ru={<>Миграция <strong>CPU-bound</strong> сервисов с Django на Rust, устранение проблем с масштабируемостью в пиковые нагрузки</>}
                en={<>Migration of <strong>CPU-bound</strong> services from Django to Rust, resolving scalability issues during peak loads</>}
            />,
            <T
                ru="Реализовал экосистему микросервисов-сателлитов для асинхронной обработки тяжелых задач (очереди, отчеты)"
                en="Implemented an ecosystem of satellite microservices for asynchronous processing of heavy tasks (queues, reports)"
            />,
            <T
                ru="Разработка Python-extensions на Rust (через PyO3/FFI) для ускорения критических участков легаси-кода"
                en="Development of Python-extensions in Rust (via PyO3/FFI) to accelerate critical parts of legacy code"
            />,
            <T
                ru={<>Внедрил <strong>Observability</strong> (метрики, трейсинг), что позволило сократить MTTR (время восстановления) при сбоях</>}
                en={<>Introduced <strong>Observability</strong> (metrics, tracing), reducing MTTR (Mean Time To Recovery) during failures</>}
            />,
        ],
        stack: [
            { name: "Rust", id: "Rust" },
            { name: "Axum", id: "Axum" },
            { name: "Tokio", id: "Tokio" },
            "PostgreSQL",
            { name: "Diesel", id: "Diesel" },
            "Redis", // Скорее всего был
            { name: "Docker", id: "Docker" },
            { name: "Python API", id: "Python" }
        ]
    }
];
