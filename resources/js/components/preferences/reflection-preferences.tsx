import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Flex } from '@radix-ui/themes';
import { Button } from '@/components/ui/button';
import { RadioCardsRoot, RadioCardsItem } from '@/components/ui/radio-cards';

interface ReflectionPreferencesProps {
    niche: string;
    tone: string;
    nicheOptions: Record<string, string>;
    toneOptions: Record<string, string>;
    onNicheChange: (value: string) => void;
    onToneChange: (value: string) => void;
    onSubmit?: () => void;
}

export default function ReflectionPreferences({
    niche,
    tone,
    nicheOptions,
    toneOptions,
    onNicheChange,
    onToneChange,
    onSubmit,
}: ReflectionPreferencesProps) {


    return (
        <Card className="overflow-hidden border-border shadow-sm">
            <CardHeader className="border-b border-border">
                <CardTitle className="text-xl text-foreground">Reflection Preferences</CardTitle>
                <CardDescription>Customize your daily reflection prompts</CardDescription>
            </CardHeader>

            <CardContent className="p-6">
                <Flex direction="column" gap="6">
                    <Flex direction="column" gap="4">
                    <Label className="text-lg font-semibold text-foreground">Topic Focus</Label>
                        <p className="mb-2 text-sm text-muted-foreground">Choose what areas you'd like to focus on in your reflections</p>

                        <div className="hidden md:block">
                                <RadioCardsRoot value={niche} onValueChange={onNicheChange} columns={{ initial: "1", sm: "2" }}>
                                    {Object.entries(nicheOptions).map(([key, value]) => (
                                        <RadioCardsItem key={key} value={value}
                                        variant="secondary"
                                        >
                                            <Flex direction="column" width="100%">
                                                <span className="text-foreground font-bold">{value}</span>
                                            </Flex>
                                        </RadioCardsItem>
                                    ))}
                                </RadioCardsRoot>
                        </div>

                        <div className="md:hidden">
                            <Select name="niche" value={niche} onValueChange={onNicheChange}>
                                <SelectTrigger className="border-border">
                                    <SelectValue placeholder="Select a topic focus" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(nicheOptions).map(([key, value]) => (
                                        <SelectItem key={key} value={value}>
                                            {value}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </Flex>

                    {/* Reflection Style Section */}
                    <Flex direction="column" gap="4">
                        <Label className="text-lg font-semibold text-foreground">Reflection Style</Label>
                        <p className="mb-2 text-sm text-muted-foreground">Select the tone and approach for your daily prompts</p>

                        {/* Desktop: Radio Cards */}
                        <div className="hidden md:block">
                                <RadioCardsRoot value={tone} onValueChange={onToneChange} columns={{ initial: "1", sm: "2" }}>
                                    {Object.entries(toneOptions).map(([key, value]) => (
                                        <RadioCardsItem key={key} value={value} variant="secondary"
                                        >
                                            <Flex direction="column" width="100%">
                                                <span className="font-bold text-foreground">{value}</span>
                                            </Flex>
                                        </RadioCardsItem>
                                    ))}
                                </RadioCardsRoot>
                        </div>

                        <div className="md:hidden">
                            <Select name="tone" value={tone} onValueChange={onToneChange}>
                                <SelectTrigger className="border-border">
                                    <SelectValue placeholder="Select a reflection style" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(toneOptions).map(([key, value]) => (
                                        <SelectItem key={key} value={value}>
                                            {value}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <Flex className="md:hidden" align="end" justify="end">
                            <Button
                                type="submit"
                                onClick={onSubmit}
                                className="justify-self-end mt-4"
                            >
                                Save Preferences
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            </CardContent>
        </Card>
    );
}
