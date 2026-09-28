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
        <Stage title="Zoner" status="Developer framework">
            Write, test, and deploy in one workflow. A framework for building Solidity on Solizone, in the spirit of Foundry and Hardhat.
        </Stage>
        <Stage title="Solicamp" status="Basecamp app">
            Deploy straight from Logos Basecamp, with no separate toolchain to set up. Built on Solizone EVM and Zoner.
        </Stage>
    </div>
);

export const RoadmapContent = () => (
    <div className="flex flex-col gap-4">
        <Stage title="01 · Solizone EVM" status="Prototype live">
            Solidity executes on Solizone and blocks are published to Logos, where they reach finality.
        </Stage>
        <Stage title="02 · Zoner" status="Next">
            Compile contracts, run tests, and ship to a Logos zone from one toolchain.
        </Stage>
        <Stage title="03 · Solicamp" status="Coming soon">
            Write and deploy Solidity to Solizone directly inside Logos Basecamp.
        </Stage>
    </div>
);