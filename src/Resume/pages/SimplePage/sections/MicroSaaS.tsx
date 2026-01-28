import PrivateConnectivitySvg from "./private_connectivity.svg?react"
import ConstructionSvg from "./construction.svg?react"
import { T, t } from "/src/Resume/shared/ui/ToggleLanguage/ToggleLanguage"
import { useEffect, useId, useRef } from "react";
import { HStack, VStack } from "/src/shared/ui/Stack";
import { backgroundClip } from "html2canvas/dist/types/css/property-descriptors/background-clip";
import cls from '../SimplePage.module.scss';
import { BackgroundInverted } from "/src/shared/ui/Kit/Button/Button.stories";

export default () => {
    return <>
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
                <div style={{ display: "inline-flex", width: "2em", boxSizing: "border-box" }} title={t({ ru: "Приватно", en: "Private" })}><PrivateConnectivitySvg /></div>
                <div style={{ display: "inline-flex", }} title={t({ ru: "В разработке", en: "Under development" })}><ConstructionSvg /></div>
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
                Sentry
            </span>
            <span><b>Dev: </b>
                Linux,
                Bash,
                Git/Github Actions,
                Docker/Docker Compose
            </span>
        </VStack>
    </>
}

const Diagram = ({ diagram, ...props }: { diagram: string } & React.HTMLAttributes<HTMLDivElement>) => {
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