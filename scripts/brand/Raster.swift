import Foundation
import CoreGraphics
import ImageIO

struct PixelRect {
    let x: Int, y: Int, width: Int, height: Int
    func contains(_ px: Int, _ py: Int) -> Bool {
        px >= x && py >= y && px < x + width && py < y + height
    }
}

struct Raster {
    let width: Int
    let height: Int
    var pixels: [UInt8]

    init(width: Int, height: Int) {
        self.width = width
        self.height = height
        pixels = [UInt8](repeating: 0, count: width * height * 4)
    }

    init(path: String) throws {
        guard let source = CGImageSourceCreateWithURL(URL(fileURLWithPath: path) as CFURL, nil),
              let image = CGImageSourceCreateImageAtIndex(source, 0, nil) else {
            throw NSError(domain: "BrandAssets", code: 1, userInfo: [NSLocalizedDescriptionKey: "No se pudo leer \(path)"])
        }
        self.init(width: image.width, height: image.height)
        pixels.withUnsafeMutableBytes { buffer in
            let context = CGContext(data: buffer.baseAddress, width: width, height: height,
                bitsPerComponent: 8, bytesPerRow: width * 4,
                space: CGColorSpace(name: CGColorSpace.sRGB)!,
                bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
            context.draw(image, in: CGRect(x: 0, y: 0, width: width, height: height))
        }
    }

    func color(_ x: Int, _ y: Int) -> [UInt8] {
        let index = (y * width + x) * 4
        return Array(pixels[index..<index + 4])
    }

    mutating func set(_ x: Int, _ y: Int, _ rgba: [UInt8]) {
        let index = (y * width + x) * 4
        pixels.replaceSubrange(index..<index + 4, with: rgba)
    }

    func crop(_ rect: PixelRect) -> Raster {
        var result = Raster(width: rect.width, height: rect.height)
        for y in 0..<rect.height {
            for x in 0..<rect.width { result.set(x, y, color(rect.x + x, rect.y + y)) }
        }
        return result
    }

    func save(_ path: String) throws {
        let data = Data(pixels) as CFData
        let provider = CGDataProvider(data: data)!
        let image = CGImage(width: width, height: height, bitsPerComponent: 8, bitsPerPixel: 32,
            bytesPerRow: width * 4, space: CGColorSpace(name: CGColorSpace.sRGB)!,
            bitmapInfo: CGBitmapInfo(rawValue: CGImageAlphaInfo.premultipliedLast.rawValue),
            provider: provider, decode: nil, shouldInterpolate: true, intent: .defaultIntent)!
        guard let output = CGImageDestinationCreateWithURL(URL(fileURLWithPath: path) as CFURL, "public.png" as CFString, 1, nil) else {
            throw NSError(domain: "BrandAssets", code: 2)
        }
        CGImageDestinationAddImage(output, image, nil)
        guard CGImageDestinationFinalize(output) else { throw NSError(domain: "BrandAssets", code: 3) }
    }

    func dominantColors(_ rect: PixelRect, limit: Int = 5) -> [(String, Int)] {
        var counts: [String: Int] = [:]
        for y in rect.y..<rect.y + rect.height {
            for x in rect.x..<rect.x + rect.width {
                let pixel = color(x, y)
                guard pixel[3] > 240 else { continue }
                let key = String(format: "#%02X%02X%02X", pixel[0], pixel[1], pixel[2])
                counts[key, default: 0] += 1
            }
        }
        return Array(counts.sorted { $0.value > $1.value }.prefix(limit)).map { ($0.key, $0.value) }
    }
}
