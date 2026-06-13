import PrivateConnectivitySvg from "./private_connectivity.svg?react"
import ConstructionSvg from "./construction.svg?react"
import { T, t } from "/src/Resume/shared/ui/ToggleLanguage/ToggleLanguage"
import { useEffect, useId, useRef } from "react";
import { HStack, VStack } from "/src/shared/ui/Stack";
import { backgroundClip } from "html2canvas/dist/types/css/property-descriptors/background-clip";
import cls from '../SimplePage.module.scss';
import { BackgroundInverted } from "/src/shared/ui/Kit/Button/Button.stories";

export const MicroSaaS = () => (
    <>
        <HStack style={{
            justifyContent: "space-between"
        }}>
            {"ZTC Renderer — "}
            <T
                ru="облачный сервис предпросмотра и проверки печатных шаблонов для термопринтеров."
                en="cloud service for previewing and validating thermal printer label templates."
            />
            <HStack style={{
                gap: "0.2em",
            }}>
                <div style={{ display: "inline-flex", width: "2em", boxSizing: "border-box" }} title={t({ ru: "Проприетарный / Закрытый исходный код", en: "Proprietary / Closed Source" })}><PrivateConnectivitySvg /></div>
                {/* <div style={{ display: "inline-flex", }} title={t({ ru: "В разработке", en: "Under development" })}><ConstructionSvg /></div> */}
            </HStack>
        </HStack>
        <VStack style={{ width: "100%" }}>
            <Diagram diagram={`
                    flowchart LR
                    F["Frontend<br/>React/OCaml (Melange)"]
                    R -.->|callback| B
                    B -.->|invoice API| R
                    F <-->|redirect| R[[Robokassa]]
                    F -->|REST API| B[Backend<br/>Axum]
                    F -->|OIDC| K[[Keycloak]]
                    K -.->|"OIDC JWKS"| B
                    B ==>|cache| Redis[(Redis)]
                    B ==>|sqlx| D[(PostgreSQL)]
                    K ==> D
                    D -->|backup| BK
                    BK[Restic] --> M[(MinIO)]
                `}
            />
            <span><b>Monitoring: </b>
                Grafana,
                Prometheus,
                Alertmanager,
                Loki,
                GlitchTip
            </span>
            <span><b>Dev: </b>
                Linux,
                Bash,
                Git/Github Actions,
                Docker/Docker Compose
            </span>
        </VStack>
    </>
)

export const MicroSaaSV2 = () => (
    <>
        {"ZTC Renderer — "}
        <T
            ru="облачный сервис предпросмотра и проверки печатных шаблонов для термопринтеров."
            en="cloud service for previewing and validating thermal printer label templates."
        />
        <VStack style={{ width: "100%" }}>
            <Diagram diagram={`
                    flowchart LR
                    F["Frontend<br/>React/OCaml (Melange)"]
                    R -.->|callback| B
                    B -.->|invoice API| R
                    F <-->|redirect| R[[Robokassa]]
                    F -->|REST API| B[Backend<br/>Axum]
                    F -->|OIDC| K[[Keycloak]]
                    K -.->|"OIDC JWKS"| B
                    B ==>|cache| Redis[(Redis)]
                    B ==>|sqlx| D[(PostgreSQL)]
                    K ==> D
                    D -->|backup| BK
                    BK[Restic] --> M[(MinIO)]
                    F -.->|error monitoring| G[[GlitchTip]]
                    B -.->|error monitoring| G
                `}
            />
            <div style={{ fontSize: "0.9em", marginTop: "0.5em" }}>
                <ul style={{ paddingLeft: "1.2em", margin: 0 }}>
                    <li>
                        <strong>Infrastructure & DevOps:</strong> <T
                            ru={<>Полный цикл <abbr title={t({ ru: "Continuous Integration / Continuous Delivery — непрерывная интеграция и доставка", en: "Continuous Integration / Continuous Delivery" })}>CI/CD</abbr> (GitHub Actions), контейнеризация (Docker Compose), автоматические бэкапы (Restic -&gt; MinIO).</>}
                            en={<>Full <abbr title={t({ ru: "Continuous Integration / Continuous Delivery", en: "Continuous Integration / Continuous Delivery" })}>CI/CD</abbr> cycle (GitHub Actions), containerization (Docker Compose), automated backups (Restic -&gt; MinIO).</>}
                        />
                    </li>
                    <li>
                        <strong>Observability:</strong> <T
                            ru="Настроен стек мониторинга (Prometheus, Grafana, Loki) для сбора метрик и логов в реальном времени + GlitchTip для трекинга ошибок."
                            en="Deployed observability stack (Prometheus, Grafana, Loki) for real-time metrics and logs + GlitchTip for error tracking."
                        />
                    </li>
                    <li>
                        <strong>Security:</strong> <T
                            ru={<>Централизованная аутентификация через Keycloak (<abbr title={t({ ru: "OpenID Connect — стандарт аутентификации на базе протокола OAuth 2.0", en: "OpenID Connect" })}>OIDC</abbr>), безопасная работа с платежами (Robokassa).</>}
                            en={<>Centralized authentication via Keycloak (<abbr title={t({ ru: "OpenID Connect", en: "OpenID Connect" })}>OIDC</abbr>), secure payment processing integration (Robokassa).</>}
                        />
                    </li>
                </ul>
            </div>
        </VStack>
    </>
)

export const Diagram = ({ diagram, ...props }: { diagram: string } & React.HTMLAttributes<HTMLDivElement>) => {
    const hostRef = useRef<HTMLDivElement>(null);
    // Генерируем уникальный ID для этого экземпляра компонента
    const uniqueId = useId().replace(/:/g, "");

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                const mermaid = (await import(
                    "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs"
                )).default;

                mermaid.initialize({
                    startOnLoad: false,
                    // Дополнительно можно указать тему или настройки безопасности
                    securityLevel: 'loose',
                });

                if (cancelled || !hostRef.current) return;

                // Используем уникальный ID здесь
                const { svg } = await mermaid.render(`mermaid-${uniqueId}`, diagram);

                if (!cancelled && hostRef.current) {
                    hostRef.current.innerHTML = svg;

                    const svgEl = hostRef.current.querySelector("svg");
                    if (svgEl) {
                        svgEl.style.width = "100%";
                        svgEl.style.height = "100%";
                    }
                }
            } catch (error) {
                console.error("Mermaid render error:", error);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [diagram, uniqueId]); // Добавьте diagram в зависимости, чтобы график обновлялся при изменении текста

    return <div {...props} ref={hostRef} />;
}