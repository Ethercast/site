import * as _ from 'underscore';

export const ZERO_ADDRESS = `0x${_.range(0, 40).map(() => '0').join('')}`;
export const ZERO_SIGNATURE = `0x${_.range(0, 8).map(() => '0').join('')}`;
export const ZERO_TOPIC = `0x${_.range(0, 64).map(() => '0').join('')}`;

export const ADDRESS_PATTERN = `0x[a-fA-F0-9]{40}`;
export const TOPIC_PATTERN = `0x[a-fA-F0-9]{64}`;
export const SIGNATURE_PATTERN = `0x[a-fA-F0-9]{8}`;

export function commaSeparatedPattern(pattern: string): RegExp {
  const withWhitespace = `\\s*${pattern}\\s*`;

  return new RegExp(`^${withWhitespace}(,${withWhitespace})*$`);
}

