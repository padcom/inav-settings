import { Logger } from '../logger'
import { MSP, MSPHeader } from './MSP'
import { hex, getByteAtOffset } from '../utils'

export class MSPv1Header extends MSPHeader {
  /**
   * @param buffer {Uint8Array}
   */
  command(buffer) {
    return buffer.length > 4 ? buffer[4] : null
  }

  /**
   * @param buffer {Uint8Array}
   */
  payloadOffset(buffer) {
    return buffer.length > 3 ? (buffer[3] === 0xFF ? 7 : 5) : 5
  }

  /**
   * @param buffer {Uint8Array}
   */
  payloadLength(buffer) {
    if (buffer.length < 3) {
      return 0
    }
    if (buffer[3] === 0xFF) {
      return buffer.length > 6 ? buffer[5] | (buffer[6] << 8) : null
    } else {
      return buffer[3]
    }
  }
}

export class MSPv1 extends MSP {
  #log = Logger.getLogger('MSPV1')

  constructor(header = new MSPv1Header()) {
    super(header)
  }

  static get PROTOCOL_ID() {
    return 'M'.charCodeAt(0)
  }

  static get PROTOCOL_NAME() {
    return 'MSPv1'
  }

  checksum(buffer) {
    let checksum = buffer[3]
    for (let i = 4; i < buffer.length - 1; i++) {
      checksum ^= buffer[i];
    }

    return checksum;
  }

  decode(buffer) {
    this.#log.trace(`Decoding; Buffer length ${buffer.length}`)
    this.#log.trace(buffer)

    const begin = this.header.start(buffer)
    if (begin !== MSPHeader.START_BYTE) {
      throw new Error(`Invalid start byte ${hex(buffer[0])}`)
    }

    const version = this.header.protocol(buffer)
    if (version !== MSPv1.PROTOCOL_ID) {
      throw new Error('Packet is not MSP v1')
    }

    const crc = this.decodeCRC(buffer)
    const calculatedCRC = this.checksum(buffer)

    if (crc !== calculatedCRC) {
      throw new Error(`Invalid CRC: got ${hex(crc)} expected ${hex(calculatedCRC)}`)
    }

    const direction = this.header.direction(buffer)
    const command = this.header.command(buffer)
    const payload = this.decodePayload(buffer)

    this.#log.debug(`Decoded command with id ${command}, payload size: ${payload.length}`)

    return {
      protocol: this,
      direction,
      command,
      payload
    }
  }

  encode(direction, command, payload) {
    this.#log.debug(`Encoding command ${hex(command)}/${command} with payload length ${payload.length}`)

    const payloadOffset = 5
    const payloadLength = payload?.length ?? 0
    if (payloadLength > 255) throw new Error('Current implementation does not know how to encode large V1 packets!')
    const length = payloadOffset + payloadLength + 1 // 1 byte for CRC
    const buffer = new Uint8Array(length).fill(0)
    buffer[0] = MSPHeader.START_BYTE
    buffer[1] = MSPv1.PROTOCOL_ID
    buffer[2] = direction
    buffer[3] = payloadLength
    buffer[4] = command
    for (let i = 0; i < payloadLength; i++) buffer[i + payloadOffset] = payload[i]
    buffer[length - 1] = this.checksum(buffer)

    this.#log.trace('Encoded buffer', buffer)

    return buffer
  }
}
