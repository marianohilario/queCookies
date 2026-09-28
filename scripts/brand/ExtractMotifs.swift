import Foundation

func extractMotifs(input: String, outputDirectory: String) throws {
    let source = try Raster(path: input)
    guard source.width == 1080 && source.height == 1350 else {
        throw NSError(domain: "BrandAssets", code: 6, userInfo: [NSLocalizedDescriptionKey: "Revisar recortes: se esperaba patrón 1080 × 1350."])
    }
    try FileManager.default.createDirectory(atPath: outputDirectory, withIntermediateDirectories: true)
    let regions: [(String, PixelRect)] = [
        ("hand", PixelRect(x: 164, y: 105, width: 177, height: 231)),
        ("heart", PixelRect(x: 188, y: 44, width: 65, height: 60)),
        ("cookie", PixelRect(x: 899, y: 102, width: 179, height: 185)),
        ("pattern", PixelRect(x: 0, y: 0, width: 1080, height: 336)),
    ]
    for (name, rect) in regions {
        var mask = Raster(width: rect.width, height: rect.height)
        for y in 0..<rect.height {
            for x in 0..<rect.width {
                let pixel = source.color(rect.x + x, rect.y + y)
                // The gold strokes have high green; the red background does not.
                // Keep the supplied shape, using a transparent mask recolored by CSS.
                let alpha = UInt8((max(0, min(1, (Double(pixel[1]) - 50) / 165)) * 255).rounded())
                mask.set(x, y, [alpha, alpha, alpha, alpha])
            }
        }
        try mask.save("\(outputDirectory)/\(name).png")
        print("Motivo original extraído: \(name), \(rect.width)×\(rect.height)")
    }
}
