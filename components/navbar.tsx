"use client"

import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarMenu,
    NavbarMenuToggle,
    NavbarItem,
    NavbarMenuItem,
} from "@nextui-org/navbar";
import {Button} from "@nextui-org/button";

import {Link} from "@nextui-org/link";

import {link as linkStyles} from "@nextui-org/theme";

import {siteConfig} from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import {ThemeSwitch} from "@/components/theme-switch";
import {
    PayPalFilledIcon,
} from "@/components/icons";


export const Navbar = () => {
    /*const searchInput = (
        <Input
            aria-label="Search"
            classNames={{
                inputWrapper: "bg-default-100",
                input: "text-sm",
            }}
            endContent={
                <Kbd className="hidden lg:inline-block" keys={["command"]}>
                    K
                </Kbd>
            }
            labelPlacement="outside"
            placeholder="Search..."
            startContent={
                <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0"/>
            }
            type="search"
        />
    );

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        console.log(event.currentTarget)
        console.log(formData)
        await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/admin/maxPlayers', {
            method: 'POST',
            body: formData,
        })

        window.location.reload();
    }

    let [click, setClicks] = useState(0);

    function countClicks() {
        setClicks(++click);
        console.log(click);
    }*/

    return (
        <NextUINavbar maxWidth="xl" position="sticky">
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                {/*<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<Logo />
						<p className="font-bold text-inherit">ACME</p>
					</NextLink>
				</NavbarBrand>*/}
                <Button
                    isExternal
                    as={Link}
                    className="flex sm:hidden text-sm font-normal text-default-600 bg-default-100"
                    href={siteConfig.links.sponsor}
                    /*startContent={<HeartFilledIcon className="text-danger"/>}*/
                    startContent={<PayPalFilledIcon/>}
                    variant="flat"
                    //onClick={countClicks}
                >
                    Bezahlen
                </Button>
                <ul className="sm:flex hidden sm:visible sm:gap-4 justify-start ml-2">
                    {siteConfig.navItems.map((item) => (
                        <NavbarItem key={item.href}>
                            <NextLink
                                className={clsx(
                                    linkStyles({color: "foreground"}),
                                    "data-[active=true]:text-primary data-[active=true]:font-medium"
                                )}
                                color="foreground"
                                href={item.href}
                            >
                                {item.label}
                            </NextLink>
                        </NavbarItem>
                    ))}
                </ul>
            </NavbarContent>

            <NavbarContent
                className="flex"
                justify="end"
            >
                <NavbarItem>
                    <Button
                        isExternal
                        as={Link}
                        className="flex invisible sm:visible text-sm font-normal text-default-600 bg-default-100"
                        href={siteConfig.links.sponsor}
                        /*startContent={<HeartFilledIcon className="text-danger"/>}*/
                        startContent={<PayPalFilledIcon/>}
                        variant="flat"
                        //onClick={countClicks}
                    >
                        Bezahlen
                    </Button>
                </NavbarItem>
                <NavbarItem className="hidden sm:flex gap-2">
                    <ThemeSwitch/>
                </NavbarItem>


            </NavbarContent>

            <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">

                <ThemeSwitch/>
                <NavbarMenuToggle/>
            </NavbarContent>

            <NavbarMenu>
                {/*{searchInput}*/}
                <div className="mx-4 mt-2 gap-2">
                    {siteConfig.navMenuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <NextLink href={item.href} color={
                                index === 2
                                    ? "primary"
                                    : index === siteConfig.navMenuItems.length - 1
                                        ? "danger"
                                        : "foreground"
                            }
                            >
                                {item.label}
                            </NextLink>
                            {/*<Link
								color={
									index === 2
										? "primary"
										: index === siteConfig.navMenuItems.length - 1
										? "danger"
										: "foreground"
								}
								href={item.href}
								size="lg"
							>
								{item.label}
							</Link>*/}
                        </NavbarMenuItem>
                    ))}
                </div>
            </NavbarMenu>
        </NextUINavbar>
    );
};
