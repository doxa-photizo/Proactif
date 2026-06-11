Add-Type -AssemblyName System.Drawing
$imagePath = "public/pics/collins.jpeg"
$img = [System.Drawing.Image]::FromFile($imagePath)
Write-Output "Dimensions: $($img.Width)x$($img.Height)"
$img.Dispose()
