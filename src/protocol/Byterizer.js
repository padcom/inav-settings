export class Byterizer {
  transform(chunk, controller) {
    console.log('chunk', chunk)
    for (const x of chunk) {
      controller.enqueue(new Uint8Array([x]))
    }
  }
}
