import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Flex } from '@radix-ui/themes';
import { Button } from '@/components/ui/button';

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

                        <div className="hidden grid-cols-2 gap-4 md:grid">
                            {Object.entries(nicheOptions).map(([key, value]) => (
                                <div
                                    key={key}
                                    onClick={() => onNicheChange(value)}
                                    className={`cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-md ${
                                        niche === value
                                            ? 'border-accent-1 bg-accent-1/10 shadow-sm'
                                            : 'border-border bg-card hover:border-accent-1/50'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-foreground">{value}</span>
                                        <div
                                            className={`h-4 w-4 rounded-full border-2 ${
                                                niche === value ? 'border-accent-1 bg-accent-1' : 'border-muted-foreground/30'
                                            }`}
                                        >
                                            {niche === value && (
                                                <div className="h-full w-full scale-50 rounded-full bg-background"></div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
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

                        {/* Desktop: Clickable Cards */}
                        <div className="hidden grid-cols-2 gap-4 md:grid">
                            {Object.entries(toneOptions).map(([key, value]) => (
                                <div
                                    key={key}
                                    onClick={() => onToneChange(value)}
                                    className={`cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-md ${
                                        tone === value
                                            ? 'border-accent-3 bg-accent-3/10 shadow-sm'
                                            : 'border-border bg-card hover:border-accent-3/50'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-foreground">{value}</span>
                                        <div
                                            className={`h-4 w-4 rounded-full border-2 ${
                                                tone === value ? 'border-accent-3 bg-accent-3' : 'border-muted-foreground/30'
                                            }`}
                                        >
                                            {tone === value && (
                                                <div className="h-full w-full scale-50 rounded-full bg-background"></div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
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
