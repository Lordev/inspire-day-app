import { Heading, Flex } from '@radix-ui/themes';


export default function DashboardHeader({title}: {title?: string}) {
    return (
        <Flex align="center" justify="between" className="h-[10vh]">
            <Heading variant="accent" size="lg" weight="bold">
                {title || "Your Dashboard"}
            </Heading>
        </Flex>
    );
}
