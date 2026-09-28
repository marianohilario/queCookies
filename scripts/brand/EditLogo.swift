import Foundation

// Coordinates refer to the supplied 1080 × 1080 raster, not an invented font.
func editLogo(input: String, output: String, previewDirectory: String) throws {
    let original = try Raster(path: input)
    guard original.width == 1080 && original.height == 1080 else {
        throw NSError(domain: "BrandAssets", code: 4, userInfo: [NSLocalizedDescriptionKey: "Revisar coordenadas: se esperaba el logo original 1080 × 1080."])
    }
    let source = PixelRect(x: 387, y: 354, width: 144, height: 165)
    let destination = PixelRect(x: 748, y: 530, width: 126, height: 164)
    var result = original
    let clearBackground = original.color(820, 510)
    func sample(_ x: Int, _ y: Int) -> [UInt8] {
        // The upper stroke of the k enters the source crop beneath/right of the e.
        // Exclude that separate letter; retain the e itself and its local shadow.
        if x >= 518 && y >= 486 {
            let edge = original.color(517, y)
            return edge[1] < 90 ? edge : clearBackground
        }
        return original.color(x, y)
    }

    // Resample only the existing e and its local background/shadow into the first s.
    for y in 0..<destination.height {
        for x in 0..<destination.width {
            let sx = Double(source.x) + Double(x) * Double(source.width - 1) / Double(destination.width - 1)
            let sy = Double(source.y) + Double(y) * Double(source.height - 1) / Double(destination.height - 1)
            let x0 = Int(sx), y0 = Int(sy)
            let fx = sx - Double(x0), fy = sy - Double(y0)
            let samples = [sample(x0, y0), sample(x0 + 1, y0), sample(x0, y0 + 1), sample(x0 + 1, y0 + 1)]
            var rgba = (0..<4).map { channel -> UInt8 in
                let top = Double(samples[0][channel]) * (1 - fx) + Double(samples[1][channel]) * fx
                let bottom = Double(samples[2][channel]) * (1 - fx) + Double(samples[3][channel]) * fx
                return UInt8(max(0, min(255, (top * (1 - fy) + bottom * fy).rounded())))
            }
            let previous = original.color(destination.x + x, destination.y + y)
            if Int(previous[1]) <= Int(clearBackground[1]) + 2 && Int(rgba[1]) <= Int(clearBackground[1]) + 2 && Int(previous[0]) <= Int(clearBackground[0]) + 3 && Int(rgba[0]) <= Int(clearBackground[0]) + 3 {
                let distance = min(x, y, destination.width - 1 - x, destination.height - 1 - y)
                let weight = min(1, Double(distance) / 12)
                rgba = (0..<4).map { UInt8((Double(rgba[$0]) * weight + Double(previous[$0]) * (1 - weight)).rounded()) }
            }
            result.set(destination.x + x, destination.y + y, rgba)
        }
    }
    try result.save(output)
    let saved = try Raster(path: output)
    var changed = 0, outside = 0
    for y in 0..<original.height {
        for x in 0..<original.width where original.color(x, y) != saved.color(x, y) {
            changed += 1
            if !destination.contains(x, y) { outside += 1 }
        }
    }
    guard outside == 0 else { throw NSError(domain: "BrandAssets", code: 5) }
    try original.crop(PixelRect(x: 650, y: 510, width: 380, height: 215)).save("\(previewDirectory)/logo-detail-before.png")
    try result.crop(PixelRect(x: 650, y: 510, width: 380, height: 215)).save("\(previewDirectory)/logo-detail-after.png")
    print("Logo: \(original.width)×\(original.height). Píxeles modificados: \(changed). Fuera del rectángulo de la letra: \(outside).")
    print("Colores dominantes del logo: \(original.dominantColors(PixelRect(x: 0, y: 0, width: original.width, height: original.height)))")
}
