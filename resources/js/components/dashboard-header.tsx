import { Heading, Flex } from '@radix-ui/themes';


export default function DashboardHeader() {
    return (
        <Flex align="center" justify="between" className="h-[10vh]">
            <Heading variant="accent" size="lg" weight="bold">
                Daily Reflection
            </Heading>
        </Flex>
    );
}
