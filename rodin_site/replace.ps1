$files = @(
  'src/app/bilingue/Bilingue.module.css',
  'src/app/extracurriculares/Extracurriculares.module.css',
  'src/app/itinerarios/Itinerarios.module.css',
  'src/app/itinerarios/[id]/Itinerario.module.css',
  'src/components/Diferenciais/ListaDiferenciais.module.css',
  'src/components/Programs/Programs.module.css',
  'src/components/QuemSomos/InformacoesQuemSomos.module.css',
  'src/components/QuemSomos/QuemSomosHero.module.css'
)

foreach ($f in $files) {
  $content = Get-Content -LiteralPath $f -Raw
  $newContent = $content -replace 'background-color:\s*var\(--rodin-black\);', 'background: linear-gradient(rgba(26, 35, 33, 0.8), rgba(26, 35, 33, 0.95)), url(''/cimento-queimado.png''); background-size: cover; background-position: center; background-attachment: fixed;'
  Set-Content -LiteralPath $f -Value $newContent -Encoding UTF8
}
