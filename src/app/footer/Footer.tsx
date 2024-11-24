// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import { APP_VERSION_LABEL } from "@/info.ts";
import { Button } from "primereact/button";
import { Fragment } from "react";

export const Footer = () => <>
    <footer
        className="px-4 py-6"
        style={ {
            backgroundColor: "#1c1c1e",
        } }
    >
        <div className="grid justify-content-start lg:justify-content-center">
            <FooterSection
                title="Vehicle Registry"
                links={ [
                    {
                        label: "Home",
                        href: "/",
                    },
                    {
                        label: "Vehicles",
                        href: "/vehicles",
                    },
                ] }
            />

            <FooterSection
                title="Open Source"
                links={ [
                    {
                        label: "API",
                        href: "https://github.com/tobiasbriones/vehicle-registry-api",
                    },
                    {
                        label: "Client",
                        href: "https://github.com/tobiasbriones/vehicle-registry-web",
                    },
                ] }
            />

            <FooterSection
                title="MSW Engineer"
                links={ [
                    {
                        label: "Engineer",
                        href: "https://mathsoftware.engineer",
                    },
                    {
                        label: "Tobias Briones",
                        href: "https://me.mathsoftware.engineer",
                    },
                ] }
            />

            <SocialSection />
        </div>

        <div className="grid justify-content-center">
            <LegalSection />

            <AboutSection />
        </div>
    </footer>
</>;

type SubheadingProps = {
    title: string,
    center?: boolean,
}

const Subheading = ({ title, center }: SubheadingProps) => <>
    <h5
        className={
            `p-0 m-0 text-sm ${ center ? "text-center" : "text-left" }`
        }
    >
        { title }
    </h5>
</>;

type FooterLink = {
    label: string,
    href: string,
}

type FooterSectionProps = {
    title: string,
    links: FooterLink[],
}

function FooterSection({ title, links }: FooterSectionProps) {
    const linkToItem = (link: FooterLink, idx: number) => <Fragment key={ idx }>
        <li className="flex flex-column my-2">
            <Button
                link
                className="w-10rem py-1 bg-transparent text-left text-sm"
                label={ link.label }
                onClick={ () => window.open(link.href, "_blank") }
            />
        </li>
    </Fragment>;

    return <>
        <section className="col-6 lg:col-4 xl:col-2 mb-3">
            <Subheading title={ title } />

            <ul className="list-none p-0 m-0">
                { links.map(linkToItem) }
            </ul>
        </section>
    </>;
}

function SocialSection() {
    type ItemProps = {
        title: string,
        label: string,
        icon: string,
        href: string,
    }

    const Item = ({ title, label, icon, href }: ItemProps) => <>
        <li className="flex flex-column mx-auto my-2">
            <div className="mt-4 mb-2 text-left text-sm">{ title }</div>

            <Button
                link
                className="w-10rem py-1 bg-transparent text-left"
                label={ label }
                icon={ `pi ${ icon }` }
                onClick={ () => window.open(href, "_blank") }
            />
        </li>
    </>;

    return <>
        <section className="col-6 lg:col-4 xl:col-2 mb-3">
            <Subheading title="Social" />

            <ul className="list-none p-0 m-0">
                <Item
                    title="Open Source"
                    label="GitHub"
                    icon="pi-github"
                    href="https://github.com/tobiasbriones"
                />
                <Item
                    title="Follow Tobias Briones to Stay Updated"
                    label="LinkedIn"
                    icon="pi-linkedin"
                    href="https://www.linkedin.com/in/tobiasbriones"
                />
            </ul>
        </section>
    </>;
}

function LegalSection() {
    return <>
        <section className="col-12 lg:col-4">
            <Subheading title="Legal" center />

            <h6 className="text-sm">Vehicle Registry</h6>
            <p className="text-sm">Copyright © 2024 Tobias Briones. All rights
                                   reserved.</p>

            <p className="text-sm">
                Licensed under the{ " " }
                <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/tobiasbriones/vehicle-registry-web/blob/main/LICENSE"
                >
                    MIT License
                </a>
                .
            </p>
        </section>
    </>;
}

function AboutSection() {
    return <>
        <section className="col-12 lg:col-4 text-center">
            <Subheading title="About" center />

            <p className="text-sm">Vehicle Registry: Entrance and Leave
                                   Management.</p>
            <p className="text-sm">{ APP_VERSION_LABEL }</p>
        </section>
    </>;
}
