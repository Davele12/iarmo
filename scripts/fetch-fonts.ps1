$ErrorActionPreference = 'Stop'
$fontDirectory = Join-Path $PSScriptRoot '../src/assets/fonts'
$spanishAndSymbols = @(193,201,205,211,218,220,209,225,233,237,243,250,252,241,191,161,8211,8212,8226,183,8230,169,174,8482,176,8364,8599,8600,8594,10003)
$glyphs = -join (@(32..126) + $spanishAndSymbols | ForEach-Object { [char]$_ })
$fontUrl = 'https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14,400..700&family=Manrope:wght@400..700&display=swap&text=' + [Uri]::EscapeDataString($glyphs)
$fontCss = (Invoke-WebRequest -UseBasicParsing -UserAgent 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36' -Uri $fontUrl).Content
$fontMatches = [regex]::Matches($fontCss, 'src: url\((https://fonts.gstatic.com/[^)]+)\)')
if ($fontMatches.Count -ne 2) { throw 'Expected exactly two official variable font files.' }
$names = @('inter-latin-variable.woff2', 'manrope-latin-variable.woff2')
for ($index = 0; $index -lt 2; $index++) {
  Invoke-WebRequest -UseBasicParsing -Uri $fontMatches[$index].Groups[1].Value -OutFile (Join-Path $fontDirectory $names[$index])
}
Get-ChildItem -LiteralPath $fontDirectory -Filter '*.woff2' | Select-Object Name, Length
