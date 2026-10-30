import type { ReactNode } from "react";

const Stage = ({
    title,
    status,
    children,
}: {
    title: string;
    status: string;
    children: ReactNode;
}) => (
    <div className="flex flex-col gap-3 rounded-3xl border border-border/15 bg-primary/[0.06] p-5 md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-serif text-3xl italic leading-none md:text-4xl">{title}</h2>
            <span className="rounded-full border border-border/20 px-3 py-1 text-xs font-medium text-foreground/70">
                {status}
            </span>
        </div>
        <p className="leading-relaxed text-foreground/80 text-pretty md:text-lg">{children}</p>
    </div>
);

export const AboutContent = () => (
    <div className="flex flex-col gap-4">
        <p className="mb-2 text-lg font-medium text-foreground/80 text-pretty md:text-xl">
            Three pieces that take Solidity from your editor to Logos finality.
        </p>
        <Stage title="Solizone EVM" status="Execution layer">
            Run Solidity on a Logos zone. Contracts execute on Solizone, and every block is published to Logos for ordering, data availability, and finality.
        </Stage>
        <Stage title="Zoner" status="Foundry companion">
            Foundry's workflow, pointed at Solizone. Start a node, deploy with forge, and check publication from one command-line tool.
        </Stage>
        <Stage title="Solicamp" status="Basecamp app">
            Remix for Logos. Write, compile, deploy and test Solidity inside Basecamp, then publish to Bedrock when you choose. Built on Solizone EVM.
        </Stage>
    </div>
);

export const RoadmapContent = () => (
    <div className="flex flex-col gap-4">
        <Stage title="01 · Solizone EVM" status="Prototype live">
            Solidity executes on Solizone and blocks are published to Logos, where they reach finality.
        </Stage>
        <Stage title="02 · Zoner" status="Prototype live">
            Foundry's workflow, pointed at Solizone, from one command-line tool.
        </Stage>
        <Stage title="03 · Solicamp" status="In progress">
            Write, deploy and test Solidity inside Logos Basecamp. Catalog release is underway.
        </Stage>
    </div>
);