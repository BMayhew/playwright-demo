# I'm not sure if this works, I generated it with chatgpt from my bash script

if ($args.Length -eq 0) {
  $URL = "https://www.automationexercise.com"
} else {
  $URL = $args[0]
}

$failed = (Get-Content summary.json | ConvertFrom-Json).failed -join ' '
$timed_out = (Get-Content summary.json | ConvertFrom-Json).timedOut -join ' '
Write-Host "URL=$URL npx playwright test $failed $timed_out --workers=1"

# Below is the actual command that gets run
$env:URL=$URL npx playwright test $failed $timed_out --workers=1
