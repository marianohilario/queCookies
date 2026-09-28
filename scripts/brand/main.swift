import Foundation

let arguments = Array(CommandLine.arguments.dropFirst())
do {
    switch arguments.first {
    case "motifs":
        guard arguments.count == 3 else { fatalError("Uso: brand-tools motifs patron.jpg carpeta-salida") }
        try extractMotifs(input: arguments[1], outputDirectory: arguments[2])
    case "logo":
        guard arguments.count == 4 else { fatalError("Uso: brand-tools logo original.png salida.png carpeta-preview") }
        try editLogo(input: arguments[1], output: arguments[2], previewDirectory: arguments[3])
    case "inspect":
        guard arguments.count == 2 else { fatalError("Uso: brand-tools inspect imagen") }
        let image = try Raster(path: arguments[1])
        print("\(image.width)×\(image.height), esquina: \(image.color(0, 0))")
        print(image.dominantColors(PixelRect(x: 0, y: 0, width: image.width, height: image.height), limit: 8))
    default:
        fatalError("Comandos: logo, motifs, inspect")
    }
} catch {
    fputs("\(error)\n", stderr)
    exit(1)
}
