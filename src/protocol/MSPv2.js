import { MSP, MSPHeader } from './MSP'
import { hex } from '../utils'
import { Logger } from '../logger'

class MSPv2Header extends MSPHeader {
  flags(buffer) {
    return buffer.length > 3 ? buffer[3] : null
  }

  command(buffer) {
    return buffer.length > 5 ? buffer[4] | (buffer[5] << 8) : null
  }

  payloadOffset(buffer) {
    return 8
  }

  payloadLength(buffer) {
    return buffer.length > 7 ? buffer[6] | (buffer[7] << 8) : 0
  }
}

export class MSPv2 extends MSP {
  #log = Logger.getLogger('MSPV2')

  constructor(header = new MSPv2Header()) {
    super(header)
  }

  static get PROTOCOL_ID() {
    return 'X'.charCodeAt(0)
  }

  static get PROTOCOL_NAME() {
    return 'MSPv2'
  }

  checksum(buffer) {
    const flags = this.header.flags(buffer)
    const command = this.header.command(buffer)
    const payloadOffset = this.header.payloadOffset(buffer)
    const payloadLength = this.header.payloadLength(buffer)

    let checksum = 0
    checksum = this.#crc8_dvb_s2(checksum, flags)
    checksum = this.#crc8_dvb_s2(checksum, command & 0xFF)
    checksum = this.#crc8_dvb_s2(checksum, (command & 0xFF00) >> 8)
    checksum = this.#crc8_dvb_s2(checksum, payloadLength & 0xFF)
    checksum = this.#crc8_dvb_s2(checksum, (payloadLength & 0xFF00) >> 8)

    for (let i = payloadOffset; i < payloadOffset + payloadLength; i++) {
      checksum = this.#crc8_dvb_s2(checksum, buffer[i])
    }

    return checksum
  }

  #crc8_dvb_s2(crc, ch) {
    crc ^= ch;
    for (let i = 0; i < 8; ++i) {
      if (crc & 0x80) {
        crc = ((crc << 1) & 0xFF) ^ 0xD5;
      } else {
        crc = (crc << 1) & 0xFF;
      }
    }
    return crc;
  }

  decode(buffer) {
    this.#log.trace(`Decoding; Buffer length ${buffer.length}`)
    this.#log.trace(buffer)

    const begin = this.header.start(buffer)
    if (begin !== MSPHeader.START_BYTE) {
      throw new Error(`Invalid start byte ${hex(buffer[0])}`)
    }

    const version = this.header.protocol(buffer)
    if (version !== MSPv2.PROTOCOL_ID) {
      throw new Error('Packet is not MSPv2')
    }

    const direction = this.header.direction(buffer)
    const flags = this.header.flags(buffer)
    const command = this.header.command(buffer)
    const payload = this.decodePayload(buffer)
    const crc = this.decodeCRC(buffer)
    const calculatedCRC = this.checksum(buffer)

    if (crc !== calculatedCRC) {
      throw new Error(`Invalid CRC: got ${hex(crc)} expected ${hex(calculatedCRC)}`)
    }

    this.#log.debug(`Decoded command with id ${command}, payload size: ${payload.length}`)

    return {
      protocol: this,
      flags,
      direction,
      command,
      payload
    }
  }

  encode(direction, command, payload = new Uint8Array()) {
    this.#log.debug(`Encoding command ${hex(command, 4)}/${command} with payload length ${payload.length}`)

    const payloadOffset = 8
    const payloadLength = payload?.length ?? 0
    const length = payloadOffset + payloadLength + 1 // 1 byte for CRC
    const buffer = new Uint8Array(length)
    buffer[0] = MSPHeader.START_BYTE
    buffer[1] = MSPv2.PROTOCOL_ID
    buffer[2] = direction
    buffer[3] = 0                                  // flag: reserved, set to 0
    buffer[4] = command & 0xFF                     // code lower byte
    buffer[5] = (command & 0xFF00) >> 8            // code upper byte
    buffer[6] = payload.length & 0xFF          // payloadLength lower byte
    buffer[7] = (payload.length & 0xFF00) >> 8 // payloadLength upper byte
    for (let i = 0; i < payload.length; i++) {
      buffer[payloadOffset + i] = payload[i]
    }
    buffer[length - 1] = this.checksum(buffer)

    this.#log.trace('Encoded buffer', buffer)

    return buffer
  }
}
