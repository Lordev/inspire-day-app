<?php

namespace Tests\Unit\Services;

use Tests\TestCase;
use App\Models\User;
use App\Models\Prompt;
use App\Services\StatisticsService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Carbon\Carbon;

class StatisticsServiceTest extends TestCase
{
    use RefreshDatabase;

    private StatisticsService $statisticsService;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->statisticsService = new StatisticsService();
        $this->user = User::factory()->create();
    }

    private function createPromptsWithResponses($count, $response = 'Test response')
    {
        return Prompt::factory()->count($count)->create([
            'user_id' => $this->user->id,
            'response' => $response
        ]);
    }

    private function createPromptsWithoutResponses($count)
    {
        return Prompt::factory()->count($count)->create([
            'user_id' => $this->user->id,
            'response' => null
        ]);
    }

    public function test_get_user_statistics_returns_correct_totals()
    {
        // Create prompts with responses
        $this->createPromptsWithResponses(5);

        // Create prompts without responses
        $this->createPromptsWithoutResponses(2);

        $stats = $this->statisticsService->getUserStatistics($this->user);

        $this->assertEquals(7, $stats['totalReflections']);
        $this->assertIsInt($stats['averageReflectionLength']);
        $this->assertIsString($stats['mostActiveDay']);
    }

    public function test_get_user_statistics_calculates_average_length_correctly()
    {
        // Create prompts with known response lengths
        Prompt::factory()->create([
            'user_id' => $this->user->id,
            'response' => 'Hello' // 5 characters
        ]);

        Prompt::factory()->create([
            'user_id' => $this->user->id,
            'response' => 'Hello World' // 11 characters
        ]);

        $stats = $this->statisticsService->getUserStatistics($this->user);

        // Average should be (5 + 11) / 2 = 8
        $this->assertEquals(8, $stats['averageReflectionLength']);
    }

    public function test_get_user_statistics_returns_zero_average_when_no_responses()
    {
        // Create prompts without responses
        $this->createPromptsWithoutResponses(3);

        $stats = $this->statisticsService->getUserStatistics($this->user);

        $this->assertEquals(0, $stats['averageReflectionLength']);
    }

    public function test_get_user_statistics_returns_null_most_active_day_when_no_prompts()
    {
        $stats = $this->statisticsService->getUserStatistics($this->user);

        $this->assertEquals(0, $stats['totalReflections']);
        $this->assertNull($stats['mostActiveDay']);
    }

    public function test_get_reflection_trends_returns_correct_counts()
    {
        // Create old prompts (more than 30 days ago)
        Prompt::factory()->count(5)->create([
            'user_id' => $this->user->id,
            'response' => 'Old response',
            'created_at' => Carbon::now()->subDays(60)
        ]);

        // Create recent prompts (within last 30 days)
        Prompt::factory()->count(3)->create([
            'user_id' => $this->user->id,
            'response' => 'Recent response',
            'created_at' => Carbon::now()->subDays(15)
        ]);

        // Create prompts without responses (should not be counted)
        Prompt::factory()->count(2)->create([
            'user_id' => $this->user->id,
            'response' => null,
            'created_at' => Carbon::now()->subDays(10)
        ]);

        $trends = $this->statisticsService->getReflectionTrends($this->user);

        $this->assertEquals(8, $trends['total_reflections']); // 5 old + 3 recent
        $this->assertEquals(3, $trends['recent_reflections']); // Only recent ones
    }

    public function test_get_reflection_trends_returns_zero_when_no_responses()
    {
        // Create prompts without responses
        $this->createPromptsWithoutResponses(5);

        $trends = $this->statisticsService->getReflectionTrends($this->user);

        $this->assertEquals(0, $trends['total_reflections']);
        $this->assertEquals(0, $trends['recent_reflections']);
    }

    public function test_get_analysis_insights_returns_correct_structure()
    {
        // Create prompts with analysis
        $prompt1 = Prompt::factory()->create([
            'user_id' => $this->user->id,
            'analysis' => 'Positive reflection'
        ]);

        $prompt2 = Prompt::factory()->create([
            'user_id' => $this->user->id,
            'analysis' => 'Growth mindset shown'
        ]);

        // Create prompt without analysis (should not be included)
        Prompt::factory()->create([
            'user_id' => $this->user->id,
            'analysis' => null
        ]);

        $insights = $this->statisticsService->getAnalysisInsights($this->user->id);

        $this->assertCount(2, $insights);

        $this->assertEquals($prompt1->id, $insights[0]['prompt_id']);
        $this->assertEquals('Positive reflection', $insights[0]['analysis']);

        $this->assertEquals($prompt2->id, $insights[1]['prompt_id']);
        $this->assertEquals('Growth mindset shown', $insights[1]['analysis']);
    }

    public function test_get_analysis_insights_returns_empty_array_when_no_analysis()
    {
        // Create prompts without analysis
        Prompt::factory()->count(3)->create([
            'user_id' => $this->user->id,
            'analysis' => null
        ]);

        $insights = $this->statisticsService->getAnalysisInsights($this->user->id);

        $this->assertEmpty($insights);
        $this->assertIsArray($insights);
    }

    public function test_get_analysis_insights_returns_empty_array_for_nonexistent_user()
    {
        $insights = $this->statisticsService->getAnalysisInsights(99999);

        $this->assertEmpty($insights);
        $this->assertIsArray($insights);
    }
}
